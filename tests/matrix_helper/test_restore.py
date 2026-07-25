"""Tests for RestoreEntity reconciliation across restarts."""

from __future__ import annotations

from homeassistant.core import State
from pytest_homeassistant_custom_component.common import mock_restore_cache

from custom_components.matrix_helper.const import ATTR_COLUMNS, ATTR_DATA, ATTR_ROWS


async def test_restore_reconciles_against_current_schema(hass, matrix_config_entry):
    mock_restore_cache(
        hass,
        [
            State(
                "matrix_helper.climate_profiles",
                "2026-01-01T00:00:00+00:00",
                {
                    ATTR_ROWS: ["comfort", "eco", "retired_row"],
                    ATTR_COLUMNS: ["living_room", "retired_column"],
                    ATTR_DATA: {
                        "comfort": {"living_room": 21.0, "retired_column": 99.0},
                        "eco": {"living_room": 16.0},
                        "retired_row": {"living_room": 5.0},
                    },
                },
            ),
        ],
    )

    matrix_config_entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(matrix_config_entry.entry_id)
    await hass.async_block_till_done()

    state = hass.states.get("matrix_helper.climate_profiles")
    data = state.attributes[ATTR_DATA]

    assert data["comfort"]["living_room"] == 21.0  # matching row+column restored
    assert (
        data["sleep"]["living_room"] is None
    )  # new schema row, no saved value -> null
    assert (
        data["comfort"]["office"] is None
    )  # new schema column, no saved value -> null
    assert "retired_row" not in data  # dropped: no longer in schema
    assert "retired_column" not in data["comfort"]  # dropped: no longer in schema
    assert state.state == "2026-01-01T00:00:00+00:00"  # last_modified restored
