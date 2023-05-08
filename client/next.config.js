/** @type {import('next').NextConfig} */
    // eslint-disable-next-line @typescript-eslint/no-var-requires
const { withSentryConfig } = require("@sentry/nextjs");

const withPlugins = require("next-compose-plugins");
const withBundleStats = require("next-plugin-bundle-stats");

require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const execSync = require("child_process").execSync;
const lastCommitCommand = "git rev-parse HEAD";
const buildId = execSync(lastCommitCommand).toString().trim();

const moduleExports = {
  reactStrictMode: true,
  sentry: {
    disableServerWebpackPlugin: true,
    disableClientWebpackPlugin: true,
  },
  // fix for https://github.com/vercel/next.js/issues/18389
  // https://zegons.atlassian.net/browse/BF-1455
  async generateBuildId() {
    return buildId;
  },
  env: {
    // Inject process.env.BUILD_ID which is then added to the <body>
    BUILD_ID: buildId,
  },
  eslint: {
    dirs: [
      "components",
      "constants",
      "hooks",
      "locales",
      "pages",
      "providers",
      "utils",
    ],
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
};

module.exports = withPlugins([
  withSentryConfig(moduleExports, sentryWebpackPluginOptions),
  withBundleStats({ outDir: "./bundle-stats" }),
]);