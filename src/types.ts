import type { Validator, Infer } from "convex/values";

export type InferredOuput<V extends Validator<any, any, any>> = Infer<V>;
