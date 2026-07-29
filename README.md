# Matrix Helper

A Home Assistant custom integration providing a single-entity, UI-manageable 2D matrix
(rows x columns of numeric-or-null cells). Primary use case: climate profiles — rows are
profiles (comfort/eco/sleep), columns are rooms, cells are target temperatures, referenced
by schedule-driven automations via `state_attr(...)['data'][profile][room]`.

**Status:** Phase 1 complete (backend entity, services, config flow, restore/reconcile),
plus row/column editing after creation and a Lovelace card for daily cell edits.

## Implemented so far

- [x] Config flow: create a matrix (name, comma-separated rows, comma-separated columns)
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
- [x] Lovelace card (`matrix-helper-card`) — an inline-editable grid for quick cell
      edits, addable via the dashboard's "Add Card" picker (including as a suggested
      card for the entity) or YAML (`type: custom:matrix-helper-card`). Configurable
      tap/hold/double-tap actions (None, More info, Navigate, URL — More info by
      default on tap), matching how standard Lovelace cards behave. Row/column headers
      are a best-effort reconstruction of the original label (`living_room` →
      "Living Room"), not the exact original text, since the backend only stores the
      slug.

## Development

Requires Node.js 18+ on `PATH` for the Lovelace card's build tooling (`scripts/setup` and
`scripts/lint` shell out to `npm`).

- `scripts/setup` — install dependencies
- `scripts/develop` — run a local Home Assistant instance with this integration loaded
- `scripts/lint` — run `ruff format`/`ruff check --fix`
- `pytest` — run the test suite

## Using the Lovelace card

1. `scripts/develop` builds the card automatically and publishes it to
   `config/www/matrix-helper-card.js`. For a real (non-dev) Home Assistant instance, run
   `scripts/build-frontend` and copy `frontend/dist/matrix-helper-card.js` into that
   instance's own `www/` folder.
2. Add it as a dashboard resource once: Settings → Dashboards → Resources → Add Resource,
   URL `/local/matrix-helper-card.js`, Resource type "JavaScript Module".
3. Add the card via a dashboard's "Add Card" picker (search "Matrix Helper Card") or in
   YAML mode:
   ```yaml
   type: custom:matrix-helper-card
   entity: matrix_helper.climate_profiles
   title: Climate Profiles   # optional, defaults to the entity's friendly name
   ```
