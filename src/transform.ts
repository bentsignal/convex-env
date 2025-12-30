import type { InferredOuput, AllowedValidators } from "./types";

import { v } from "convex/values";

const transformed = (
  value: string | undefined,
  validator: AllowedValidators
): InferredOuput<typeof validator> => {
  if (value === undefined) return undefined;
  if (validator.kind === v.string().kind) return value;
  if (validator.kind === v.number().kind) {
    return validateAndTransformNumber(value);
  }
  if (validator.kind === v.boolean().kind) {
    return validateAndTransformBoolean(value);
  }
  throw new Error("Validator is not supported");
};

const validateAndTransformNumber = (value: string): number => {
  if (value.trim() === "") throw new Error("Value is empty");
  if (Number.isNaN(Number(value))) throw new Error("Value is not a number");
  if (Number.isFinite(Number(value)) === false)
    throw new Error("Value is not a finite number");
  return Number(value);
};

const validateAndTransformBoolean = (value: string): boolean => {
  if (value.trim() === "") throw new Error("Value is empty");
  if (value.trim().toLowerCase() === "true") return true;
  if (value.trim().toLowerCase() === "false") return false;
  throw new Error("Value is not a valid boolean");
};

export { transformed };
