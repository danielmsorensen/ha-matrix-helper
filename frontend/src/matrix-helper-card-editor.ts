import { LitElement, html, PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { HomeAssistant, LovelaceCardEditor, fireEvent } from "custom-card-helpers";
import type { MatrixHelperCardConfig } from "./types";
import { DOMAIN } from "./types";
import { ensureHaFormComponentsLoaded } from "./ha-components-loader";
import { defineOnce } from "./define-once";

// Action types offered in the editor; others still work if set in YAML.
const ACTIONS = ["more-info", "navigate", "url", "none"] as const;

// Rendered entirely by <ha-form>, like HA's own card editors. Content mirrors
// the Entities row editor; ui_state_content derives its options from the
// entity, so they can't go stale.
const SCHEMA = [
  { name: "entity", selector: { entity: { filter: { domain: DOMAIN } } } },
  {
    name: "content",
    type: "expandable",
    flatten: true,
    schema: [
      { name: "name", selector: { entity_name: {} }, context: { entity: "entity" } },
      {
        name: "",
        type: "grid",
        schema: [
          { name: "icon", selector: { icon: {} }, context: { icon_entity: "entity" } },
          {
            name: "color",
            selector: { ui_color: { include_state: true, include_none: true } },
          },
        ],
      },
      {
        name: "state_content",
        selector: { ui_state_content: { allow_context: true } },
        context: { filter_entity: "entity" },
      },
    ],
  },
  {
    name: "interactions",
    type: "expandable",
    flatten: true,
    schema: [
      {
        name: "tap_action",
        selector: { ui_action: { actions: ACTIONS, default_action: "more-info" } },
      },
      {
        name: "",
        type: "optional_actions",
        flatten: true,
        schema: [
          {
            name: "hold_action",
            selector: { ui_action: { actions: ACTIONS, default_action: "none" } },
          },
          {
            name: "double_tap_action",
            selector: { ui_action: { actions: ACTIONS, default_action: "none" } },
          },
        ],
      },
    ],
  },
] as const;

export class MatrixHelperCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private config?: MatrixHelperCardConfig;

  public connectedCallback(): void {
    super.connectedCallback();
    if (this.hass) {
      ensureHaFormComponentsLoaded(this.hass).then(() => this.requestUpdate());
    }
  }

  protected updated(changedProps: PropertyValues): void {
    // Defensive: hass isn't guaranteed to already be set at
    // connectedCallback() time. ensureHaFormComponentsLoaded() is
    // memoized, so calling it again here once hass actually arrives is
    // cheap and never re-does the work.
    if (changedProps.has("hass") && this.hass) {
      ensureHaFormComponentsLoaded(this.hass).then(() => this.requestUpdate());
    }
  }

  public setConfig(config: MatrixHelperCardConfig): void {
    this.config = config;
  }

  protected render() {
    if (!this.hass || !this.config) {
      return html``;
    }
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this.config}
        .schema=${SCHEMA}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  // "Secondary information" (Entities row) rather than Tile's "State
  // content": this card's state is the whole grid, not one value.
  private _computeLabel = (schema: { name: string }): string => {
    if (schema.name === "state_content") {
      return this.hass!.localize("ui.panel.lovelace.editor.card.entity-row.secondary_info");
    }
    return this.hass!.localize(`ui.panel.lovelace.editor.card.generic.${schema.name}`);
  };

  private _valueChanged(ev: CustomEvent<{ value: MatrixHelperCardConfig }>): void {
    fireEvent(this, "config-changed", { config: ev.detail.value });
  }
}

defineOnce("matrix-helper-card-editor", MatrixHelperCardEditor);

declare global {
  interface HTMLElementTagNameMap {
    "matrix-helper-card-editor": MatrixHelperCardEditor;
  }
}
