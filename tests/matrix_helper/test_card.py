"""Tests for serving and registering the bundled dashboard card."""

from __future__ import annotations

import hashlib
from pathlib import Path

import pytest
from homeassistant.components.frontend import DATA_EXTRA_MODULE_URL
from homeassistant.components.lovelace.const import LOVELACE_DATA
from homeassistant.const import CONF_NAME
from homeassistant.helpers import issue_registry as ir
from homeassistant.setup import async_setup_component
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.matrix_helper.const import (
    CONF_COLUMNS,
    CONF_ROWS,
    DOMAIN,
    ISSUE_LEGACY_CARD,
)

BUNDLE = Path("custom_components/matrix_helper/www/matrix-helper-card.js").read_bytes()
CARD_PATH = "/matrix_helper/matrix-helper-card.js"
CARD_URL = f"{CARD_PATH}?v={hashlib.sha256(BUNDLE).hexdigest()[:12]}"
LEGACY_URL = "/hacsfiles/ha-matrix-helper-card/matrix-helper-card.js?hacstag=1"


async def _setup(hass, entry: MockConfigEntry) -> None:
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()


async def _resource_urls(hass) -> list[str]:
    resources = hass.data[LOVELACE_DATA].resources
    await resources.async_get_info()
    return [item["url"] for item in resources.async_items()]


def _second_entry() -> MockConfigEntry:
    return MockConfigEntry(
        domain=DOMAIN,
        entry_id="second_entry_id",
        title="Lighting",
        data={},
        options={CONF_NAME: "Lighting", CONF_ROWS: ["Day"], CONF_COLUMNS: ["Hall"]},
    )


@pytest.fixture
async def lovelace(hass) -> None:
    """Set up dashboards in the default (storage) mode."""
    assert await async_setup_component(hass, "lovelace", {})


@pytest.mark.usefixtures("loaded_entry")
async def test_bundle_is_served(hass, hass_client):
    client = await hass_client()

    response = await client.get(CARD_PATH)

    assert response.status == 200
    assert await response.read() == BUNDLE


@pytest.mark.usefixtures("lovelace")
async def test_resource_is_registered(hass, matrix_config_entry):
    await _setup(hass, matrix_config_entry)

    resources = hass.data[LOVELACE_DATA].resources
    assert [(item["type"], item["url"]) for item in resources.async_items()] == [
        ("module", CARD_URL)
    ]


@pytest.mark.usefixtures("lovelace")
async def test_stale_and_duplicate_resources_are_replaced(hass, matrix_config_entry):
    resources = hass.data[LOVELACE_DATA].resources
    for version in ("old", "older"):
        await resources.async_create_item(
            {"res_type": "module", "url": f"{CARD_PATH}?v={version}"}
        )

    await _setup(hass, matrix_config_entry)

    assert await _resource_urls(hass) == [CARD_URL]


@pytest.mark.usefixtures("lovelace")
async def test_more_matrices_do_not_add_more_resources(hass, matrix_config_entry):
    await _setup(hass, matrix_config_entry)
    await _setup(hass, _second_entry())

    assert await _resource_urls(hass) == [CARD_URL]


async def test_yaml_mode_loads_card_on_every_page(hass, matrix_config_entry):
    # lovelace first: setting up frontend would set it up in storage mode.
    assert await async_setup_component(
        hass, "lovelace", {"lovelace": {"resource_mode": "yaml"}}
    )
    assert await async_setup_component(hass, "frontend", {})

    await _setup(hass, matrix_config_entry)

    assert CARD_URL in hass.data[DATA_EXTRA_MODULE_URL].urls


@pytest.mark.usefixtures("lovelace")
async def test_standalone_card_raises_repair_issue(hass, matrix_config_entry):
    await hass.data[LOVELACE_DATA].resources.async_create_item(
        {"res_type": "module", "url": LEGACY_URL}
    )

    await _setup(hass, matrix_config_entry)

    issue = ir.async_get(hass).async_get_issue(DOMAIN, ISSUE_LEGACY_CARD)
    assert issue is not None
    assert issue.translation_placeholders == {"url": LEGACY_URL}


@pytest.mark.usefixtures("lovelace")
async def test_no_repair_issue_without_standalone_card(hass, matrix_config_entry):
    await _setup(hass, matrix_config_entry)

    assert ir.async_get(hass).async_get_issue(DOMAIN, ISSUE_LEGACY_CARD) is None


@pytest.mark.usefixtures("lovelace")
async def test_resource_follows_the_last_matrix(hass, matrix_config_entry):
    second = _second_entry()
    await _setup(hass, matrix_config_entry)
    await _setup(hass, second)

    await hass.config_entries.async_remove(matrix_config_entry.entry_id)
    assert await _resource_urls(hass) == [CARD_URL]  # another matrix remains

    await hass.config_entries.async_remove(second.entry_id)
    assert await _resource_urls(hass) == []

    # Adding a matrix again in the same run brings the resource back.
    await _setup(hass, _second_entry())
    assert await _resource_urls(hass) == [CARD_URL]
