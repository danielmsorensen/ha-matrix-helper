"""Shared fixtures for matrix_helper tests."""

from __future__ import annotations

import pytest
from homeassistant.const import CONF_NAME
from homeassistant.helpers.storage import Store
from pytest_homeassistant.common import MockConfigEntry

from custom_components.matrix_helper.const import (
    CONF_COLUMNS,
    CONF_ROWS,
    DOMAIN,
    STORAGE_VERSION,
)
from custom_components.matrix_helper.matrix import MatrixHelperEntity

ENTITY_ID = "matrix_helper.climate_profiles"
ENTRY_ID = "test_entry_id"
STORAGE_KEY = f"{DOMAIN}.{ENTRY_ID}"


@pytest.fixture
def matrix_config_entry() -> MockConfigEntry:
    """Return a MockConfigEntry for a small 3x2 matrix."""
    return MockConfigEntry(
        domain=DOMAIN,
        entry_id=ENTRY_ID,
        title="Climate Profiles",
        data={},
        options={
            CONF_NAME: "Climate Profiles",
            CONF_ROWS: ["Comfort", "Eco", "Sleep"],
            CONF_COLUMNS: ["Living Room", "Office"],
        },
    )


@pytest.fixture
def matrix_entity(hass, matrix_config_entry) -> MatrixHelperEntity:
    """Return a MatrixHelperEntity attached to hass but not added to it."""
    store = Store(hass, STORAGE_VERSION, STORAGE_KEY)
    entity = MatrixHelperEntity(matrix_config_entry, store)
    entity.hass = hass
    entity.entity_id = ENTITY_ID
    return entity


@pytest.fixture
async def loaded_entry(hass, matrix_config_entry) -> MockConfigEntry:
    """Return the matrix config entry, added to hass and set up."""
    matrix_config_entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(matrix_config_entry.entry_id)
    await hass.async_block_till_done()
    return matrix_config_entry
