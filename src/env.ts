import type {
  AllowedValidators,
  InferredOuput,
  Values,
  CreateEnvOptions,
  Prettify,
} from "./types";
import { validate } from "convex-helpers/validators";
import { transformed } from "./transform";

/**
 *
 * WARNING: The object returned by `createEnv` should only be accessed within the Convex runtime. The values on the returned object will NOT be accessible client-side.
 *
 * @param args - You can either pass in the schema object directly, or an object with the schema, values, and options. See examples below.
 * @returns An object with the same keys as the schema, but with validated type-safe values.
 *
 * @public
 *
 * @example
 *
 * import { betterAuth, oAuth, r2 } from "convex-env/presets";
 * import { v } from "convex/values";
 *
 * const env = createEnv({
 *   ...betterAuth,
 *   ...oAuth.google,
 *   ...oAuth.apple,
 *   ...r2,
 *   OPENAI_API_KEY: v.string(),
 *   FREE_REQUESTS_PER_USER: v.number(),
 *   DEBUG_MODE: v.optional(v.boolean()),
 * });
 *
 * @example
 * import { v } from "convex/values";
 * import { betterAuth, oAuth, r2 } from "convex-env/presets";
 *
 * const env = createEnv({
 *   ...betterAuth,
 *   ...oAuth.google,
 *   ...oAuth.apple,
 *   ...r2,
 *   schema: {
 *     OPENAI_API_KEY: v.string(),
 *     FREE_REQUESTS_PER_USER: v.number(),
 *     DEBUG_MODE: v.optional(v.boolean()),
 *   },
 *   values: {
 *     OPENAI_API_KEY: process.env.OPENAI_API_KEY,
 *     FREE_REQUESTS_PER_USER: process.env.FREE_REQUESTS_PER_USER,
 *     DEBUG_MODE: process.env.DEBUG_MODE,
 *     BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
 *     GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
 *     GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
 *     APPLE_CLIENT_ID: process.env.APPLE_CLIENT_ID,
 *     APPLE_CLIENT_SECRET: process.env.APPLE_CLIENT_SECRET,
 *     R2_TOKEN: process.env.R2_TOKEN,
 *     R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
 *     R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
 *     R2_ENDPOINT: process.env.R2_ENDPOINT,
 *     R2_BUCKET: process.env.R2_BUCKET,
 *   },
 *   options: {
 *     skipValidation: true,
 *   },
 * });
 *
 */
const createEnv = <Schema extends Record<string, AllowedValidators>>(
  args:
    | Schema
    | { schema: Schema; values?: Values<Schema>; options?: CreateEnvOptions }
): Prettify<
  { [K in keyof Schema]: InferredOuput<Schema[K]> } & {
    CONVEX_SITE_URL: string;
    CONVEX_CLOUD_URL: string;
  }
> => {
  let schema: Schema;
  let inputValues: Values<Schema> | undefined;
  let options: CreateEnvOptions | undefined;

  const isSchemaObject = (
    arg:
      | Schema
      | { schema: Schema; values?: Values<Schema>; options?: CreateEnvOptions }
  ): arg is {
    schema: Schema;
    values?: Values<Schema>;
    options?: CreateEnvOptions;
  } => {
    return "schema" in arg;
  };

  if (isSchemaObject(args)) {
    schema = args.schema;
    inputValues = args.values;
    options = args.options;
  } else {
    schema = args;
  }

  const values = inputValues ?? process.env;

  return Object.keys(schema)
    .map((key) => {
      try {
        if (key === "CONVEX_SITE_URL" || key === "CONVEX_CLOUD_URL") {
          throw new Error(
            "Cannot override CONVEX_SITE_URL or CONVEX_CLOUD_URL"
          );
        }
        const validator = schema[key];
        const envValue = values[key as string];
        if (
          validator.isOptional === "required" &&
          envValue === undefined &&
          options?.skipValidation !== true
        ) {
          throw new Error("Variable is required but not found in env");
        }
        const transformedValue = transformed(envValue, validator);
        const valueIsInvalid = validate(validator, transformedValue) === false;
        if (valueIsInvalid && options?.skipValidation !== true) {
          throw new Error(
            `Variable failed to validated as type: ${validator.kind}`
          );
        }
        return [key, transformedValue as InferredOuput<typeof validator>] as [
          keyof Schema,
          InferredOuput<typeof validator>,
        ];
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        throw new Error(
          `Error creating environment variable ${key as string}: ${errorMessage}`
        );
      }
    })
    .reduce(
      (acc, [key, value]) => {
        acc[key] = value;
        return acc;
      },
      {
        CONVEX_SITE_URL: process.env.CONVEX_SITE_URL,
        CONVEX_CLOUD_URL: process.env.CONVEX_CLOUD_URL,
      } as { [K in keyof Schema]: InferredOuput<Schema[K]> } & {
        CONVEX_SITE_URL: string;
        CONVEX_CLOUD_URL: string;
      }
    );
};

/**
 *
 * @description You may want to verify the existence and type of the environment variables separately from the creation of the env object. If so, use this function in convex.config.ts, and use the skipValidation option when calling createEnv.
 *
 * @param args - You can either pass in the schema object directly, or an object with the schema and values. See examples below.
 * @returns void
 *
 * @public
 *
 * @example
 * const schema = {
 *   FOO: v.string(),
 *   BAR: v.number(),
 *   BAZ: v.boolean(),
 * };
 * verifyEnv(schema);
 *
 * @example
 * const schema = {
 *   FOO: v.string(),
 *   BAR: v.number(),
 *   BAZ: v.boolean(),
 * };
 * verifyEnv({ schema, values: { FOO: process.env.FOO, BAR: "42", BAZ: "true" } });
 */
const verifyEnv = <Schema extends Record<string, AllowedValidators>>(
  args: Schema | { schema: Schema; values?: Values<Schema> }
) => {
  let schema: Schema;
  let inputValues: Values<Schema> | undefined;

  const isSchemaObject = (
    arg: Schema | { schema: Schema; values?: Values<Schema> }
  ): arg is { schema: Schema; values?: Values<Schema> } => {
    return "schema" in arg;
  };

  if (isSchemaObject(args)) {
    schema = args.schema;
    inputValues = args.values;
  } else {
    schema = args;
  }

  const values = inputValues ?? process.env;

  Object.keys(schema).map((key) => {
    try {
      const validator = schema[key];
      const envValue = values[key as string];
      if (validator.isOptional === "required" && envValue === undefined) {
        throw new Error("Variable is required but not found in env");
      }
      const transformedValue = transformed(envValue, validator);
      const valueIsInvalid = validate(validator, transformedValue) === false;
      if (valueIsInvalid) throw new Error(`Variable failed validation`);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      throw new Error(
        `Error verifying environment variable ${key as string}: ${errorMessage}`
      );
    }
  });
};

export { createEnv, verifyEnv };
