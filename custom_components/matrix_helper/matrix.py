"""MatrixHelperEntity — the data model for a single matrix."""

from __future__ import annotations

from datetime import UTC, datetime
from typing import TYPE_CHECKING, Any

from homeassistant.const import CONF_NAME
from homeassistant.exceptions import ServiceValidationError
from homeassistant.helpers.restore_state import RestoreEntity
from homeassistant.util import slugify

from .const import ATTR_COLUMNS, ATTR_DATA, ATTR_ROWS, CONF_COLUMNS, CONF_ROWS, DOMAIN

if TYPE_CHECKING:
    from homeassistant.config_entries import ConfigEntry


class MatrixHelperEntity(RestoreEntity):
    """A single rows x columns matrix of float-or-null cells."""

    _attr_should_poll = False

    def __init__(self, entry: ConfigEntry) -> None:
        """Build the matrix schema and blank cell data from a config entry."""
        self._entry = entry
        self._attr_unique_id = entry.entry_id
        self._attr_name = entry.data[CONF_NAME]
        self.rows: list[str] = [slugify(row) for row in entry.data[CONF_ROWS]]
        self.columns: list[str] = [
            slugify(column) for column in entry.data[CONF_COLUMNS]
        ]
        self._data: dict[str, dict[str, float | None]] = {
            row: dict.fromkeys(self.columns) for row in self.rows
        }
        self._last_modified: str = datetime.now(UTC).isoformat()

    @property
    def state(self) -> str:
        """Return the ISO timestamp of the last modification."""
        return self._last_modified

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return the matrix schema and data."""
        return {
            ATTR_ROWS: self.rows,
            ATTR_COLUMNS: self.columns,
            ATTR_DATA: self._data,
        }

    def _touch(self) -> None:
        self._last_modified = datetime.now(UTC).isoformat()

    def _raise_if_unknown_row(self, row: str) -> None:
        if row not in self.rows:
            raise ServiceValidationError(
                translation_domain=DOMAIN,
                translation_key="unknown_row",
                translation_placeholders={
                    "row": row,
                    "valid_rows": ", ".join(self.rows),
                },
            )

    def _raise_if_unknown_column(self, column: str) -> None:
        if column not in self.columns:
            raise ServiceValidationError(
                translation_domain=DOMAIN,
                translation_key="unknown_column",
                translation_placeholders={
                    "column": column,
                    "valid_columns": ", ".join(self.columns),
                },
            )

    async def async_set_cell(
        self, row: str, column: str, value: float | None = None
    ) -> None:
        """Set (or clear) a single cell."""
        self._raise_if_unknown_row(row)
        self._raise_if_unknown_column(column)
        self._data[row][column] = value
        self._touch()
        self.async_write_ha_state()

    async def async_set_row(self, row: str, values: dict[str, float | None]) -> None:
        """Update a row, changing only the given columns."""
        self._raise_if_unknown_row(row)
        for column in values:
            self._raise_if_unknown_column(column)
        for column, value in values.items():
            self._data[row][column] = value
        self._touch()
        self.async_write_ha_state()

    async def async_added_to_hass(self) -> None:
        """Reconcile any restored state against the current schema."""
        await super().async_added_to_hass()
        last_state = await self.async_get_last_state()
        if last_state is None:
            return
        old_data = last_state.attributes.get(ATTR_DATA, {})
        self._data = {
            row: {column: old_data.get(row, {}).get(column) for column in self.columns}
            for row in self.rows
        }
        self._last_modified = last_state.state
