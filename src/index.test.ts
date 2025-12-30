import { expect, test } from "vitest";
import { v } from "convex/values";
import { createEnv } from "./index";

test("basic usage with process.env", async () => {
  process.env = { STR: "hello", NUM: "42", BOOL: "true" };
  const env = createEnv({
    STR: v.string(),
    NUM: v.number(),
    BOOL: v.boolean(),
    OPT: v.optional(v.string()),
  });
  expect(env).toMatchObject({
    STR: "hello",
    NUM: 42,
    BOOL: true,
    OPT: undefined,
  });
});

test("basic usage with explicit values passed in", async () => {
  const env = createEnv(
    {
      STR: v.string(),
      NUM: v.number(),
      BOOL: v.boolean(),
      OPT: v.optional(v.string()),
    },
    {
      STR: "hello",
      NUM: "42",
      BOOL: "true",
    }
  );
  expect(env).toMatchObject({
    STR: "hello",
    NUM: 42,
    BOOL: true,
    OPT: undefined,
  });
});

test("required variable is missing", async () => {
  expect(() =>
    createEnv(
      {
        FOO: v.string(),
        BAR: v.string(),
      },
      {
        BAR: "Hello",
      }
    )
  ).toThrow(
    "Error creating environment variable FOO: Variable is required but not found in env"
  );
});

test("passing in empty string", async () => {
  expect(() =>
    createEnv(
      {
        NUM: v.string(),
      },
      {
        NUM: "   ",
      }
    )
  ).toThrow("Error creating environment variable NUM: Value is empty");
});

test("invalid boolean string", async () => {
  expect(() =>
    createEnv(
      {
        NUM: v.boolean(),
      },
      {
        NUM: "truth",
      }
    )
  ).toThrow(
    "Error creating environment variable NUM: Value is not a valid boolean"
  );
});
