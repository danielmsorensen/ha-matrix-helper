import type { HomeAssistant } from "custom-card-helpers";

declare global {
  interface Window {
    loadCardHelpers?: () => Promise<{
      createCardElement: (config: {
        type: string;
        entity?: string;
      }) => Promise<HTMLElement & { hass?: HomeAssistant }>;
    }>;
  }
}

interface ProbeHaForm extends HTMLElement {
  hass?: HomeAssistant;
  data?: Record<string, unknown>;
  schema?: unknown;
  updateComplete?: Promise<unknown>;
}

interface ProbeCard extends HTMLElement {
  hass?: HomeAssistant;
  updateComplete?: Promise<unknown>;
}

// Home Assistant lazy-loads many of its own UI components (ha-form,
// ha-selector, ha-expansion-panel, ha-alert, ...), and there is no supported
// way for a custom card to import them directly -- confirmed by HA's own
// maintainers as an unsolved constraint of the custom-elements registry
// (github.com/home-assistant/frontend/discussions/11294: "not solvable
// within the current architecture"). The accepted community technique
// (originated by card author Thomas Loven) is to force Home Assistant to
// load a *real* stock card's config editor once: awaiting that editor's own
// dynamic import pulls in whatever ha-* components it depends on, and since
// custom-element registration is global to the page, they become available
// here too. The Tile card's editor is the target because it statically
// imports ha-form/ha-expansion-panel/ha-alert -- the same components this
// card's own editor needs.
let loadPromise: Promise<void> | null = null;

export function ensureHaFormComponentsLoaded(hass: HomeAssistant): Promise<void> {
  if (!loadPromise) {
    loadPromise = (async () => {
      const helpers = await window.loadCardHelpers?.();
      if (!helpers) {
        return;
      }
      const card = (await helpers.createCardElement({
        type: "tile",
        entity: "sun.sun",
      })) as ProbeCard;
      card.hass = hass;

      // Render a hidden tile card so its own imports (e.g. ha-state-icon for
      // the header) register; getConfigElement() alone doesn't.
      card.style.display = "none";
      document.body.appendChild(card);
      await card.updateComplete;
      card.remove();

      const ctor = card.constructor as { getConfigElement?: () => Promise<unknown> };
      await ctor.getConfigElement?.();

      // ha-form loads per-selector components (e.g. ha-selector-text ->
      // ha-input) only when rendered with them, and the tile editor has no
      // text selector. Render a hidden one so grid cells work without the
      // editor ever opening.
      const probe = document.createElement("ha-form") as ProbeHaForm;
      probe.hass = hass;
      probe.data = {};
      probe.schema = [{ name: "_probe", selector: { text: {} } }];
      probe.style.display = "none";
      document.body.appendChild(probe);
      await probe.updateComplete;
      probe.remove();
    })().catch(() => undefined);
  }
  return loadPromise;
}
