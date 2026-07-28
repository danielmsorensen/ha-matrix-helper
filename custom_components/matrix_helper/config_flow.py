"""Config flow for Matrix Helper."""

from __future__ import annotations

import voluptuous as vol
from homeassistant import config_entries
from homeassistant.const import CONF_NAME
from homeassistant.core import callback
from homeassistant.helpers import selector
from homeassistant.util import slugify

from .const import CONF_COLUMNS, CONF_ROWS, DOMAIN


def _parse_labels(raw: str) -> list[str]:
    """Split a comma-separated field into stripped, non-empty labels."""
    return [item.strip() for item in raw.split(",") if item.strip()]


def _has_duplicates(labels: list[str]) -> bool:
    """Check whether any two labels are equal case-insensitively or share a slug."""
    seen_values: set[str] = set()
    seen_slugs: set[str] = set()
    for label in labels:
        value_key = label.casefold()
        slug_key = slugify(label)
        if value_key in seen_values or slug_key in seen_slugs:
            return True
        seen_values.add(value_key)
        seen_slugs.add(slug_key)
    return False


def _validate_rows_and_columns(rows: list[str], columns: list[str]) -> dict[str, str]:
    """Return field errors for a rows/columns pair, or an empty dict if valid."""
    errors: dict[str, str] = {}
    if not rows:
        errors[CONF_ROWS] = "rows_required"
    elif _has_duplicates(rows):
        errors[CONF_ROWS] = "duplicate_rows"

    if not columns:
        errors[CONF_COLUMNS] = "columns_required"
    elif _has_duplicates(columns):
        errors[CONF_COLUMNS] = "duplicate_columns"
    return errors


class MatrixHelperConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Matrix Helper."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, str] | None = None
    ) -> config_entries.ConfigFlowResult:
        """Handle the single setup step: name, rows, columns."""
        errors: dict[str, str] = {}

        if user_input is not None:
            name = user_input[CONF_NAME].strip()
            rows = _parse_labels(user_input[CONF_ROWS])
            columns = _parse_labels(user_input[CONF_COLUMNS])
            errors = _validate_rows_and_columns(rows, columns)

            if not errors:
                await self.async_set_unique_id(slugify(name))
                self._abort_if_unique_id_configured()
                return self.async_create_entry(
                    title=name,
                    data={CONF_NAME: name},
                    options={CONF_ROWS: rows, CONF_COLUMNS: columns},
                )

        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema(
                {
                    vol.Required(
                        CONF_NAME, default=(user_input or {}).get(CONF_NAME, "")
                    ): selector.TextSelector(),
                    vol.Required(
                        CONF_ROWS, default=(user_input or {}).get(CONF_ROWS, "")
                    ): selector.TextSelector(),
                    vol.Required(
                        CONF_COLUMNS, default=(user_input or {}).get(CONF_COLUMNS, "")
                    ): selector.TextSelector(),
                },
            ),
            errors=errors,
        )

    @staticmethod
    @callback
    def async_get_options_flow(
        _config_entry: config_entries.ConfigEntry,
    ) -> MatrixHelperOptionsFlow:
        """Get the options flow for editing rows/columns after creation."""
        return MatrixHelperOptionsFlow()


# Note: this integration must never register a config-entry update listener
# (hass.config_entries.async_add_update_listener / entry.add_update_listener) —
# OptionsFlowWithReload raises ValueError at flow-finish time if one exists.
class MatrixHelperOptionsFlow(config_entries.OptionsFlowWithReload):
    """Handle editing an existing matrix's rows and columns."""

    async def async_step_init(
        self, user_input: dict[str, str] | None = None
    ) -> config_entries.ConfigFlowResult:
        """Handle the single options step: rows, columns."""
        errors: dict[str, str] = {}

        if user_input is not None:
            rows = _parse_labels(user_input[CONF_ROWS])
            columns = _parse_labels(user_input[CONF_COLUMNS])
            errors = _validate_rows_and_columns(rows, columns)

            if not errors:
                return self.async_create_entry(
                    data={CONF_ROWS: rows, CONF_COLUMNS: columns}
                )

        current = user_input or {
            CONF_ROWS: ", ".join(self.config_entry.options[CONF_ROWS]),
            CONF_COLUMNS: ", ".join(self.config_entry.options[CONF_COLUMNS]),
        }

        return self.async_show_form(
            step_id="init",
            data_schema=vol.Schema(
                {
                    vol.Required(
                        CONF_ROWS, default=current.get(CONF_ROWS, "")
                    ): selector.TextSelector(),
                    vol.Required(
                        CONF_COLUMNS, default=current.get(CONF_COLUMNS, "")
                    ): selector.TextSelector(),
                },
            ),
            errors=errors,
        )
