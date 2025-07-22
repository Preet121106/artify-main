/** @type {import('@remix-run/dev').AppConfig} */
const config = {
  serverBuildTarget: "cloudflare-workers",
  server: "./server.ts",
  ignoredRouteFiles: ["**/.*"],
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverModuleFormat: "esm",
};

export default config;
