"""Tests for MatrixHelperEntity.async_set_cell / async_set_row."""

from __future__ import annotations

import pytest
from homeassistant.exceptions import ServiceValidationError

from custom_components.matrix_helper.const import (
    ATTR_DATA,
    DOMAIN,
    SERVICE_SET_CELL,
    SERVICE_SET_COLUMN,
)
from custom_components.matrix_helper.matrix import MatrixHelperEntity


def _attach(entity: MatrixHelperEntity, hass) -> None:
    entity.hass = hass
    entity.entity_id = "matrix_helper.climate_profiles"


async def test_set_cell_updates_value_and_timestamp(hass, matrix_config_entry):
    entity = MatrixHelperEntity(matrix_config_entry)
    _attach(entity, hass)
    before = entity.state

    await entity.async_set_cell(row="comfort", column="living_room", value=21.0)

    assert entity.extra_state_attributes[ATTR_DATA]["comfort"]["living_room"] == 21.0
    assert entity.state != before


async def test_set_cell_omitted_value_clears_cell(hass, matrix_config_entry):
    entity = MatrixHelperEntity(matrix_config_entry)
    _attach(entity, hass)
    await entity.async_set_cell(row="comfort", column="living_room", value=21.0)

    await entity.async_set_cell(row="comfort", column="living_room")

    assert entity.extra_state_attributes[ATTR_DATA]["comfort"]["living_room"] is None


async def test_set_cell_unknown_row_raises(hass, matrix_config_entry):
    entity = MatrixHelperEntity(matrix_config_entry)
    _attach(entity, hass)

    with pytest.raises(ServiceValidationError):
        await entity.async_set_cell(row="unknown", column="living_room", value=1.0)


async def test_set_cell_unknown_column_raises(hass, matrix_config_entry):
    entity = MatrixHelperEntity(matrix_config_entry)
    _attach(entity, hass)

    with pytest.raises(ServiceValidationError):
        await entity.async_set_cell(row="comfort", column="unknown", value=1.0)


async def test_set_row_partial_update(hass, matrix_config_entry):
    entity = MatrixHelperEntity(matrix_config_entry)
    _attach(entity, hass)
    await entity.async_set_cell(row="comfort", column="office", value=20.0)

    await entity.async_set_row(row="comfort", values={"living_room": 21.0})

    data = entity.extra_state_attributes[ATTR_DATA]["comfort"]
    assert data["living_room"] == 21.0
    assert data["office"] == 20.0  # untouched by the partial update


async def test_set_row_unknown_column_raises(hass, matrix_config_entry):
    entity = MatrixHelperEntity(matrix_config_entry)
    _attach(entity, hass)

    with pytest.raises(ServiceValidationError):
        await entity.async_set_row(row="comfort", values={"unknown": 1.0})


async def test_set_cell_service_end_to_end(hass, matrix_config_entry):
    matrix_config_entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(matrix_config_entry.entry_id)
    await hass.async_block_till_done()

    await hass.services.async_call(
        DOMAIN,
        SERVICE_SET_CELL,
        {
            "entity_id": "matrix_helper.climate_profiles",
            "row": "comfort",
            "column": "living_room",
            "value": 21.0,
        },
        blocking=True,
    )

    state = hass.states.get("matrix_helper.climate_profiles")
    assert state.attributes["data"]["comfort"]["living_room"] == 21.0


async def test_set_column_updates_value_and_timestamp(hass, matrix_config_entry):
    entity = MatrixHelperEntity(matrix_config_entry)
    _attach(entity, hass)
    before = entity.state

    await entity.async_set_column(column="living_room", values={"comfort": 21.0})

    assert entity.extra_state_attributes[ATTR_DATA]["comfort"]["living_room"] == 21.0
    assert entity.state != before


async def test_set_column_omitted_value_clears_cell(hass, matrix_config_entry):
    entity = MatrixHelperEntity(matrix_config_entry)
    _attach(entity, hass)
    await entity.async_set_column(column="living_room", values={"comfort": 21.0})

    await entity.async_set_column(column="living_room", values={"comfort": None})

    assert entity.extra_state_attributes[ATTR_DATA]["comfort"]["living_room"] is None


async def test_set_column_partial_update(hass, matrix_config_entry):
    entity = MatrixHelperEntity(matrix_config_entry)
    _attach(entity, hass)
    await entity.async_set_cell(row="eco", column="office", value=20.0)

    await entity.async_set_column(column="living_room", values={"comfort": 21.0})

    data = entity.extra_state_attributes[ATTR_DATA]
    assert data["comfort"]["living_room"] == 21.0
    assert data["eco"]["office"] == 20.0  # untouched by the partial update


async def test_set_column_unknown_column_raises(hass, matrix_config_entry):
    entity = MatrixHelperEntity(matrix_config_entry)
    _attach(entity, hass)

    with pytest.raises(ServiceValidationError):
        await entity.async_set_column(column="unknown", values={"comfort": 1.0})


async def test_set_column_unknown_row_raises(hass, matrix_config_entry):
    entity = MatrixHelperEntity(matrix_config_entry)
    _attach(entity, hass)

    with pytest.raises(ServiceValidationError):
        await entity.async_set_column(column="living_room", values={"unknown": 1.0})


async def test_set_column_atomic_on_unknown_row(hass, matrix_config_entry):
    entity = MatrixHelperEntity(matrix_config_entry)
    _attach(entity, hass)

    with pytest.raises(ServiceValidationError):
        await entity.async_set_column(
            column="living_room", values={"comfort": 21.0, "unknown": 1.0}
        )

    # Nothing applied - the valid "comfort" key must not have been written either.
    assert entity.extra_state_attributes[ATTR_DATA]["comfort"]["living_room"] is None


async def test_set_row_atomic_on_unknown_column(hass, matrix_config_entry):
    """Regression test for a gap noted in the Phase 1 review: set_row's atomicity
    was only tested with an all-bad-key dict, never a mixed valid/invalid one."""
    entity = MatrixHelperEntity(matrix_config_entry)
    _attach(entity, hass)

    with pytest.raises(ServiceValidationError):
        await entity.async_set_row(
            row="comfort", values={"living_room": 21.0, "unknown": 1.0}
        )

    assert entity.extra_state_attributes[ATTR_DATA]["comfort"]["living_room"] is None


async def test_set_column_service_end_to_end(hass, matrix_config_entry):
    matrix_config_entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(matrix_config_entry.entry_id)
    await hass.async_block_till_done()

    await hass.services.async_call(
        DOMAIN,
        SERVICE_SET_COLUMN,
        {
            "entity_id": "matrix_helper.climate_profiles",
            "column": "living_room",
            "values": {"comfort": 21.0},
        },
        blocking=True,
    )

    state = hass.states.get("matrix_helper.climate_profiles")
    assert state.attributes["data"]["comfort"]["living_room"] == 21.0
