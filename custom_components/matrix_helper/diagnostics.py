"""Diagnostics support for Matrix Helper."""

from __future__ import annotations

from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant

    from . import MatrixHelperConfigEntry


async def async_get_config_entry_diagnostics(
    _hass: HomeAssistant, entry: MatrixHelperConfigEntry
) -> dict[str, Any]:
    """Return the matrix's configuration and current data."""
    entity = entry.runtime_data
    return {
        "options": dict(entry.options),
        "entity_id": entity.entity_id,
        "last_modified": entity.state,
        "data": entity.data,
    }
