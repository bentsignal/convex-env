import type { AllowedValidators, InferredOuput } from "./types";
import { validate } from "convex-helpers/validators";
import { transformed } from "./transform";

/**
 * WARNING: The object returned by `createEnv` should only be accessed within the Convex runtime.
 * The values on the returned object will NOT be accessible  client side.
 *
 * @param entries - The names of the environment variables and their validators
 * @param inputEnv (Optional) pass in a record of the values to use, defaults to process.env if not provided
 * @returns An object with the same keys as the entries, but with the validated typesafe values
 *
 * @public
 *
 * @example
 * const env = createEnv({
 *   FOO: v.string(),
 *   BAR: v.number(),
 *   BAZ: v.boolean(),
 * });
 *
 * @example
 * const env = createEnv({
 *   FOO: v.string(),
 *   BAR: v.number(),
 *   BAZ: v.boolean(),
 * }, {
 *   FOO: process.env.FOO,
 *   BAR: process.env.BAR,
 *   BAZ: process.env.BAZ,
 * });
 *
 */
const createEnv = <T extends Record<string, AllowedValidators>>(
  entries: T,
  inputEnv?: Partial<Record<keyof T, string | undefined>>
): {
  [K in keyof T]: InferredOuput<T[K]>;
} => {
  const env = inputEnv ?? process.env;
  return Object.keys(entries)
    .map((key) => {
      try {
        const validator = entries[key];
        const envValue = env[key as string];
        if (validator.isOptional === "required" && envValue === undefined) {
          throw new Error("Variable is required but not found in env");
        }
        const transformedValue = transformed(envValue, validator);
        const valueIsInvalid = validate(validator, transformedValue) === false;
        if (valueIsInvalid) {
          throw new Error(`Variable failed validation`);
        }
        return [key, transformedValue as InferredOuput<typeof validator>] as [
          keyof T,
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
      {} as { [K in keyof T]: InferredOuput<T[K]> }
    );
};

export { createEnv };
