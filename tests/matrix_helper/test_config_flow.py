"""Tests for the Matrix Helper config flow."""

from __future__ import annotations

from homeassistant import config_entries
from homeassistant.const import CONF_NAME
from homeassistant.data_entry_flow import FlowResultType
from pytest_homeassistant_custom_component.common import MockConfigEntry

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
            CONF_ROWS: ["Comfort", "Eco", "Sleep"],
            CONF_COLUMNS: ["Living Room", "Office"],
        },
    )

    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert result["title"] == "Climate Profiles"
    assert result["data"] == {}
    assert result["options"] == {
        CONF_NAME: "Climate Profiles",
        CONF_ROWS: ["Comfort", "Eco", "Sleep"],
        CONF_COLUMNS: ["Living Room", "Office"],
    }


async def test_empty_rows_rejected(hass):
    result = await _start_flow(hass)

    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {CONF_NAME: "Climate Profiles", CONF_ROWS: [], CONF_COLUMNS: ["Living Room"]},
    )

    assert result["type"] is FlowResultType.FORM
    assert result["errors"] == {"base": "rows_required"}


async def test_empty_columns_rejected(hass):
    result = await _start_flow(hass)

    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {CONF_NAME: "Climate Profiles", CONF_ROWS: ["Comfort"], CONF_COLUMNS: []},
    )

    assert result["type"] is FlowResultType.FORM
    assert result["errors"] == {"base": "columns_required"}


async def test_duplicate_rows_rejected(hass):
    result = await _start_flow(hass)

    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {
            CONF_NAME: "Climate Profiles",
            CONF_ROWS: ["Comfort", "comfort"],
            CONF_COLUMNS: ["Living Room"],
        },
    )

    assert result["errors"] == {"base": "duplicate_rows"}


async def test_duplicate_columns_rejected(hass):
    result = await _start_flow(hass)

    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {
            CONF_NAME: "Climate Profiles",
            CONF_ROWS: ["Comfort"],
            CONF_COLUMNS: ["Living Room", "living room"],
        },
    )

    assert result["errors"] == {"base": "duplicate_columns"}


async def test_slug_collision_rows_rejected(hass):
    result = await _start_flow(hass)

    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {
            CONF_NAME: "Climate Profiles",
            CONF_ROWS: ["Living Room", "living-room"],
            CONF_COLUMNS: ["Comfort"],
        },
    )

    assert result["errors"] == {"base": "duplicate_rows"}


async def test_options_flow_updates_rows_and_columns_preserving_matching_data(hass):
    entry = MockConfigEntry(
        domain=DOMAIN,
        data={},
        options={
            CONF_NAME: "Climate Profiles",
            CONF_ROWS: ["Comfort", "Eco"],
            CONF_COLUMNS: ["Living Room", "Office"],
        },
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    await hass.services.async_call(
        DOMAIN,
        "set_cell",
        {
            "entity_id": "matrix_helper.climate_profiles",
            "row": "comfort",
            "column": "living_room",
            "value": 21.0,
        },
        blocking=True,
    )

    result = await hass.config_entries.options.async_init(entry.entry_id)
    assert result["type"] is FlowResultType.FORM
    assert result["step_id"] == "init"

    result = await hass.config_entries.options.async_configure(
        result["flow_id"],
        {
            CONF_ROWS: ["Comfort", "Sleep"],  # drop Eco, add Sleep
            CONF_COLUMNS: ["Living Room", "Bedroom"],  # drop Office, add Bedroom
        },
    )

    assert result["type"] is FlowResultType.CREATE_ENTRY
    await hass.async_block_till_done()

    state = hass.states.get("matrix_helper.climate_profiles")
    assert state.attributes["rows"] == ["comfort", "sleep"]
    assert state.attributes["columns"] == ["living_room", "bedroom"]
    assert state.attributes["data"]["comfort"]["living_room"] == 21.0  # preserved
    assert "eco" not in state.attributes["data"]  # dropped
    assert state.attributes["data"]["comfort"]["bedroom"] is None  # new -> null

    # name must survive an options-flow save even though the options flow's
    # own schema never declares a name field
    assert entry.options[CONF_NAME] == "Climate Profiles"


async def test_options_flow_empty_rows_rejected(hass):
    entry = MockConfigEntry(
        domain=DOMAIN,
        data={},
        options={
            CONF_NAME: "Climate Profiles",
            CONF_ROWS: ["Comfort"],
            CONF_COLUMNS: ["Living Room"],
        },
    )
    entry.add_to_hass(hass)

    result = await hass.config_entries.options.async_init(entry.entry_id)
    result = await hass.config_entries.options.async_configure(
        result["flow_id"],
        {CONF_ROWS: [], CONF_COLUMNS: ["Living Room"]},
    )

    assert result["type"] is FlowResultType.FORM
    assert result["errors"] == {"base": "rows_required"}


async def test_options_flow_prefills_current_rows_and_columns(hass):
    entry = MockConfigEntry(
        domain=DOMAIN,
        data={},
        options={
            CONF_NAME: "Climate Profiles",
            CONF_ROWS: ["Comfort", "Eco"],
            CONF_COLUMNS: ["Living Room"],
        },
    )
    entry.add_to_hass(hass)

    result = await hass.config_entries.options.async_init(entry.entry_id)

    suggested = {
        field.schema: field.description["suggested_value"]
        for field in result["data_schema"].schema
    }
    assert suggested[CONF_ROWS] == ["Comfort", "Eco"]
    assert suggested[CONF_COLUMNS] == ["Living Room"]
