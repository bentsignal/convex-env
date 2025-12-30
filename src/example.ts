import { createEnv } from "./index";
import { v } from "convex/values";

const env = createEnv({
  FOO: v.string(),
  BAR: v.number(),
  BAZ: v.boolean(),
});

console.log(env);
