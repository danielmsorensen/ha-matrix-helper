// Cell edit cycle logic: parsing and set/clear/no-op decisions.

/** What committing a cell's typed input should do. */
export type CellEdit =
  | { kind: "noop" }
  | { kind: "set"; value: number | null }
  | { kind: "invalid"; input: string };

/** Key of a cell's draft. */
export function cellKey(row: string, column: string): string {
  return `${row}:${column}`;
}

/**
 * Parses a cell's input: blank clears the cell (null), a non-finite number
 * is invalid (undefined).
 */
export function parseCellInput(input: string): number | null | undefined {
  const raw = input.trim();
  if (raw === "") {
    return null;
  }
  // Accept a decimal comma too ("21,5"), as typed in many locales.
  const parsed = Number(raw.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : undefined;
}

/** Decides what committing `input` over the cell's `current` value does. */
export function resolveCellEdit(input: string, current: number | null): CellEdit {
  const value = parseCellInput(input);
  if (value === undefined) {
    return { kind: "invalid", input: input.trim() };
  }
  return value === current ? { kind: "noop" } : { kind: "set", value };
}
