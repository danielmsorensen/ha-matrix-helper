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

// HA lazy-loads its UI components (ha-form, ha-expansion-panel, ha-alert, ...)
// and custom cards can't import them
// (github.com/home-assistant/frontend/discussions/11294). Loading the Tile
// card's editor once pulls them in; element registration is page-global.
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
