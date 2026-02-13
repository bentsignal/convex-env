import { expect, test } from "vitest";
import { v } from "convex/values";
import { createEnv, verifyEnv } from "./index";
import { oAuth } from "./presets";

const siteUrl = "https://convex-env.convex.site";
const cloudUrl = "https://convex-env.convex.cloud";

test("basic usage with process.env", async () => {
  process.env = {
    STR: "hello",
    NUM: "42",
    BOOL: "true",
    ENVIRONMENT: "development",
    CONVEX_SITE_URL: siteUrl,
    CONVEX_CLOUD_URL: cloudUrl,
    GOOGLE_CLIENT_ID: "123",
    GOOGLE_CLIENT_SECRET: "456",
  };
  const env = createEnv({
    ...oAuth.google,
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
    CONVEX_SITE_URL: siteUrl,
    CONVEX_CLOUD_URL: cloudUrl,
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
    "Invalid environment variables:\n\n  NUM: Variable is required but not found in env"
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

test("multiple invalid variables reported together", async () => {
  expect(() =>
    createEnv({
      schema: {
        FOO: v.string(),
        BAR: v.number(),
        BAZ: v.boolean(),
      },
      values: {},
    })
  ).toThrow(
    "Invalid environment variables:\n\n  FOO: Variable is required but not found in env\n  BAR: Variable is required but not found in env\n  BAZ: Variable is required but not found in env"
  );
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
    "Invalid environment variables:\n\n  FOO: Variable is required but not found in env"
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
  ).toThrow("Invalid environment variables:\n\n  NUM: Value is empty");
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
    "Invalid environment variables:\n\n  NUM: Value is not a valid boolean"
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
    "Invalid environment variables:\n\n  BOOL: Variable is required but not found in env"
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
    "Invalid environment variables:\n\n  ENVIRONMENT: Variable is required but not found in env"
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
    "Invalid environment variables:\n\n  ENVIRONMENT: Variable failed to validate as type: union"
  );
});

test("cannot override CONVEX_SITE_URL or CONVEX_CLOUD_URL", async () => {
  expect(() =>
    createEnv({
      schema: {
        CONVEX_SITE_URL: v.string(),
      },
      values: {
        CONVEX_SITE_URL: siteUrl,
      },
    })
  ).toThrow(
    "Invalid environment variables:\n\n  CONVEX_SITE_URL: Cannot override CONVEX_SITE_URL or CONVEX_CLOUD_URL"
  );
  expect(() =>
    createEnv({
      schema: {
        CONVEX_CLOUD_URL: v.string(),
      },
      values: {
        CONVEX_CLOUD_URL: cloudUrl,
      },
    })
  ).toThrow(
    "Invalid environment variables:\n\n  CONVEX_CLOUD_URL: Cannot override CONVEX_SITE_URL or CONVEX_CLOUD_URL"
  );
});
