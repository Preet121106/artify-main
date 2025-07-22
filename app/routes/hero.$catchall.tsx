// app/routes/hero.$catchall.tsx
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { rootAuthLoader } from "@clerk/remix/ssr.server";

export const loader = (args: LoaderFunctionArgs) => rootAuthLoader(args);

// No need to render anything – Clerk will handle it
export default function HeroCatchAll() {
  return null;
}
