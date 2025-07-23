/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  appDirectory: "app",
  assetsBuildDirectory: "build/client/assets",
  publicPath: "/assets/",
  serverBuildPath: "functions/[[path]].js", // Required for Pages Functions
  serverModuleFormat: "esm",
  serverPlatform: "neutral",
  future: {
    v3_fetcher: true,
    v3_actions: true,
  },
};
