import { parseCookie } from "./cookieParser";
import { describe, expect, it } from "vitest";
describe("ParseCookie", () => {
  it("should return empty object for null input", () => {
    expect(parseCookie(null)).toEqual({});
  });

  it("should parse single cookie correctly", () => {
    const cookieHeader = "token=abc123";
    expect(parseCookie(cookieHeader)).toEqual({
      token: "abc123",
    });
  });

  it("should parse multiple cookies correctly", () => {
    const cookieHeader = "token=abc123; userId=456;session=xyz789";
    expect(parseCookie(cookieHeader)).toEqual({
      token: "abc123",
      userId: "456",
      session: "xyz789",
    });
  });

  it("should handle cookies with encoded values", () => {
    const cookieHeader = "name=John%20Doe; email=john%40example.com";
    expect(parseCookie(cookieHeader)).toEqual({
      name: "John Doe",
      email: "john@example.com",
    });
  });

  it("should return empty object for cookies without values", () => {
    const cookieHeader = "tracking=; analytics=";
    expect(parseCookie(cookieHeader)).toEqual({});
  });
});
