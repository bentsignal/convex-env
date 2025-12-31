<p align="center">
  <img src="https://b9sa6juqtj.ufs.sh/f/WmevHvqCEmRaetBLb0NWmSZIsPhkweq8TtVxHraXLjAdgyEC" alt="Convex Env Logo" style="max-width: 500px; width: 100%;">
</p>

<h2 align="center">Convex Env</h2>
<p align="center">Typesafe access to environment variables in Convex</p>

### Overview

If you've ever used [t3-env](https://github.com/t3-oss/t3-env), its basically that, but native to [Convex](https://www.convex.dev).

Validators currently supported:

- v.string()
- v.number()
- v.boolean()

you can use `v.optional()` on _any supported validator_, see [example](#usage) below

<span style="color: red;"><strong>IMPORTANT</strong></span>: The <code>env</code> object from <code>createEnv</code> should only be used in the Convex runtime, the values on it will not be accessible client side.

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

You can also pass values manually

```typescript
// convex/convex.env.ts

import { createEnv } from "convex-env";
import { v } from "convex/values";

export const env = createEnv(
  {
    CONVEX_SITE_URL: v.string(),
    BETTER_AUTH_SECRET: v.string(),
    GOOGLE_CLIENT_ID: v.string(),
    GOOGLE_CLIENT_SECRET: v.string(),
    MAX_REQUESTS_PER_USER: v.number(),
    DEBUG_MODE: v.optional(v.boolean()),
  },
  {
    CONVEX_SITE_URL: process.env.CONVEX_SITE_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    MAX_REQUESTS_PER_USER: process.env.MAX_REQUESTS_PER_USER,
    DEBUG_MODE: process.env.DEBUG_MODE,
  }
);
```
