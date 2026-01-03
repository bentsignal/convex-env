import { v } from "convex/values";

export const environment = {
  ENVIRONMENT: v.union(
    v.literal("development"),
    v.literal("preview"),
    v.literal("production")
  ),
};

/** Get started with better-auth here:
 * https://labs.convex.dev/better-auth
 */
export const betterAuth = {
  BETTER_AUTH_SECRET: v.string(),
};

/** Get started with auth0 here:
 * https://docs.convex.dev/auth/auth0
 */
export const auth0 = {
  AUTH0_CLIENT_ID: v.string(),
  AUTH0_DOMAIN: v.string(),
};

/** Get started with workOS here:
 * https://docs.convex.dev/auth/authkit/
 */
export const workOS = {
  base: {
    WORKOS_CLIENT_ID: v.string(),
    WORKOS_CLIENT_SECRET: v.string(),
  },
  vite: {
    VITE_WORKOS_CLIENT_ID: v.string(),
    VITE_WORKOS_CLIENT_SECRET: v.string(),
  },
  next: {
    WORKOS_CLIENT_ID: v.string(),
    WORKOS_CLIENT_SECRET: v.string(),
    WORKOS_COOKIE_PASSWORD: v.string(),
  },
};

/** Get started with clerk here:
 * https://docs.convex.dev/auth/clerk
 */
export const clerk = {
  CLERK_JWT_ISSUER_DOMAIN: v.string(),
};

/** Get started with resend here:
 * https://www.convex.dev/components/resend
 */
export const resend = {
  RESEND_API_KEY: v.string(),
  RESEND_WEBHOOK_SECRET: v.string(),
};

/** Get started with r2 here:
 * https://www.convex.dev/components/cloudflare-r2
 */
export const r2 = {
  R2_TOKEN: v.string(),
  R2_ACCESS_KEY_ID: v.string(),
  R2_SECRET_ACCESS_KEY: v.string(),
  R2_ENDPOINT: v.string(),
  R2_BUCKET: v.string(),
};

/** Get started with stripe here:
 * https://www.convex.dev/components/stripe
 */
export const stripe = {
  STRIPE_SECRET_KEY: v.string(),
  STRIPE_WEBHOOK_SECRET: v.string(),
};

/** Get started with autumn here:
 * https://www.convex.dev/components/autumn
 */
export const autumn = {
  AUTUMN_SECRET_KEY: v.string(),
};

/** Get started with dodo here:
 * https://www.convex.dev/components/dodopayments
 */
export const dodo = {
  DODO_PAYMENTS_API_KEY: v.string(),
  DODO_PAYMENTS_WEBHOOK_SECRET: v.string(),
  DODO_PAYMENTS_ENVIRONMENT: v.union(
    v.literal("test_mode"),
    v.literal("live_mode")
  ),
};

/** Get started with polar here:
 * https://www.convex.dev/components/polar
 */
export const polar = {
  POLAR_ORGANIZATION_TOKEN: v.string(),
  POLAR_SERVER: v.string(),
  POLAR_WEBHOOK_SECRET: v.string(),
};

/** Get started with uploadthing here:
 * https://docs.uploadthing.com/
 */
export const uploadthing = {
  UPLOADTHING_TOKEN: v.string(),
  UPLOADTHING_APP_ID: v.string(),
};

/** Get started with upstash here:
 * https://upstash.com/docs/redis
 */
export const upstash = {
  UPSTASH_REDIS_REST_URL: v.string(),
  UPSTASH_REDIS_REST_TOKEN: v.string(),
};

/** All oAuth providers supported by better-auth:
 * https://www.better-auth.com
 */
export const oAuth = {
  /**
   * For info on setting up with better auth, visit here:
   * https://www.better-auth.com/docs/authentication/apple
   */
  apple: {
    APPLE_CLIENT_ID: v.string(),
    APPLE_CLIENT_SECRET: v.string(),
    APPLE_APP_BUNDLE_IDENTIFIER: v.string(),
  },
  /**
   * For info on setting up with better auth, visit here:
   * https://www.better-auth.com/docs/authentication/atlassian
   */
  atlassian: {
    ATLASSIAN_CLIENT_ID: v.string(),
    ATLASSIAN_CLIENT_SECRET: v.string(),
  },
  /**
   * For info on setting up with better auth, visit here:
   * https://www.better-auth.com/docs/authentication/cognito
   */
  cognito: {
    COGNITO_CLIENT_ID: v.string(),
    COGNITO_CLIENT_SECRET: v.string(),
    COGNITO_DOMAIN: v.string(),
    COGNITO_REGION: v.string(),
    COGNITO_USERPOOL_ID: v.string(),
  },
  /**
   * For info on setting up with better auth, visit here:
   * https://www.better-auth.com/docs/authentication/discord
   */
  discord: {
    DISCORD_CLIENT_ID: v.string(),
    DISCORD_CLIENT_SECRET: v.string(),
  },
  /**
   * For info on setting up with better auth, visit here:
   * https://www.better-auth.com/docs/authentication/dropbox
   */
  dropbox: {
    DROPBOX_CLIENT_ID: v.string(),
    DROPBOX_CLIENT_SECRET: v.string(),
  },
  /**
   * For info on setting up with better auth, visit here:
   * https://www.better-auth.com/docs/authentication/facebook
   */
  facebook: {
    FACEBOOK_CLIENT_ID: v.string(),
    FACEBOOK_CLIENT_SECRET: v.string(),
  },
  /**
   * For info on setting up with better auth, visit here:
   * https://www.better-auth.com/docs/authentication/figma
   */
  figma: {
    FIGMA_CLIENT_ID: v.string(),
    FIGMA_CLIENT_SECRET: v.string(),
    FIGMA_CLIENT_KEY: v.string(),
  },
  /**
   * For info on setting up with better auth, visit here:
   * https://www.better-auth.com/docs/authentication/github
   */
  github: {
    GITHUB_CLIENT_ID: v.string(),
    GITHUB_CLIENT_SECRET: v.string(),
  },
  /**
   * For info on setting up with better auth, visit here:
   * https://www.better-auth.com/docs/authentication/gitlab
   */
  gitlab: {
    GITLAB_CLIENT_ID: v.string(),
    GITLAB_CLIENT_SECRET: v.string(),
    GITLAB_ISSUER: v.string(),
  },
  /**
   * For info on setting up with better auth, visit here:
   * https://www.better-auth.com/docs/authentication/google
   */
  google: {
    GOOGLE_CLIENT_ID: v.string(),
    GOOGLE_CLIENT_SECRET: v.string(),
  },
  /**
   * For info on setting up with better auth, visit here:
   * https://www.better-auth.com/docs/authentication/huggingface
   */
  huggingFace: {
    HUGGINGFACE_CLIENT_ID: v.string(),
    HUGGINGFACE_CLIENT_SECRET: v.string(),
  },
  /**
   * For info on setting up with better auth, visit here:
   * https://www.better-auth.com/docs/authentication/kakao
   */
  kakao: {
    KAKAO_CLIENT_ID: v.string(),
    KAKAO_CLIENT_SECRET: v.string(),
  },
  /**
   * For info on setting up with better auth, visit here:
   * https://www.better-auth.com/docs/authentication/kick
   */
  kick: {
    KICK_CLIENT_ID: v.string(),
    KICK_CLIENT_SECRET: v.string(),
  },
  /**
   * For info on setting up with better auth, visit here:
   * https://www.better-auth.com/docs/authentication/line
   */
  line: {
    LINE_CLIENT_ID: v.string(),
    LINE_CLIENT_SECRET: v.string(),
  },
  /**
   * For info on setting up with better auth, visit here:
   * https://www.better-auth.com/docs/authentication/linear
   */
  linear: {
    LINEAR_CLIENT_ID: v.string(),
    LINEAR_CLIENT_SECRET: v.string(),
  },
  /**
   * For info on setting up with better auth, visit here:
   * https://www.better-auth.com/docs/authentication/linkedin
   */
  linkedin: {
    LINKEDIN_CLIENT_ID: v.string(),
    LINKEDIN_CLIENT_SECRET: v.string(),
  },
  /**
   * For info on setting up with better auth, visit here:
   * https://www.better-auth.com/docs/authentication/microsoft
   */
  microsoft: {
    MICROSOFT_CLIENT_ID: v.string(),
    MICROSOFT_CLIENT_SECRET: v.string(),
  },
  /**
   * For info on setting up with better auth, visit here:
   * https://www.better-auth.com/docs/authentication/naver
   */
  naver: {
    NAVER_CLIENT_ID: v.string(),
    NAVER_CLIENT_SECRET: v.string(),
  },
  /**
   * For info on setting up with better auth, visit here:
   * https://www.better-auth.com/docs/authentication/notion
   */
  notion: {
    NOTION_CLIENT_ID: v.string(),
    NOTION_CLIENT_SECRET: v.string(),
  },
  /**
   * For info on setting up with better auth, visit here:
   * https://www.better-auth.com/docs/authentication/paybin
   */
  paybin: {
    PAYBIN_CLIENT_ID: v.string(),
    PAYBIN_CLIENT_SECRET: v.string(),
  },
  /**
   * For info on setting up with better auth, visit here:
   * https://www.better-auth.com/docs/authentication/paypal
   */
  paypal: {
    PAYPAL_CLIENT_ID: v.string(),
    PAYPAL_CLIENT_SECRET: v.string(),
    PAYPAL_ENVIRONMENT: v.union(v.literal("sandbox"), v.literal("live")),
  },
  /**
   * For info on setting up with better auth, visit here:
   * https://www.better-auth.com/docs/authentication/polar
   */
  polar: {
    POLAR_CLIENT_ID: v.string(),
    POLAR_CLIENT_SECRET: v.string(),
  },
  /**
   * For info on setting up with better auth, visit here:
   * https://www.better-auth.com/docs/authentication/reddit
   */
  reddit: {
    REDDIT_CLIENT_ID: v.string(),
    REDDIT_CLIENT_SECRET: v.string(),
  },
  /**
   * For info on setting up with better auth, visit here:
   * https://www.better-auth.com/docs/authentication/roblox
   */
  roblox: {
    ROBLOX_CLIENT_ID: v.string(),
    ROBLOX_CLIENT_SECRET: v.string(),
  },
  /**
   * For info on setting up with better auth, visit here:
   * https://www.better-auth.com/docs/authentication/spotify
   */
  spotify: {
    SPOTIFY_CLIENT_ID: v.string(),
    SPOTIFY_CLIENT_SECRET: v.string(),
  },
  /**
   * For info on setting up with better auth, visit here:
   * https://www.better-auth.com/docs/authentication/salesforce
   */
  salesforce: {
    SALESFORCE_CLIENT_ID: v.string(),
    SALESFORCE_CLIENT_SECRET: v.string(),
    SALESFORCE_ENVIRONMENT: v.union(
      v.literal("sandbox"),
      v.literal("production")
    ),
  },
  /**
   * For info on setting up with better auth, visit here:
   * https://www.better-auth.com/docs/authentication/slack
   */
  slack: {
    SLACK_CLIENT_ID: v.string(),
    SLACK_CLIENT_SECRET: v.string(),
  },
  /**
   * For info on setting up with better auth, visit here:
   * https://www.better-auth.com/docs/authentication/tiktok
   */
  tiktok: {
    TIKTOK_CLIENT_KEY: v.string(),
    TIKTOK_CLIENT_SECRET: v.string(),
  },
  /**
   * For info on setting up with better auth, visit here:
   * https://www.better-auth.com/docs/authentication/twitch
   */
  twitch: {
    TWITCH_CLIENT_ID: v.string(),
    TWITCH_CLIENT_SECRET: v.string(),
  },
  /**
   * For info on setting up with better auth, visit here:
   * https://www.better-auth.com/docs/authentication/twitter
   */
  twitter: {
    TWITTER_CLIENT_ID: v.string(),
    TWITTER_CLIENT_SECRET: v.string(),
  },
  /**
   * For info on setting up with better auth, visit here:
   * https://www.better-auth.com/docs/authentication/vercel
   */
  vercel: {
    VERCEL_CLIENT_ID: v.string(),
    VERCEL_CLIENT_SECRET: v.string(),
  },
  /**
   * For info on setting up with better auth, visit here:
   * https://www.better-auth.com/docs/authentication/vk
   */
  vk: {
    VK_CLIENT_ID: v.string(),
    VK_CLIENT_SECRET: v.string(),
  },
  /**
   * For info on setting up with better auth, visit here:
   * https://www.better-auth.com/docs/authentication/zoom
   */
  zoom: {
    ZOOM_CLIENT_ID: v.string(),
    ZOOM_CLIENT_SECRET: v.string(),
  },
};
