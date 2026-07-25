"""Config flow for Matrix Helper."""

from __future__ import annotations

import voluptuous as vol
from homeassistant import config_entries
from homeassistant.const import CONF_NAME
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

            if not rows:
                errors[CONF_ROWS] = "rows_required"
            elif _has_duplicates(rows):
                errors[CONF_ROWS] = "duplicate_rows"

            if not columns:
                errors[CONF_COLUMNS] = "columns_required"
            elif _has_duplicates(columns):
                errors[CONF_COLUMNS] = "duplicate_columns"

            if not errors:
                await self.async_set_unique_id(slugify(name))
                self._abort_if_unique_id_configured()
                return self.async_create_entry(
                    title=name,
                    data={CONF_NAME: name, CONF_ROWS: rows, CONF_COLUMNS: columns},
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
