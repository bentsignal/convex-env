import type { EnvIssue } from "./types";

export function formatEnvErrors(issues: EnvIssue[]): string {
  const lines = [
    "❌ Invalid environment variables:",
    "",
    ...issues.map(({ variable, reason }) => `  ${variable}: ${reason}`),
  ];
  return lines.join("\n");
}
