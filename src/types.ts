import {
  type Infer,
  type VOptional,
  type VString,
  type VFloat64,
  type VBoolean,
  type VLiteral,
  type VUnion,
} from "convex/values";

type AllowedBaseValidators = VString | VFloat64 | VBoolean;
type AllowedLiteralValidators = VLiteral<string>;
type AllowedUnionValidators = VUnion<
  any,
  [
    AllowedLiteralValidators,
    AllowedLiteralValidators,
    ...AllowedLiteralValidators[],
  ]
>;
type AllowedPrimitiveValidators =
  | AllowedBaseValidators
  | AllowedLiteralValidators
  | AllowedUnionValidators;
type AllowedOptionalValidators = VOptional<AllowedPrimitiveValidators>;
type AllowedValidators = AllowedPrimitiveValidators | AllowedOptionalValidators;

type InferredOuput<V extends AllowedValidators> = Infer<V>;

type Values<Schema> = Partial<Record<keyof Schema, string | undefined>>;

type CreateEnvOptions = {
  skipValidation?: boolean;
};

export type { AllowedValidators, InferredOuput, Values, CreateEnvOptions };
