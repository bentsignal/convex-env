import { validate } from "convex-helpers/validators";
import type { Validator } from "convex/values";
import type { InferredOuput } from "./types";
import { transformed } from "./transform";

const createEnv = <T extends Record<string, Validator<any, any, any>>>(
  entries: T
): {
  [K in keyof T]: InferredOuput<T[K]>;
} => {
  return (Object.keys(entries) as (keyof T)[])
    .map((key) => {
      try {
        const validator = entries[key];
        const envValue = process.env[key as string];
        if (validator.isOptional === "required" && envValue === undefined) {
          throw new Error("Variable is required but not set");
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
