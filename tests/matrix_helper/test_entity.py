"""Tests for the MatrixHelperEntity data model."""

from __future__ import annotations

from datetime import datetime

from custom_components.matrix_helper.const import ATTR_COLUMNS, ATTR_DATA, ATTR_ROWS
from custom_components.matrix_helper.matrix import MatrixHelperEntity


def test_entity_initial_state_and_attributes(matrix_config_entry):
    entity = MatrixHelperEntity(matrix_config_entry)

    assert entity.unique_id == "test_entry_id"
    assert entity.name == "Climate Profiles"
    assert entity.rows == ["comfort", "eco", "sleep"]
    assert entity.columns == ["living_room", "office"]

    attrs = entity.extra_state_attributes
    assert attrs[ATTR_ROWS] == ["comfort", "eco", "sleep"]
    assert attrs[ATTR_COLUMNS] == ["living_room", "office"]
    assert attrs[ATTR_DATA] == {
        "comfort": {"living_room": None, "office": None},
        "eco": {"living_room": None, "office": None},
        "sleep": {"living_room": None, "office": None},
    }


def test_entity_state_is_iso_timestamp(matrix_config_entry):
    entity = MatrixHelperEntity(matrix_config_entry)

    # A valid ISO 8601 timestamp round-trips through fromisoformat.
    datetime.fromisoformat(entity.state)


async def test_entity_created_via_config_entry(hass, matrix_config_entry):
    matrix_config_entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(matrix_config_entry.entry_id)
    await hass.async_block_till_done()

    state = hass.states.get("matrix_helper.climate_profiles")
    assert state is not None
    assert state.attributes["rows"] == ["comfort", "eco", "sleep"]
    assert state.attributes["columns"] == ["living_room", "office"]
