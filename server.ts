// server.ts
import { createRequestHandler } from "@remix-run/cloudflare";
import * as build from "@remix-run/dev/server-build";

export default {
  fetch(request: Request, env: any, ctx: ExecutionContext) {
    return createRequestHandler({ build, mode: process.env.NODE_ENV })(request, env, ctx);
  },
};
