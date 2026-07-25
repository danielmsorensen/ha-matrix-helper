# Matrix Helper

A Home Assistant custom integration providing a single-entity, UI-manageable 2D matrix
(rows x columns of numeric-or-null cells). Primary use case: climate profiles — rows are
profiles (comfort/eco/sleep), columns are rooms, cells are target temperatures, referenced
by schedule-driven automations via `state_attr(...)['data'][profile][room]`.

**Status:** Phase 1 (backend entity, services, minimal config flow).

## Development

- `scripts/setup` — install dependencies
- `scripts/develop` — run a local Home Assistant instance with this integration loaded
- `scripts/lint` — run `ruff format`/`ruff check --fix`
- `pytest` — run the test suite
