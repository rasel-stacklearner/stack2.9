import { describe, expect, it } from "vitest";
import { isValidUrl } from "./common";

describe("isValidUrl", () => {
  it("should validate correct HTTP URLs", () => {
    expect(isValidUrl("http://example.com")).toBe(true);
    expect(isValidUrl("https://example.com")).toBe(true);
    expect(isValidUrl("https://sub.example.com")).toBe(true);
  });

  it("should validate URLs with paths and query parameters", () => {
    expect(isValidUrl("https://example.com/path")).toBe(true);
    expect(isValidUrl("https://example.com/path?query=1")).toBe(true);
    expect(isValidUrl("https://example.com/path#section")).toBe(true);
  });

  it("should validate URLs with ports", () => {
    expect(isValidUrl("http://localhost:3000")).toBe(true);
    expect(isValidUrl("https://example.com:8080")).toBe(true);
  });

  it("should reject invalid URLs", () => {
    expect(isValidUrl("not-a-url")).toBe(false);
    expect(isValidUrl("http://")).toBe(false);
    expect(isValidUrl("http://.")).toBe(false);
    expect(isValidUrl("")).toBe(false);
  });

  it("should validate IP addresses", () => {
    expect(isValidUrl("http://192.168.1.1")).toBe(true);
    expect(isValidUrl("https://192.168.1.1:8080")).toBe(true);
  });
});
