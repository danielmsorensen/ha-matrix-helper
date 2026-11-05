"""
The dashboard card bundled with the integration (www/, built from frontend/).

The integration serves the bundle from its own static path and registers it
as a dashboard resource, so the card works as soon as the integration is
set up: nothing is copied to config/www and no separate HACS download is
needed.
"""

from __future__ import annotations

import hashlib
from pathlib import Path
from typing import TYPE_CHECKING, Any

from homeassistant.components.frontend import add_extra_js_url, remove_extra_js_url
from homeassistant.components.http import StaticPathConfig
from homeassistant.components.lovelace.const import LOVELACE_DATA, MODE_STORAGE
from homeassistant.helpers import issue_registry as ir
from homeassistant.util.hass_dict import HassKey

from .const import (
    CARD_FILENAME,
    CARD_URL_BASE,
    DOMAIN,
    ISSUE_LEGACY_CARD,
    LEGACY_CARD_URL_MARKERS,
    LOGGER,
)

if TYPE_CHECKING:
    from homeassistant.components.lovelace.resources import ResourceStorageCollection
    from homeassistant.core import HomeAssistant

WWW_DIR = Path(__file__).parent / "www"
CARD_PATH = f"{CARD_URL_BASE}/{CARD_FILENAME}"
DATA_CARD_URL: HassKey[str] = HassKey(f"{DOMAIN}_card_url")
# A static path can only be registered once per run, even if the resource
# is removed (last matrix deleted) and added again later.
DATA_CARD_SERVED: HassKey[bool] = HassKey(f"{DOMAIN}_card_served")


def _card_url() -> str:
    """Return the bundle's URL, with a content hash so updates bust caches."""
    digest = hashlib.sha256((WWW_DIR / CARD_FILENAME).read_bytes()).hexdigest()
    return f"{CARD_PATH}?v={digest[:12]}"


def _is_card(url: str) -> bool:
    return url.split("?", 1)[0] == CARD_PATH


def _storage_resources(hass: HomeAssistant) -> ResourceStorageCollection | None:
    """Return the editable dashboard resources, or None in YAML mode."""
    lovelace = hass.data.get(LOVELACE_DATA)
    if lovelace is None or lovelace.resource_mode != MODE_STORAGE:
        return None
    return lovelace.resources  # type: ignore[return-value]


async def _resource_items(hass: HomeAssistant) -> list[dict[str, Any]]:
    if (lovelace := hass.data.get(LOVELACE_DATA)) is None:
        return []
    await lovelace.resources.async_get_info()  # loads storage-mode resources
    return list(lovelace.resources.async_items())


async def async_register_card(hass: HomeAssistant) -> None:
    """Serve the card and add (or update) its dashboard resource, once per run."""
    if DATA_CARD_URL in hass.data:
        return
    url = await hass.async_add_executor_job(_card_url)
    hass.data[DATA_CARD_URL] = url
    if not hass.data.get(DATA_CARD_SERVED):
        await hass.http.async_register_static_paths(
            [StaticPathConfig(CARD_URL_BASE, str(WWW_DIR), cache_headers=True)]
        )
        hass.data[DATA_CARD_SERVED] = True

    items = await _resource_items(hass)
    if (resources := _storage_resources(hass)) is not None:
        ours = [item for item in items if _is_card(item["url"])]
        if not ours:
            await resources.async_create_item({"res_type": "module", "url": url})
            LOGGER.info("Registered the Matrix Helper Card dashboard resource")
        else:
            if ours[0]["url"] != url:
                await resources.async_update_item(
                    ours[0]["id"], {"res_type": "module", "url": url}
                )
            for duplicate in ours[1:]:
                await resources.async_delete_item(duplicate["id"])
    elif "frontend" in hass.config.components:
        # YAML-mode resources can't be edited; load the card on every page.
        add_extra_js_url(hass, url)

    # The standalone card of earlier versions is now redundant (and loads a
    # second copy), so ask for it to be removed.
    if legacy := next(
        (
            item
            for item in items
            if any(marker in item["url"] for marker in LEGACY_CARD_URL_MARKERS)
        ),
        None,
    ):
        ir.async_create_issue(
            hass,
            DOMAIN,
            ISSUE_LEGACY_CARD,
            is_fixable=False,
            severity=ir.IssueSeverity.WARNING,
            translation_key=ISSUE_LEGACY_CARD,
            translation_placeholders={"url": legacy["url"]},
        )
    else:
        ir.async_delete_issue(hass, DOMAIN, ISSUE_LEGACY_CARD)


async def async_unregister_card(hass: HomeAssistant) -> None:
    """Remove the card's dashboard resource (the static path stays until restart)."""
    if (url := hass.data.pop(DATA_CARD_URL, None)) is None:
        return
    ir.async_delete_issue(hass, DOMAIN, ISSUE_LEGACY_CARD)
    if (resources := _storage_resources(hass)) is None:
        if "frontend" in hass.config.components:
            remove_extra_js_url(hass, url)
        return
    for item in await _resource_items(hass):
        if _is_card(item["url"]):
            await resources.async_delete_item(item["id"])
