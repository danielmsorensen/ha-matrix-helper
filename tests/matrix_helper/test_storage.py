"""Tests for persistence, reload/removal and recorder exclusion."""

from __future__ import annotations

from datetime import timedelta
from typing import Any

import pytest
from homeassistant.core import State
from homeassistant.util import dt as dt_util
from pytest_homeassistant_custom_component.common import (
    async_fire_time_changed,
    mock_restore_cache,
)

from custom_components.matrix_helper.const import DOMAIN, SERVICE_SET_CELL

from .conftest import ENTITY_ID

STORAGE_KEY = f"{DOMAIN}.test_entry_id"


async def _set_office(hass, value: float) -> None:
    await hass.services.async_call(
        DOMAIN,
        SERVICE_SET_CELL,
        {"entity_id": ENTITY_ID, "row": "comfort", "column": "office", "value": value},
        blocking=True,
    )


@pytest.mark.usefixtures("loaded_entry")
async def test_edits_are_saved_to_storage(hass, hass_storage: dict[str, Any]):
    await _set_office(hass, 20)
    async_fire_time_changed(hass, dt_util.utcnow() + timedelta(seconds=5))
    await hass.async_block_till_done()

    saved = hass_storage[STORAGE_KEY]["data"]
    assert saved["data"]["comfort"]["office"] == 20.0
    assert saved["last_modified"] == hass.states.get(ENTITY_ID).state


async def test_stored_data_loaded_and_reconciled(
    hass, matrix_config_entry, hass_storage: dict[str, Any]
):
    hass_storage[STORAGE_KEY] = {
        "version": 1,
        "key": STORAGE_KEY,
        "data": {
            "data": {
                "comfort": {"office": 19.0, "retired_column": 1.0},
                "retired_row": {"office": 5.0},
                "eco": {"office": "not a number", "living_room": float("nan")},
            },
            "last_modified": "2026-02-02T00:00:00+00:00",
        },
    }
    matrix_config_entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(matrix_config_entry.entry_id)
    await hass.async_block_till_done()

    state = hass.states.get(ENTITY_ID)
    assert state.state == "2026-02-02T00:00:00+00:00"
    assert state.attributes["data"] == {
        "comfort": {"living_room": None, "office": 19.0},
        "eco": {"living_room": None, "office": None},
        "sleep": {"living_room": None, "office": None},
    }


async def test_storage_takes_precedence_over_restore_state(
    hass, matrix_config_entry, hass_storage: dict[str, Any]
):
    mock_restore_cache(
        hass, [State(ENTITY_ID, "2026-01-01T00:00:00+00:00", {"data": {}})]
    )
    hass_storage[STORAGE_KEY] = {
        "version": 1,
        "key": STORAGE_KEY,
        "data": {"data": {"comfort": {"office": 19.0}}, "last_modified": "x"},
    }
    matrix_config_entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(matrix_config_entry.entry_id)
    await hass.async_block_till_done()

    assert hass.states.get(ENTITY_ID).attributes["data"]["comfort"]["office"] == 19.0


async def test_data_survives_options_reload(hass, loaded_entry):
    await _set_office(hass, 20)

    result = await hass.config_entries.options.async_init(loaded_entry.entry_id)
    await hass.config_entries.options.async_configure(
        result["flow_id"],
        {"rows": ["Comfort", "Eco", "Sleep", "Away"], "columns": ["Office"]},
    )
    await hass.async_block_till_done()

    state = hass.states.get(ENTITY_ID)
    assert state.attributes["rows"] == ["comfort", "eco", "sleep", "away"]
    assert state.attributes["data"]["comfort"] == {"office": 20.0}
    assert state.attributes["data"]["away"] == {"office": None}


async def test_removing_entry_deletes_storage(
    hass, loaded_entry, hass_storage: dict[str, Any]
):
    await _set_office(hass, 20)
    await hass.config_entries.async_unload(loaded_entry.entry_id)
    assert STORAGE_KEY in hass_storage  # flushed on unload

    await hass.config_entries.async_remove(loaded_entry.entry_id)
    await hass.async_block_till_done()

    assert STORAGE_KEY not in hass_storage
    assert hass.states.get(ENTITY_ID) is None


@pytest.mark.usefixtures("loaded_entry")
async def test_matrix_attributes_are_excluded_from_recorder(hass):
    unrecorded = hass.states.get(ENTITY_ID).state_info["unrecorded_attributes"]

    assert {"data", "rows", "columns", "row_labels", "column_labels"} <= unrecorded
