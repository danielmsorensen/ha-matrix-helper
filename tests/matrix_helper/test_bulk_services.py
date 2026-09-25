"""Tests for set_values / fill / adjust, key normalization and value validation."""

from __future__ import annotations

import pytest
import voluptuous as vol
from homeassistant.const import EVENT_STATE_CHANGED
from homeassistant.exceptions import ServiceValidationError

from custom_components.matrix_helper.const import (
    DOMAIN,
    SERVICE_ADJUST,
    SERVICE_FILL,
    SERVICE_SET_CELL,
    SERVICE_SET_VALUES,
)

from .conftest import ENTITY_ID


async def _call(hass, service: str, **data) -> None:
    await hass.services.async_call(
        DOMAIN, service, {"entity_id": ENTITY_ID, **data}, blocking=True
    )


def _data(hass) -> dict:
    return hass.states.get(ENTITY_ID).attributes["data"]


@pytest.mark.usefixtures("loaded_entry")
async def test_set_values_updates_cells_across_rows(hass):
    await _call(hass, SERVICE_SET_CELL, row="sleep", column="office", value=15)

    await _call(
        hass,
        SERVICE_SET_VALUES,
        values={"comfort": {"living_room": 21}, "eco": {"office": 17.5}},
    )

    data = _data(hass)
    assert data["comfort"]["living_room"] == 21.0
    assert data["eco"]["office"] == 17.5
    assert data["sleep"]["office"] == 15.0  # untouched


@pytest.mark.usefixtures("loaded_entry")
async def test_set_values_is_atomic(hass):
    with pytest.raises(ServiceValidationError):
        await _call(
            hass,
            SERVICE_SET_VALUES,
            values={"comfort": {"living_room": 21}, "eco": {"garage": 1}},
        )

    assert _data(hass)["comfort"]["living_room"] is None


@pytest.mark.usefixtures("loaded_entry")
async def test_fill_whole_matrix(hass):
    await _call(hass, SERVICE_FILL, value=18)

    assert all(v == 18.0 for row in _data(hass).values() for v in row.values())


@pytest.mark.usefixtures("loaded_entry")
async def test_fill_row_and_column_scopes(hass):
    await _call(hass, SERVICE_FILL, value=18, row="eco")
    await _call(hass, SERVICE_FILL, value=20, column="office")

    data = _data(hass)
    assert data["eco"] == {"living_room": 18.0, "office": 20.0}
    assert data["comfort"] == {"living_room": None, "office": 20.0}


@pytest.mark.usefixtures("loaded_entry")
async def test_fill_without_value_clears(hass):
    await _call(hass, SERVICE_FILL, value=18)
    await _call(hass, SERVICE_FILL, row="comfort")

    data = _data(hass)
    assert data["comfort"] == {"living_room": None, "office": None}
    assert data["eco"]["office"] == 18.0


@pytest.mark.usefixtures("loaded_entry")
async def test_adjust_skips_empty_cells_and_avoids_float_noise(hass):
    await _call(hass, SERVICE_SET_CELL, row="comfort", column="office", value=21.1)

    await _call(hass, SERVICE_ADJUST, amount=0.1)

    data = _data(hass)
    assert data["comfort"]["office"] == 21.2  # not 21.200000000000003
    assert data["comfort"]["living_room"] is None  # empty cells stay empty


@pytest.mark.usefixtures("loaded_entry")
async def test_adjust_scoped_to_column(hass):
    await _call(hass, SERVICE_FILL, value=20)

    await _call(hass, SERVICE_ADJUST, amount=-2, column="office")

    data = _data(hass)
    assert data["eco"] == {"living_room": 20.0, "office": 18.0}


@pytest.mark.usefixtures("loaded_entry")
async def test_labels_are_accepted_as_keys(hass):
    await _call(hass, SERVICE_SET_CELL, row="Comfort", column="Living Room", value=22)
    await _call(hass, SERVICE_SET_VALUES, values={"Eco": {"Office": 16}})

    data = _data(hass)
    assert data["comfort"]["living_room"] == 22.0
    assert data["eco"]["office"] == 16.0


@pytest.mark.usefixtures("loaded_entry")
async def test_unknown_key_error_lists_valid_keys(hass):
    with pytest.raises(ServiceValidationError) as err:
        await _call(hass, SERVICE_FILL, value=1, row="Holiday")

    assert err.value.translation_placeholders == {
        "row": "Holiday",
        "valid_rows": "comfort, eco, sleep",
    }


@pytest.mark.parametrize("bad", ["nan", "inf", float("-inf"), "warm"])
@pytest.mark.usefixtures("loaded_entry")
async def test_non_finite_or_non_numeric_values_are_rejected(hass, bad):
    with pytest.raises(vol.Invalid):
        await _call(hass, SERVICE_SET_CELL, row="comfort", column="office", value=bad)


@pytest.mark.usefixtures("loaded_entry")
async def test_numeric_strings_are_coerced(hass):
    """Templates often render numbers as strings."""
    await _call(hass, SERVICE_SET_CELL, row="comfort", column="office", value="19.5")

    assert _data(hass)["comfort"]["office"] == 19.5


@pytest.mark.usefixtures("loaded_entry")
async def test_no_op_write_does_not_change_state(hass):
    await _call(hass, SERVICE_FILL, value=18)
    events = []
    hass.bus.async_listen(EVENT_STATE_CHANGED, events.append)

    await _call(hass, SERVICE_FILL, value=18)
    await _call(hass, SERVICE_ADJUST, amount=0)
    await hass.async_block_till_done()

    assert events == []


async def test_large_matrix(hass, matrix_config_entry):
    """Nothing about the model assumes a small matrix."""
    rows = [f"Row {i}" for i in range(100)]
    columns = [f"Column {i}" for i in range(100)]
    matrix_config_entry.add_to_hass(hass)
    hass.config_entries.async_update_entry(
        matrix_config_entry,
        options={**matrix_config_entry.options, "rows": rows, "columns": columns},
    )
    assert await hass.config_entries.async_setup(matrix_config_entry.entry_id)
    await hass.async_block_till_done()

    await _call(hass, SERVICE_FILL, value=1)
    await _call(hass, SERVICE_ADJUST, amount=1, row="Row 99")

    data = _data(hass)
    assert len(data) == 100
    assert all(len(row) == 100 for row in data.values())
    assert data["row_99"]["column_42"] == 2.0
    assert data["row_0"]["column_42"] == 1.0
