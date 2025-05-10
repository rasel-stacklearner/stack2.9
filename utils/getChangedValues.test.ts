import { describe, expect, it } from "vitest";
import { getChangedValues } from "./common";

describe("getChangedValues", () => {
  it("should detect changed primitive values", () => {
    const defaultValues = { name: "John", age: 25, active: true };
    const newValues = { name: "Jane", age: 25, active: false };

    expect(getChangedValues(defaultValues, newValues)).toEqual({
      name: "Jane",
      active: false,
    });
  });

  it("should detect changed array values", () => {
    const defaultValues = { tags: ["a", "b"], score: 10 };
    const newValues = { tags: ["a", "c"], score: 10 };

    expect(getChangedValues(defaultValues, newValues)).toEqual({
      tags: ["a", "c"],
    });
  });

  it("should handle empty changes", () => {
    const defaultValues = { name: "John", age: 25 };
    const newValues = { name: "John", age: 25 };

    expect(getChangedValues(defaultValues, newValues)).toEqual({});
  });

  it("should handle undefined values", () => {
    const defaultValues = { name: "John", age: 25 };
    const newValues = { name: undefined, age: 25 };

    expect(getChangedValues(defaultValues, newValues)).toEqual({
      name: undefined,
    });
  });
});
