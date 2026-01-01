---
"convex-env": major
---

- To manually pass in values, you must use the schema and values objects (see README for example)
- Created separate `verifyEnv` function to verify existence and type of variables separately from env creation. To use this, pass `skipValidation: true` to `createEnv` (see README for example)
