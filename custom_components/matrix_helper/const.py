"""Constants for matrix_helper."""

from __future__ import annotations

from logging import Logger, getLogger

LOGGER: Logger = getLogger(__package__)

DOMAIN = "matrix_helper"

CONF_ROWS = "rows"
CONF_COLUMNS = "columns"

ATTR_ROWS = "rows"
ATTR_COLUMNS = "columns"
ATTR_ROW_LABELS = "row_labels"
ATTR_COLUMN_LABELS = "column_labels"
ATTR_DATA = "data"

ATTR_ROW = "row"
ATTR_COLUMN = "column"
ATTR_VALUE = "value"
ATTR_VALUES = "values"
ATTR_AMOUNT = "amount"

SERVICE_SET_CELL = "set_cell"
SERVICE_SET_ROW = "set_row"
SERVICE_SET_COLUMN = "set_column"
SERVICE_SET_VALUES = "set_values"
SERVICE_FILL = "fill"
SERVICE_ADJUST = "adjust"

STORAGE_VERSION = 1
# Batches bursts of edits (e.g. a script setting many cells) into one write.
STORAGE_SAVE_DELAY = 1
