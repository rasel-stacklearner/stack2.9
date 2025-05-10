import { describe, expect, it } from "vitest";
import { generateBreadcrumb } from "./common";

describe("generateBreadcrumb", () => {
  it("should generate breadcrumb items from path", () => {
    const result = generateBreadcrumb("users/profile/settings");
    expect(result).toEqual([
      { text: "Users", href: "users" },
      { text: "Profile", href: "users/profile" },
      { text: "Settings", href: "users/profile/settings" },
    ]);
  });

  it("should handle paths with prefix", () => {
    const result = generateBreadcrumb("admin/users/profile", "admin");
    expect(result).toEqual([
      { text: "Users", href: "admin/users" },
      { text: "Profile", href: "admin/users/profile" },
    ]);
  });

  it("should handle empty path", () => {
    expect(generateBreadcrumb("")).toEqual([]);
  });

  it("should handle path with query parameters", () => {
    const result = generateBreadcrumb("users/profile?id=123");
    expect(result).toEqual([
      { text: "Users", href: "users" },
      { text: "Profile", href: "users/profile" },
    ]);
  });
});
