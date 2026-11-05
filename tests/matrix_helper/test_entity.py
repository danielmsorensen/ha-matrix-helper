"""Tests for the MatrixHelperEntity data model."""

from __future__ import annotations

from datetime import datetime

import pytest
from homeassistant.helpers import entity_registry as er

from custom_components.matrix_helper.const import (
    ATTR_COLUMN_LABELS,
    ATTR_COLUMNS,
    ATTR_DATA,
    ATTR_ROW_LABELS,
    ATTR_ROWS,
)

from .conftest import ENTITY_ID, ENTRY_ID


def test_entity_initial_state_and_attributes(matrix_entity):
    entity = matrix_entity

    assert entity.unique_id == ENTRY_ID
    assert entity.name == "Climate Profiles"
    assert entity.icon == "mdi:matrix"
    assert entity.rows == ["comfort", "eco", "sleep"]
    assert entity.columns == ["living_room", "office"]

    attrs = entity.extra_state_attributes
    assert attrs[ATTR_ROWS] == ["comfort", "eco", "sleep"]
    assert attrs[ATTR_COLUMNS] == ["living_room", "office"]
    assert attrs[ATTR_ROW_LABELS] == ["Comfort", "Eco", "Sleep"]
    assert attrs[ATTR_COLUMN_LABELS] == ["Living Room", "Office"]
    assert attrs[ATTR_DATA] == {
        "comfort": {"living_room": None, "office": None},
        "eco": {"living_room": None, "office": None},
        "sleep": {"living_room": None, "office": None},
    }


def test_entity_state_is_iso_timestamp(matrix_entity):
    entity = matrix_entity

    # A valid ISO 8601 timestamp round-trips through fromisoformat.
    datetime.fromisoformat(entity.state)


@pytest.mark.usefixtures("loaded_entry")
async def test_entity_created_via_config_entry(hass):
    state = hass.states.get(ENTITY_ID)
    assert state is not None
    assert state.attributes["rows"] == ["comfort", "eco", "sleep"]
    assert state.attributes["columns"] == ["living_room", "office"]


async def test_entity_is_linked_to_its_config_entry(hass, loaded_entry):
    registry = er.async_get(hass)
    registry_entry = registry.entities[ENTITY_ID]

    # Without this link, Settings > Helpers can't associate the entity with
    # its config entry and shows them as two separate, unlinked rows.
    assert registry_entry.config_entry_id == loaded_entry.entry_id
