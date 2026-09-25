"""The Matrix Helper integration."""

from __future__ import annotations

import math
from typing import TYPE_CHECKING, Any

import voluptuous as vol
from homeassistant.config_entries import ConfigEntry
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.entity_component import EntityComponent
from homeassistant.helpers.storage import Store
from homeassistant.util.hass_dict import HassKey

from .const import (
    ATTR_AMOUNT,
    ATTR_COLUMN,
    ATTR_ROW,
    ATTR_VALUE,
    ATTR_VALUES,
    DOMAIN,
    LOGGER,
    SERVICE_ADJUST,
    SERVICE_FILL,
    SERVICE_SET_CELL,
    SERVICE_SET_COLUMN,
    SERVICE_SET_ROW,
    SERVICE_SET_VALUES,
    STORAGE_VERSION,
)
from .matrix import MatrixHelperEntity

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant
    from homeassistant.helpers.typing import ConfigType

type MatrixHelperConfigEntry = ConfigEntry[MatrixHelperEntity]

DATA_COMPONENT: HassKey[EntityComponent[MatrixHelperEntity]] = HassKey(DOMAIN)


def _finite(value: float) -> float:
    if not math.isfinite(value):
        msg = "must be a finite number"
        raise vol.Invalid(msg)
    return value


NUMBER = vol.All(vol.Coerce(float), _finite)
CELL_VALUE = vol.Any(None, NUMBER)
# Rows/columns may be given as their label ("Living Room") or key
# ("living_room"); the entity slugifies either to the key.
KEY = cv.string

SET_CELL_SCHEMA: dict[Any, Any] = {
    vol.Required(ATTR_ROW): KEY,
    vol.Required(ATTR_COLUMN): KEY,
    vol.Optional(ATTR_VALUE, default=None): CELL_VALUE,
}
SET_ROW_SCHEMA: dict[Any, Any] = {
    vol.Required(ATTR_ROW): KEY,
    vol.Required(ATTR_VALUES): {KEY: CELL_VALUE},
}
SET_COLUMN_SCHEMA: dict[Any, Any] = {
    vol.Required(ATTR_COLUMN): KEY,
    vol.Required(ATTR_VALUES): {KEY: CELL_VALUE},
}
SET_VALUES_SCHEMA: dict[Any, Any] = {
    vol.Required(ATTR_VALUES): {KEY: {KEY: CELL_VALUE}},
}
FILL_SCHEMA: dict[Any, Any] = {
    vol.Optional(ATTR_VALUE, default=None): CELL_VALUE,
    vol.Optional(ATTR_ROW): KEY,
    vol.Optional(ATTR_COLUMN): KEY,
}
ADJUST_SCHEMA: dict[Any, Any] = {
    vol.Required(ATTR_AMOUNT): NUMBER,
    vol.Optional(ATTR_ROW): KEY,
    vol.Optional(ATTR_COLUMN): KEY,
}

SERVICES = {
    SERVICE_SET_CELL: (SET_CELL_SCHEMA, "async_set_cell"),
    SERVICE_SET_ROW: (SET_ROW_SCHEMA, "async_set_row"),
    SERVICE_SET_COLUMN: (SET_COLUMN_SCHEMA, "async_set_column"),
    SERVICE_SET_VALUES: (SET_VALUES_SCHEMA, "async_set_values"),
    SERVICE_FILL: (FILL_SCHEMA, "async_fill"),
    SERVICE_ADJUST: (ADJUST_SCHEMA, "async_adjust"),
}

# This integration is config-entry-only: there is no YAML configuration.yaml
# setup path, only the config/options flows.
CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)


def _store(hass: HomeAssistant, entry: ConfigEntry) -> Store[dict[str, Any]]:
    return Store(hass, STORAGE_VERSION, f"{DOMAIN}.{entry.entry_id}")


async def async_setup(hass: HomeAssistant, _config: ConfigType) -> bool:
    """Set up the shared EntityComponent and services for this domain."""
    component: EntityComponent[MatrixHelperEntity] = EntityComponent(
        LOGGER, DOMAIN, hass
    )
    hass.data[DATA_COMPONENT] = component
    for service, (schema, method) in SERVICES.items():
        component.async_register_entity_service(service, schema, method)
    return True


async def async_setup_entry(
    hass: HomeAssistant, entry: MatrixHelperConfigEntry
) -> bool:
    """Set up a single matrix from a config entry."""
    component = hass.data[DATA_COMPONENT]
    entity = MatrixHelperEntity(entry, _store(hass, entry))
    await component.async_add_entities([entity])
    entry.runtime_data = entity

    # component.async_add_entities() doesn't go through a per-entry
    # EntityPlatform (there's no separate platform module to forward to -
    # matrix_helper's entities are its own domain), so the registry entry
    # it creates has no config_entry_id. Link it explicitly so the
    # frontend can associate the entity with its config entry (otherwise
    # Settings > Helpers shows the config entry and the entity as two
    # separate, unlinked rows) and removing the entry removes the entity.
    registry = er.async_get(hass)
    if entity.entity_id in registry.entities:
        registry.async_update_entity(entity.entity_id, config_entry_id=entry.entry_id)

    return True


async def async_unload_entry(
    hass: HomeAssistant, entry: MatrixHelperConfigEntry
) -> bool:
    """Unload a matrix config entry."""
    await hass.data[DATA_COMPONENT].async_remove_entity(entry.runtime_data.entity_id)
    return True


async def async_remove_entry(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Delete a removed matrix's stored data."""
    await _store(hass, entry).async_remove()
