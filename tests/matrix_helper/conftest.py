"""Shared fixtures for matrix_helper tests."""

from __future__ import annotations

import pytest
from homeassistant.const import CONF_NAME
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.matrix_helper.const import CONF_COLUMNS, CONF_ROWS, DOMAIN


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
        data={
            CONF_NAME: "Climate Profiles",
            CONF_ROWS: ["Comfort", "Eco", "Sleep"],
            CONF_COLUMNS: ["Living Room", "Office"],
        },
    )
