import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createEnv } from "./createEnv";
import { z } from "zod";

describe("createEnv", () => {
  const originalConsoleError = console.error;
  const originalWindow =
    typeof global !== "undefined"
      ? (global as unknown as { window?: Window }).window
      : undefined;

  beforeEach(() => {
    console.error = vi.fn();
    // Simulate server environmentü
    if (typeof global !== "undefined") {
      delete (global as unknown as { window?: Window }).window;
    }
  });

  afterEach(() => {
    console.error = originalConsoleError;
    if (originalWindow && typeof global !== "undefined") {
      (global as unknown as { window?: Window }).window = originalWindow;
    }
  });

  it("should validate environment variables with schema", () => {
    // Arrange
    const envSchema = z.object({
      TEST_VAR1: z.string().min(1),
      TEST_VAR2: z.string().min(1),
    });

    const config = {
      schemas: envSchema,
      runTimeEnv: {
        TEST_VAR1: "value1",
        TEST_VAR2: "value2",
      },
    };

    // Act
    const result = createEnv(config);

    // Assert
    expect(result).toEqual({
      TEST_VAR1: "value1",
      TEST_VAR2: "value2",
    });
  });

  it("should throw error when environment variables are invalid", () => {
    // Arrange
    const config = {
      schemas: z.object({
        TEST_VAR1: z.string().min(1),
        TEST_VAR2: z.string().min(1),
      }),
      runTimeEnv: {
        TEST_VAR1: "value1",
        TEST_VAR2: "",
      },
    };

    // Act & Assert
    expect(() => createEnv(config)).toThrow("Invalid environment variables");
    expect(console.error).toHaveBeenCalled();
  });

  it("should throw error when environment variables are missing", () => {
    // Arrange
    const config = {
      schemas: z.object({
        TEST_VAR1: z.string().min(1),
        TEST_VAR2: z.string().min(1),
      }),
      runTimeEnv: {
        TEST_VAR1: "value1",
        TEST_VAR2: undefined,
      },
    };

    // Act & Assert
    expect(() => createEnv(config)).toThrow("Invalid environment variables");
    expect(console.error).toHaveBeenCalled();
  });

  it("should filter for NEXT_PUBLIC_ variables on client side", () => {
    // Arrange - simulate browser environment with proper typing
    if (typeof global !== "undefined") {
      (global as unknown as { window?: object }).window = {};
    }

    const config = {
      schemas: z.object({
        NEXT_PUBLIC_TEST_VAR1: z.string().min(1),
        PRIVATE_VAR: z.string().min(1),
      }),
      runTimeEnv: {
        NEXT_PUBLIC_TEST_VAR1: "public-value",
        PRIVATE_VAR: "private-value",
      },
    };

    // Act
    const result = createEnv(config);

    // Assert
    expect(result).toEqual({
      NEXT_PUBLIC_TEST_VAR1: "public-value",
    });
    expect(result).not.toHaveProperty("PRIVATE_VAR");
  });
});
