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
- v.union() + v.literal() (strings only)

You can use `v.optional()` on _any_ supported validator, see [examples](#usage) below

<span style="color: red;"><strong>IMPORTANT</strong></span>: The <code>env</code> object from <code>createEnv</code> should only be used in the Convex runtime, the values on it will not be accessible client-side.
MA

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
import { betterAuth, oAuth } from "convex-env/presets";
import { v } from "convex/values";

export const env = createEnv({
  ...betterAuth,
  ...oAuth.google,
  ENVIRONMENT: v.union(v.literal("development"), v.literal("production")),
  OPENAI_API_KEY: v.string(),
  GOOGLE_CLIENT_SECRET: v.string(),
  FREE_REQUESTS_PER_USER: v.number(),
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
    FREE_REQUESTS_PER_USER: v.number(),
    DEBUG_MODE: v.optional(v.boolean()),
  },
  // optional, defaults to process.env
  values: {
    FREE_REQUESTS_PER_USER: process.env.FREE_REQUESTS_PER_USER,
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
  FREE_REQUESTS_PER_USER: v.number(),
  DEBUG_MODE: v.optional(v.boolean()),
};

export const env = createEnv({
  schema,
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

### Presets

I wrote out some presets for commonly used pairs of variables. Below is a complete list of all exports from `convex-env/presets`.

- oAuth
  - everything supported by [better-auth](https://www.better-auth.com)
- environment
  - "development", "preview", or "production"
- [clerk](https://docs.convex.dev/auth/clerk)
- [workOS](https://docs.convex.dev/auth/authkit/),
- [betterAuth](https://labs.convex.dev/better-auth)
- [auth0](https://docs.convex.dev/auth/auth0)
- [resend](https://www.convex.dev/components/resend)
- [r2](https://www.convex.dev/components/cloudflare-r2)
- [aws](https://aws.amazon.com/sdk-for-javascript/)
- [stripe](https://www.convex.dev/components/stripe)
- [autumn](https://www.convex.dev/components/autumn)
- [dodo](https://www.convex.dev/components/dodopayments)
- [polar](https://www.convex.dev/components/polar)
- [uploadthing](https://docs.uploadthing.com/)
- [upstash](https://upstash.com/docs/redis)

```typescript
// convex/convex.env.ts

import { createEnv } from "convex-env";
import { oAuth, betterAuth, polar, r2 } from "convex-env/presets";

export const env = createEnv({
  ...betterAuth,
  ...oAuth.google,
  ...oAuth.github,
  ...polar,
  ...r2,
  OPENAI_API_KEY: v.string(),
  FREE_REQUESTS_PER_USER: v.number(),
  DEBUG_MODE: v.optional(v.boolean()),
});
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
