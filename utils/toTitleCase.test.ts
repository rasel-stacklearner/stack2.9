import { describe, expect, it } from "vitest";
import { toTitleCase } from "./common";

describe("toTitleCase", () => {
  it("should convert snake case to title case", () => {
    expect(toTitleCase("hello_world")).toBe("Hello World");
    expect(toTitleCase("test_case_example")).toBe("Test Case Example");
  });

  it("should handle custom delimiters", () => {
    expect(toTitleCase("hello-world", "-")).toBe("Hello World");
    expect(toTitleCase("test.case.example", ".")).toBe("Test Case Example");
  });

  it("should handle single word", () => {
    expect(toTitleCase("hello")).toBe("Hello");
  });

  it("should handle empty string", () => {
    expect(toTitleCase("")).toBe("");
  });
});
