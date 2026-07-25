"""Tests for the Matrix Helper config flow."""

from __future__ import annotations

from homeassistant import config_entries
from homeassistant.const import CONF_NAME
from homeassistant.data_entry_flow import FlowResultType

from custom_components.matrix_helper.const import CONF_COLUMNS, CONF_ROWS, DOMAIN


async def _start_flow(hass):
    return await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )


async def test_successful_creation(hass):
    result = await _start_flow(hass)

    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {
            CONF_NAME: "Climate Profiles",
            CONF_ROWS: "Comfort, Eco, Sleep",
            CONF_COLUMNS: "Living Room, Office",
        },
    )

    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert result["title"] == "Climate Profiles"
    assert result["data"] == {
        CONF_NAME: "Climate Profiles",
        CONF_ROWS: ["Comfort", "Eco", "Sleep"],
        CONF_COLUMNS: ["Living Room", "Office"],
    }


async def test_empty_rows_rejected(hass):
    result = await _start_flow(hass)

    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {CONF_NAME: "Climate Profiles", CONF_ROWS: "", CONF_COLUMNS: "Living Room"},
    )

    assert result["type"] is FlowResultType.FORM
    assert result["errors"] == {CONF_ROWS: "rows_required"}


async def test_empty_columns_rejected(hass):
    result = await _start_flow(hass)

    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {CONF_NAME: "Climate Profiles", CONF_ROWS: "Comfort", CONF_COLUMNS: ""},
    )

    assert result["type"] is FlowResultType.FORM
    assert result["errors"] == {CONF_COLUMNS: "columns_required"}


async def test_duplicate_rows_rejected(hass):
    result = await _start_flow(hass)

    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {
            CONF_NAME: "Climate Profiles",
            CONF_ROWS: "Comfort, comfort",
            CONF_COLUMNS: "Living Room",
        },
    )

    assert result["errors"] == {CONF_ROWS: "duplicate_rows"}


async def test_duplicate_columns_rejected(hass):
    result = await _start_flow(hass)

    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {
            CONF_NAME: "Climate Profiles",
            CONF_ROWS: "Comfort",
            CONF_COLUMNS: "Living Room, living room",
        },
    )

    assert result["errors"] == {CONF_COLUMNS: "duplicate_columns"}


async def test_slug_collision_rows_rejected(hass):
    result = await _start_flow(hass)

    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {
            CONF_NAME: "Climate Profiles",
            CONF_ROWS: "Living Room, living-room",
            CONF_COLUMNS: "Comfort",
        },
    )

    assert result["errors"] == {CONF_ROWS: "duplicate_rows"}


async def test_duplicate_name_aborts(hass):
    first = await _start_flow(hass)
    await hass.config_entries.flow.async_configure(
        first["flow_id"],
        {
            CONF_NAME: "Climate Profiles",
            CONF_ROWS: "Comfort",
            CONF_COLUMNS: "Living Room",
        },
    )

    second = await _start_flow(hass)
    result = await hass.config_entries.flow.async_configure(
        second["flow_id"],
        {CONF_NAME: "climate profiles", CONF_ROWS: "Eco", CONF_COLUMNS: "Office"},
    )

    assert result["type"] is FlowResultType.ABORT
    assert result["reason"] == "already_configured"
