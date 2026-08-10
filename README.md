# Matrix Helper

A Home Assistant custom integration providing a single-entity, UI-manageable 2D matrix
(rows x columns of numeric-or-null cells). Primary use case: climate profiles — rows are
profiles (comfort/eco/sleep), columns are rooms, cells are target temperatures, referenced
by schedule-driven automations via `state_attr(...)['data'][profile][room]`.

**Status:** Phase 1 complete (backend entity, services, config flow, restore/reconcile),
plus row/column editing after creation. See
[ha-matrix-helper-card](https://github.com/danielmsorensen/ha-matrix-helper-card) for the
companion Lovelace card used for daily cell edits.

## Implemented so far

- [x] Config flow: create a matrix (name, rows and columns entered as individual labels)
- [x] `matrix_helper.set_cell` (row, column, value) — set or clear a single cell
- [x] `matrix_helper.set_row` (row, values) — partial update of one row across columns
- [x] `matrix_helper.set_column` (column, values) — partial update of one column across rows
- [x] Restore/reconcile matrix data across restarts (matches current schema, drops obsolete
      rows/columns, defaults new cells to null)
- [x] Edit an existing matrix's rows/columns after creation, via the config entry's
      "Configure" option. Reaching it: open the matrix entity → Related → its
      Integration → Configure. (Home Assistant does not offer inline editing on the
      Helpers screen for custom integrations — that UI is built-in-domain-only.)
      Editing is a diff by exact label match, not a rename — a label that changes text
      is treated as removing the old one and adding a new one (its data is discarded),
      not as preserving the row/column under a new name.
- [x] Lovelace card — see
      [ha-matrix-helper-card](https://github.com/danielmsorensen/ha-matrix-helper-card),
      a separate repository so it can be installed via HACS independently of this
      integration.

## Development

- `scripts/setup` — install dependencies
- `scripts/develop` — run a local Home Assistant instance with this integration loaded
- `scripts/lint` — run `ruff format`/`ruff check --fix`
- `pytest` — run the test suite
