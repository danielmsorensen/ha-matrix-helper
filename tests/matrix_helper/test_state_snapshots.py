"""Each written state must be an independent snapshot of the matrix."""

from __future__ import annotations

import pytest
from homeassistant.const import EVENT_STATE_CHANGED

from custom_components.matrix_helper.const import DOMAIN, SERVICE_SET_CELL

from .conftest import ENTITY_ID


@pytest.mark.usefixtures("loaded_entry")
async def test_old_state_is_not_mutated_by_later_writes(hass):
    """A previous State must keep the value it had, not the entity's live data.

    If the entity handed HA its live nested dict, every later write would
    silently rewrite old states too -- breaking trigger.from_state in
    automations and hiding the change from the frontend's state diff.
    """
    events = []
    hass.bus.async_listen(EVENT_STATE_CHANGED, events.append)

    await hass.services.async_call(
        DOMAIN,
        SERVICE_SET_CELL,
        {"entity_id": ENTITY_ID, "row": "comfort", "column": "office", "value": 20},
        blocking=True,
    )
    first = hass.states.get(ENTITY_ID)

    await hass.services.async_call(
        DOMAIN,
        SERVICE_SET_CELL,
        {"entity_id": ENTITY_ID, "row": "comfort", "column": "office", "value": 21},
        blocking=True,
    )

    assert first.attributes["data"]["comfort"]["office"] == 20
    event = events[-1]
    assert event.data["old_state"].attributes["data"]["comfort"]["office"] == 20
    assert event.data["new_state"].attributes["data"]["comfort"]["office"] == 21
