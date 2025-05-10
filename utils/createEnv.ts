/*
 * File: createEnv.ts
 * Responsibility: Generic createEnv function which is used to validate and parse environment variables. to use this you need to create an env.ts file ata the root of your project and export the env variables as an object.

 * Author: Rasel Hossain
 * Created: 2025-03-11
 * Last Modified By: Null
 * Last Modified At: Null
 * Version: 1.0.0

 */

import { ZodType, z } from "zod";

type InferSchemaType<T extends ZodType> = z.infer<T>;

type CreateEnvType<T extends ZodType> = {
  schemas: T;
  // runTimeEnv: Record<string, string | undefined>;
  runTimeEnv: InferSchemaType<T>;
};

/**
 * Generic createEnv function to validate and parse environment variables.
 * Requires an env.ts file at the project root to export environment variables as an object.
 *
 * @param envConfig - The environment variables object
 * @returns The validated environment variables object
 *
 * @example
 * ```ts
 * import { createEnv } from '@sl/utils/createEnv';
 * import { z } from 'zod';
 *
 * export const env = createEnv(
 * schemas:z.object({
 *     USER_SPACE_APP_URL: z.string().url().min(1),
 *     ONBOARDING_APP_URL: z.string().url().min(1),
 *     NEXT_PUBLIC_ONBOARDING_APP_URL: z.string().min(1),
 *     LAUNCHPAD_APP_URL: z.string().url().min(1),
 *     NEXT_PUBLIC_SUPABASE_URL: z.string().url().min(1),
 *     NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
 *     SUPABASE_PRIVATE_JWT_SECRET: z.string().min(1),
 *     ONBOARD_URL_PATH: z.string().min(1),
 *     USER_SPACE_URL_PATH: z.string().min(1),
 *   }),
 * runTimeEnv: {
 * USER_SPACE_APP_URL: process.env.USER_SPACE_APP_URL,
 * ONBOARDING_APP_URL: process.env.ONBOARDING_APP_URL,
 * NEXT_PUBLIC_ONBOARDING_APP_URL: process.env.NEXT_PUBLIC_ONBOARDING_APP_URL,
 * LAUNCHPAD_APP_URL: process.env.LAUNCHPAD_APP_URL,
 * NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
 * NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
 * SUPABASE_PRIVATE_JWT_SECRET: process.env.SUPABASE_PRIVATE_JWT_SECRET,
 * ONBOARD_URL_PATH: process.env.ONBOARD_URL_PATH,
 * }
 * );
 * ```
 */
export const createEnv = <T extends ZodType>({
  schemas,
  runTimeEnv,
}: CreateEnvType<T>): z.infer<T> => {
  const isClient = typeof window !== "undefined";

  if (isClient) {
    const clientEnv: Record<string, string | undefined> = {};
    Object.entries(runTimeEnv).forEach(([key, value]) => {
      if (key.startsWith("NEXT_PUBLIC_")) {
        clientEnv[key] = value as string;
      }
    });

    return clientEnv;
  }

  const parsed = schemas.safeParse(runTimeEnv);

  if (!parsed.success) {
    console.error("❌ Invalid environment variables:", parsed.error.format());
    throw new Error("Invalid environment variables");
  }

  return parsed.data;
};
