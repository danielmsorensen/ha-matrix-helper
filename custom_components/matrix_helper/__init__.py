"""The Matrix Helper integration."""

from __future__ import annotations

from typing import TYPE_CHECKING

import voluptuous as vol
from homeassistant.helpers.entity_component import EntityComponent

from .const import (
    ATTR_COLUMN,
    ATTR_ROW,
    ATTR_VALUE,
    ATTR_VALUES,
    DOMAIN,
    LOGGER,
    SERVICE_SET_CELL,
    SERVICE_SET_ROW,
)
from .matrix import MatrixHelperEntity

if TYPE_CHECKING:
    from homeassistant.config_entries import ConfigEntry
    from homeassistant.core import HomeAssistant
    from homeassistant.helpers.typing import ConfigType

SET_CELL_SCHEMA = {
    vol.Required(ATTR_ROW): str,
    vol.Required(ATTR_COLUMN): str,
    vol.Optional(ATTR_VALUE, default=None): vol.Any(vol.Coerce(float), None),
}

SET_ROW_SCHEMA = {
    vol.Required(ATTR_ROW): str,
    vol.Required(ATTR_VALUES): {str: vol.Any(vol.Coerce(float), None)},
}


async def async_setup(hass: HomeAssistant, _config: ConfigType) -> bool:
    """Set up the shared EntityComponent and services for this domain."""
    component: EntityComponent[MatrixHelperEntity] = EntityComponent(
        LOGGER, DOMAIN, hass
    )
    hass.data[DOMAIN] = component

    component.async_register_entity_service(
        SERVICE_SET_CELL, SET_CELL_SCHEMA, "async_set_cell"
    )
    component.async_register_entity_service(
        SERVICE_SET_ROW, SET_ROW_SCHEMA, "async_set_row"
    )
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up a single matrix from a config entry."""
    component: EntityComponent[MatrixHelperEntity] = hass.data[DOMAIN]
    entity = MatrixHelperEntity(entry)
    await component.async_add_entities([entity])
    entry.runtime_data = entity
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a matrix config entry."""
    component: EntityComponent[MatrixHelperEntity] = hass.data[DOMAIN]
    await component.async_remove_entity(entry.runtime_data.entity_id)
    return True
