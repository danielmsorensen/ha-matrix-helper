"""MatrixHelperEntity — the data model for a single matrix."""

from __future__ import annotations

import math
from typing import TYPE_CHECKING, Any

from homeassistant.const import CONF_NAME
from homeassistant.exceptions import ServiceValidationError
from homeassistant.helpers.restore_state import RestoreEntity
from homeassistant.util import dt as dt_util
from homeassistant.util import slugify

from .const import (
    ATTR_COLUMN_LABELS,
    ATTR_COLUMNS,
    ATTR_DATA,
    ATTR_ROW_LABELS,
    ATTR_ROWS,
    CONF_COLUMNS,
    CONF_ROWS,
    DOMAIN,
    STORAGE_SAVE_DELAY,
)

if TYPE_CHECKING:
    from homeassistant.config_entries import ConfigEntry
    from homeassistant.helpers.storage import Store

type MatrixData = dict[str, dict[str, float | None]]
type Cell = tuple[str, str]


def _restored_value(value: Any) -> float | None:
    """Return a stored cell value, or None if it isn't a usable number."""
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        return None
    return float(value) if math.isfinite(value) else None


class MatrixHelperEntity(RestoreEntity):
    """
    A single rows x columns matrix of float-or-null cells.

    Row/column keys are the slugs of their labels; every service accepts
    either form. Data is persisted in its own Store so edits survive a
    crash, not just a clean shutdown. RestoreEntity is kept only to migrate
    data from 1.0.x, which stored it solely in the restore state.
    """

    _attr_should_poll = False
    _attr_icon = "mdi:matrix"
    # The whole matrix changes on every edit; keep it out of the recorder so
    # large matrices don't bloat the database or trip its attribute size cap.
    _unrecorded_attributes = frozenset(
        {ATTR_ROWS, ATTR_COLUMNS, ATTR_ROW_LABELS, ATTR_COLUMN_LABELS, ATTR_DATA}
    )

    def __init__(self, entry: ConfigEntry, store: Store[dict[str, Any]]) -> None:
        """Build the matrix schema and blank cell data from a config entry."""
        self._store = store
        self._attr_unique_id = entry.entry_id
        self._attr_name = entry.options[CONF_NAME]
        self.row_labels: list[str] = list(entry.options[CONF_ROWS])
        self.column_labels: list[str] = list(entry.options[CONF_COLUMNS])
        self.rows: list[str] = [slugify(label) for label in self.row_labels]
        self.columns: list[str] = [slugify(label) for label in self.column_labels]
        self._column_keys = frozenset(self.columns)
        self._data: MatrixData = {row: dict.fromkeys(self.columns) for row in self.rows}
        self._last_modified: str = dt_util.utcnow().isoformat()

    @property
    def state(self) -> str:
        """Return the ISO timestamp of the last modification."""
        return self._last_modified

    @property
    def data(self) -> MatrixData:
        """Return a copy of the cell data."""
        return {row: dict(values) for row, values in self._data.items()}

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """
        Return the matrix schema and data.

        `data` must be a fresh copy: HA keeps a reference to it in the State
        object, so handing over the live dicts would make every later edit
        rewrite previous states too (breaking trigger.from_state and the
        frontend's state diffs).
        """
        return {
            ATTR_ROWS: self.rows,
            ATTR_COLUMNS: self.columns,
            ATTR_ROW_LABELS: self.row_labels,
            ATTR_COLUMN_LABELS: self.column_labels,
            ATTR_DATA: self.data,
        }

    def _row_key(self, row: str) -> str:
        key = slugify(row)
        if key not in self._data:
            raise ServiceValidationError(
                translation_domain=DOMAIN,
                translation_key="unknown_row",
                translation_placeholders={
                    "row": row,
                    "valid_rows": ", ".join(self.rows),
                },
            )
        return key

    def _column_key(self, column: str) -> str:
        key = slugify(column)
        if key not in self._column_keys:
            raise ServiceValidationError(
                translation_domain=DOMAIN,
                translation_key="unknown_column",
                translation_placeholders={
                    "column": column,
                    "valid_columns": ", ".join(self.columns),
                },
            )
        return key

    def _cells(self, row: str | None, column: str | None) -> list[Cell]:
        """Return every cell in the given row and/or column (all if neither)."""
        rows = [self._row_key(row)] if row is not None else self.rows
        columns = [self._column_key(column)] if column is not None else self.columns
        return [(r, c) for r in rows for c in columns]

    def _apply(self, changes: dict[Cell, float | None]) -> None:
        """
        Apply already-validated cell changes, writing state only if any differ.

        Callers resolve every key before calling this, so an invalid key in a
        bulk update raises before anything is changed.
        """
        changed = False
        for (row, column), value in changes.items():
            if self._data[row][column] != value:
                self._data[row][column] = value
                changed = True
        if not changed:
            return
        self._last_modified = dt_util.utcnow().isoformat()
        self.async_write_ha_state()
        self._store.async_delay_save(self._storage_data, STORAGE_SAVE_DELAY)

    async def async_set_cell(
        self, row: str, column: str, value: float | None = None
    ) -> None:
        """Set (or clear) a single cell."""
        self._apply({(self._row_key(row), self._column_key(column)): value})

    async def async_set_row(self, row: str, values: dict[str, float | None]) -> None:
        """Update a row, changing only the given columns."""
        row_key = self._row_key(row)
        self._apply({(row_key, self._column_key(c)): v for c, v in values.items()})

    async def async_set_column(
        self, column: str, values: dict[str, float | None]
    ) -> None:
        """Update a column, changing only the given rows."""
        column_key = self._column_key(column)
        self._apply({(self._row_key(r), column_key): v for r, v in values.items()})

    async def async_set_values(
        self, values: dict[str, dict[str, float | None]]
    ) -> None:
        """Update any cells, given as a {row: {column: value}} mapping."""
        self._apply(
            {
                (self._row_key(row), self._column_key(column)): value
                for row, columns in values.items()
                for column, value in columns.items()
            }
        )

    async def async_fill(
        self,
        value: float | None = None,
        row: str | None = None,
        column: str | None = None,
    ) -> None:
        """Set every cell (or every cell in a row/column) to one value."""
        self._apply(dict.fromkeys(self._cells(row, column), value))

    async def async_adjust(
        self, amount: float, row: str | None = None, column: str | None = None
    ) -> None:
        """Add an amount to every non-null cell (or those in a row/column)."""
        self._apply(
            {
                (r, c): round(current + amount, 10)
                for r, c in self._cells(row, column)
                if (current := self._data[r][c]) is not None
            }
        )

    def _storage_data(self) -> dict[str, Any]:
        return {"data": self._data, "last_modified": self._last_modified}

    async def async_added_to_hass(self) -> None:
        """Load stored data, reconciled against the current rows/columns."""
        await super().async_added_to_hass()
        if (stored := await self._store.async_load()) is not None:
            old_data = stored.get("data")
            last_modified = stored.get("last_modified")
        elif (last_state := await self.async_get_last_state()) is not None:
            old_data = last_state.attributes.get(ATTR_DATA)
            last_modified = last_state.state
        else:
            return

        if not isinstance(old_data, dict):
            old_data = {}
        for row in self.rows:
            old_row = old_data.get(row)
            if isinstance(old_row, dict):
                for column in self.columns:
                    self._data[row][column] = _restored_value(old_row.get(column))
        if isinstance(last_modified, str):
            self._last_modified = last_modified
        # Persist the reconciled (or migrated) data straight away.
        self._store.async_delay_save(self._storage_data, STORAGE_SAVE_DELAY)

    async def async_will_remove_from_hass(self) -> None:
        """Flush any pending write before the entity goes away (e.g. on reload)."""
        await super().async_will_remove_from_hass()
        await self._store.async_save(self._storage_data())
