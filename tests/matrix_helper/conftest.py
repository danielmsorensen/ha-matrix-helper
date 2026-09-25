"""Shared fixtures for matrix_helper tests."""

from __future__ import annotations

import pytest
from homeassistant.const import CONF_NAME
from homeassistant.helpers.storage import Store
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.matrix_helper.const import (
    CONF_COLUMNS,
    CONF_ROWS,
    DOMAIN,
    STORAGE_VERSION,
)
from custom_components.matrix_helper.matrix import MatrixHelperEntity

ENTITY_ID = "matrix_helper.climate_profiles"


@pytest.fixture(autouse=True)
def auto_enable_custom_integrations(enable_custom_integrations):
    """Enable custom integration loading for every test in this package."""
    return


@pytest.fixture
def matrix_config_entry() -> MockConfigEntry:
    """Return a MockConfigEntry for a small 3x2 matrix."""
    return MockConfigEntry(
        domain=DOMAIN,
        entry_id="test_entry_id",
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
    store = Store(hass, STORAGE_VERSION, f"{DOMAIN}.{matrix_config_entry.entry_id}")
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
