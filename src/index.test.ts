import { expect, test } from "vitest";
import { v } from "convex/values";
import { createEnv, verifyEnv } from "./index";

test("basic usage with process.env", async () => {
  process.env = {
    STR: "hello",
    NUM: "42",
    BOOL: "true",
    ENVIRONMENT: "development",
  };
  const env = createEnv({
    STR: v.string(),
    NUM: v.number(),
    BOOL: v.boolean(),
    OPT: v.optional(v.string()),
    ENVIRONMENT: v.union(v.literal("development"), v.literal("production")),
  });
  expect(env).toMatchObject({
    STR: "hello",
    NUM: 42,
    BOOL: true,
    OPT: undefined,
    ENVIRONMENT: "development",
  });
});

test("missing required variable with process.env", async () => {
  process.env = { STR: "hello" };
  expect(() =>
    createEnv({
      schema: {
        STR: v.string(),
        NUM: v.number(),
      },
    })
  ).toThrow(
    "Error creating environment variable NUM: Variable is required but not found in env"
  );
});

test("basic usage with explicit values passed in", async () => {
  const env = createEnv({
    schema: {
      STR: v.string(),
      NUM: v.number(),
      BOOL: v.boolean(),
      OPT: v.optional(v.string()),
    },
    values: {
      STR: "hello",
      NUM: "42",
      BOOL: "true",
    },
  });
  expect(env).toMatchObject({
    STR: "hello",
    NUM: 42,
    BOOL: true,
    OPT: undefined,
  });
});

test("required variable is missing with values passed in", async () => {
  expect(() =>
    createEnv({
      schema: {
        FOO: v.string(),
        BAR: v.string(),
      },
      values: {
        BAR: "Hello",
      },
    })
  ).toThrow(
    "Error creating environment variable FOO: Variable is required but not found in env"
  );
});

test("passing in empty string", async () => {
  expect(() =>
    createEnv({
      schema: {
        NUM: v.string(),
      },
      values: {
        NUM: "   ",
      },
    })
  ).toThrow("Error creating environment variable NUM: Value is empty");
});

test("invalid boolean string", async () => {
  expect(() =>
    createEnv({
      schema: {
        NUM: v.boolean(),
      },
      values: {
        NUM: "truth",
      },
    })
  ).toThrow(
    "Error creating environment variable NUM: Value is not a valid boolean"
  );
});

test("skip validation with nothing wrong", async () => {
  process.env = { STR: "hello", NUM: "42" };
  const schema = {
    STR: v.string(),
    NUM: v.number(),
  };
  expect(() =>
    createEnv({ schema, options: { skipValidation: true } })
  ).not.toThrow();
  expect(() => verifyEnv(schema)).not.toThrow();
});

test("skip validation with missing required variable", async () => {
  process.env = { STR: "hello", NUM: "42" };
  const schema = {
    STR: v.string(),
    NUM: v.number(),
    BOOL: v.boolean(),
  };
  expect(() =>
    createEnv({
      schema,
      options: {
        skipValidation: true,
      },
    })
  ).not.toThrow();
  expect(() => verifyEnv(schema)).toThrow(
    "Error verifying environment variable BOOL: Variable is required but not found in env"
  );
});

test("union validator with missing required variable", async () => {
  process.env = { STR: "hello", NUM: "42" };
  expect(() =>
    createEnv({
      STR: v.string(),
      NUM: v.number(),
      ENVIRONMENT: v.union(v.literal("development"), v.literal("production")),
    })
  ).toThrow(
    "Error creating environment variable ENVIRONMENT: Variable is required but not found in env"
  );
});

test("union validator with invalid value", async () => {
  process.env = { STR: "hello", NUM: "42", ENVIRONMENT: "test" };
  expect(() =>
    createEnv({
      STR: v.string(),
      NUM: v.number(),
      ENVIRONMENT: v.union(v.literal("development"), v.literal("production")),
    })
  ).toThrow(
    "Error creating environment variable ENVIRONMENT: Variable failed validation"
  );
});
