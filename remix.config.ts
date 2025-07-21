/* eslint-disable prettier/prettier */
/** @type {import('@remix-run/dev').AppConfig} */
export default {
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildDirectory: "build/server", // not used in Pages, but safe fallback
  serverBuildTarget: "cloudflare-pages", // ✅ critical
  ignoredRouteFiles: ["**/.*"],

  future: {
    v2_routeConvention: true
  }
};
