import { describe, expect, it } from "vitest";
import { cellKey, parseCellInput, resolveCellEdit } from "./cell-edit";

describe("cellKey", () => {
  it("joins row and column", () => {
    expect(cellKey("living_room", "monday")).toBe("living_room:monday");
  });
});

describe("parseCellInput", () => {
  it.each([
    ["", null],
    ["  ", null],
    ["21", 21],
    [" 21 ", 21],
    ["21.5", 21.5],
    ["21,5", 21.5],
    ["-3", -3],
    ["1e3", 1000],
    ["0", 0],
  ])("parses %j as %j", (input, expected) => {
    expect(parseCellInput(input)).toBe(expected);
  });

  it.each(["abc", "NaN", "Infinity", "-Infinity", "1,2,3", "21.5.1"])(
    "rejects %j",
    (input) => {
      expect(parseCellInput(input)).toBeUndefined();
    }
  );
});

describe("resolveCellEdit", () => {
  it("is a no-op when the value is unchanged", () => {
    expect(resolveCellEdit("21", 21)).toEqual({ kind: "noop" });
    expect(resolveCellEdit("21,0", 21)).toEqual({ kind: "noop" });
    expect(resolveCellEdit(" ", null)).toEqual({ kind: "noop" });
  });

  it("sets a changed value", () => {
    expect(resolveCellEdit("21,5", 21)).toEqual({ kind: "set", value: 21.5 });
    expect(resolveCellEdit("0", null)).toEqual({ kind: "set", value: 0 });
  });

  it("clears a cell when emptied", () => {
    expect(resolveCellEdit("", 21)).toEqual({ kind: "set", value: null });
  });

  it("reports the trimmed input when invalid", () => {
    expect(resolveCellEdit(" abc ", 21)).toEqual({ kind: "invalid", input: "abc" });
  });
});
