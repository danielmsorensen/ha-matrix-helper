"""Config flow for Matrix Helper."""

from __future__ import annotations

from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    from collections.abc import Mapping

import voluptuous as vol
from homeassistant.const import CONF_NAME
from homeassistant.helpers import selector
from homeassistant.helpers.schema_config_entry_flow import (
    SchemaCommonFlowHandler,
    SchemaConfigFlowHandler,
    SchemaFlowError,
    SchemaFlowFormStep,
)
from homeassistant.util import slugify

from .const import CONF_COLUMNS, CONF_ROWS, DOMAIN


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


async def _validate_rows_and_columns(
    _handler: SchemaCommonFlowHandler, user_input: dict[str, Any]
) -> dict[str, Any]:
    """Validate name/rows/columns; strip whitespace and drop empty labels."""
    if CONF_NAME in user_input:
        user_input[CONF_NAME] = user_input[CONF_NAME].strip()

    rows = [r.strip() for r in user_input[CONF_ROWS] if r.strip()]
    columns = [c.strip() for c in user_input[CONF_COLUMNS] if c.strip()]

    if not rows:
        msg = "rows_required"
        raise SchemaFlowError(msg)
    if not columns:
        msg = "columns_required"
        raise SchemaFlowError(msg)
    if _has_duplicates(rows):
        msg = "duplicate_rows"
        raise SchemaFlowError(msg)
    if _has_duplicates(columns):
        msg = "duplicate_columns"
        raise SchemaFlowError(msg)

    user_input[CONF_ROWS] = rows
    user_input[CONF_COLUMNS] = columns
    return user_input


ROWS_AND_COLUMNS_SCHEMA = {
    vol.Required(CONF_ROWS): selector.SelectSelector(
        selector.SelectSelectorConfig(options=[], custom_value=True, multiple=True)
    ),
    vol.Required(CONF_COLUMNS): selector.SelectSelector(
        selector.SelectSelectorConfig(options=[], custom_value=True, multiple=True)
    ),
}

CONFIG_SCHEMA = vol.Schema(
    {
        vol.Required(CONF_NAME): selector.TextSelector(),
        **ROWS_AND_COLUMNS_SCHEMA,
    }
)

OPTIONS_SCHEMA = vol.Schema(ROWS_AND_COLUMNS_SCHEMA)

CONFIG_FLOW = {
    "user": SchemaFlowFormStep(
        CONFIG_SCHEMA, validate_user_input=_validate_rows_and_columns
    ),
}

OPTIONS_FLOW = {
    "init": SchemaFlowFormStep(
        OPTIONS_SCHEMA, validate_user_input=_validate_rows_and_columns
    ),
}


class MatrixHelperConfigFlow(SchemaConfigFlowHandler, domain=DOMAIN):
    """Handle a config or options flow for Matrix Helper."""

    config_flow = CONFIG_FLOW
    options_flow = OPTIONS_FLOW
    options_flow_reloads = True

    def async_config_entry_title(self, options: Mapping[str, Any]) -> str:
        """Return config entry title."""
        return str(options[CONF_NAME]).strip()
