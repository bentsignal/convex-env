import { validate } from "convex-helpers/validators";
import type { Validator } from "convex/values";
import { Infer } from "convex/values";

type InferredOuput<V extends Validator<any, any, any>> = Infer<V>;

const createEnv = <T extends Record<string, Validator<any, any, any>>>(
  entries: T
): {
  [K in keyof T]: InferredOuput<T[K]>;
} => {
  const result = {} as {
    [K in keyof T]: InferredOuput<T[K]>;
  };

  for (const key in entries) {
    const validator = entries[key];
    const envValue = process.env[key];
    if (envValue === undefined) {
      throw new Error(`Environment variable ${key} is not set`);
    }
    const valueIsValid = validate(validator, envValue);
    if (valueIsValid === false) {
      throw new Error(`Environment variable ${key} is not valid`);
    }
    (result as any)[key] = envValue as InferredOuput<typeof validator>;
  }

  return result;
};

export { createEnv };
