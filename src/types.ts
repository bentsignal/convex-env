import type {
  Infer,
  VOptional,
  VString,
  VFloat64,
  VBoolean,
} from "convex/values";

type AllowedPrimitiveValidators = VString | VFloat64 | VBoolean;
type AllowedOptionalValidators = VOptional<AllowedPrimitiveValidators>;
type AllowedValidators = AllowedPrimitiveValidators | AllowedOptionalValidators;

type InferredOuput<V extends AllowedValidators> = Infer<V>;

export type { AllowedValidators, InferredOuput };
