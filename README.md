<p align="center">
  <img src="https://b9sa6juqtj.ufs.sh/f/WmevHvqCEmRajVTwwtXKdHb7pg9oz0hCWQNZntX6PAcxi34L" alt="Convex Env Example" style="max-width: 700px; width: 100%;">
</p>

<h2 align="center">Convex Env</h2>
<p align="center">Type-safe access to environment variables in Convex</p>

### Overview

Similar to [t3-env](https://github.com/t3-oss/t3-env), but native to [Convex](https://www.convex.dev).

Validators currently supported:

- v.string()
- v.number()
- v.boolean()

You can use `v.optional()` on _any_ supported validator, see [example](#usage) below

<span style="color: red;"><strong>IMPORTANT</strong></span>: The <code>env</code> object from <code>createEnv</code> should only be used in the Convex runtime, the values on it will not be accessible client-side.

### Installation

```
ni convex-env
```

```
pnpm i convex-env
```

```
bun i convex-env
```

```
npm i convex-env
```

```
yarn add convex-env
```

### Usage

```typescript
// convex/convex.env.ts

import { createEnv } from "convex-env";
import { v } from "convex/values";

export const env = createEnv({
  CONVEX_SITE_URL: v.string(),
  BETTER_AUTH_SECRET: v.string(),
  GOOGLE_CLIENT_ID: v.string(),
  GOOGLE_CLIENT_SECRET: v.string(),
  MAX_REQUESTS_PER_USER: v.number(),
  DEBUG_MODE: v.optional(v.boolean()),
});
```

Then access them anywhere in Convex.

```typescript
// convex/auth.ts

import { env } from "./convex.env";

export const createAuth = (ctx: GenericCtx<DataModel>) => {
  return betterAuth({
    baseURL: env.CONVEX_SITE_URL,
    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
      },
    },
  });
};
```

You can optionally pass values manually

```typescript
// convex/convex.env.ts

import { createEnv } from "convex-env";
import { v } from "convex/values";

export const env = createEnv({
  schema: {
    CONVEX_SITE_URL: v.string(),
    MAX_REQUESTS_PER_USER: v.number(),
    DEBUG_MODE: v.optional(v.boolean()),
  },
  values: {
    CONVEX_SITE_URL: process.env.CONVEX_SITE_URL,
    MAX_REQUESTS_PER_USER: process.env.MAX_REQUESTS_PER_USER,
    DEBUG_MODE: process.env.DEBUG_MODE,
  },
});
```

If you're running into an issue where it says an environment variable isn't found when you **know for a fact** that it is there, then you may need to use `verifyEnv` to verify the existence and type separately from the creation of the env object.

```typescript
// convex/convex.env.ts

import { createEnv } from "convex-env";
import { v } from "convex/values";

export const schema = {
  CONVEX_SITE_URL: v.string(),
  MAX_REQUESTS_PER_USER: v.number(),
  DEBUG_MODE: v.optional(v.boolean()),
};

export const env = createEnv({
  schema,
  // optional, defaults to process.env
  values: {
    CONVEX_SITE_URL: process.env.CONVEX_SITE_URL,
    MAX_REQUESTS_PER_USER: process.env.MAX_REQUESTS_PER_USER,
    DEBUG_MODE: process.env.DEBUG_MODE,
  },
  options: {
    skipValidation: true,
  },
});
```

```typescript
// convex/convex.config.ts

import { schema } from "./convex.env";
import { verifyEnv } from "convex-env";

verifyEnv(schema);
```

### Why use it?

User defined values on the `process.env` object will always be typed `string | undefined`. If you want to store anything other than a string, you have to cast it at each use and hope that you entered the value correctly in `.env`

This package gives you the reassurance that when you use an environment variable in your code, it will:

- Actually be there
- Be the type you expect it to be

It can also prevent you from shipping bugs to production. If an environment variable is missing or doesn't match its validator, your deployment to Convex will fail.

<p align="center">
  <img src="https://b9sa6juqtj.ufs.sh/f/WmevHvqCEmRai7ZRq7VC2K8VNp5TJWgmuZAHxryoLzDhek3B" alt="Convex Env build failure example" style="max-width: 700px; width: 100%;">
</p>
