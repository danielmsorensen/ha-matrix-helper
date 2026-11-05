import type { ActionConfig, LovelaceCardConfig } from "custom-card-helpers";

export const DOMAIN = "matrix_helper";

export interface MatrixHelperStateObj {
  state: string;
  attributes: {
    rows?: string[];
    columns?: string[];
    // The labels as originally typed, parallel to rows/columns.
    row_labels?: string[];
    column_labels?: string[];
    data?: Record<string, Record<string, number | null>>;
    [key: string]: unknown;
  };
}

export interface MatrixHelperCardConfig extends LovelaceCardConfig {
  entity: string;
  // entity_name selector value (string or name-part recipe); passed to hass.formatEntityName().
  name?: unknown;
  icon?: string;
  color?: string;
  // Also opaque -- state-display interprets this itself, the same way
  // hui-tile-card.ts hands its own state_content straight through.
  state_content?: string | string[];
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}

// `ha-input` (and other Home Assistant/webawesome custom elements) is not
// declared as `HTMLInputElement` in its TypeScript types, so a direct
// `ev.target as HTMLInputElement`-style cast is rejected by the compiler as
// having no sufficient overlap. Routing through `unknown` first is the
// standard escape hatch for "I know this element has a `.value` at runtime."
export function eventValue(ev: Event): string {
  return (ev.target as unknown as { value: string }).value;
}
