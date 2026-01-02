import type { InferredOuput, AllowedValidators } from "./types";

const transformed = (
  value: string | undefined,
  validator: AllowedValidators
): InferredOuput<typeof validator> => {
  if (value === undefined) return undefined;
  if (value.trim() === "") throw new Error("Value is empty");
  if (validator.kind === "union") return value;
  if (validator.kind === "literal") return value;
  if (validator.kind === "string") return value;
  if (validator.kind === "float64") {
    return validateAndTransformNumber(value);
  }
  if (validator.kind === "boolean") {
    return validateAndTransformBoolean(value);
  }
  throw new Error("Validator is not supported");
};

const validateAndTransformNumber = (value: string): number => {
  if (Number.isNaN(Number(value))) throw new Error("Value is not a number");
  if (Number.isFinite(Number(value)) === false)
    throw new Error("Value is not a finite number");
  return Number(value);
};

const validateAndTransformBoolean = (value: string): boolean => {
  if (value.trim().toLowerCase() === "true") return true;
  if (value.trim().toLowerCase() === "false") return false;
  throw new Error("Value is not a valid boolean");
};

export { transformed };
