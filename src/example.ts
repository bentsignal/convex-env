import { createEnv } from "./index";
import { v } from "convex/values";

// const env = createEnv({
//   FOO: { value: process.env.FOO, validator: v.string() },
//   BAR: { value: process.env.BAR, validator: v.string() },
// });

const env = createEnv({
  FOO: v.string(),
  BAR: v.string(),
  BAZ: v.optional(v.number()),
});

console.log(env);
