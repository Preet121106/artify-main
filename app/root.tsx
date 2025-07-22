/* app/root.tsx */

import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";

import { ClerkApp } from "@clerk/remix"; // ✅ NEW
import { rootAuthLoader } from "@clerk/remix/ssr.server";

import { useEffect } from "react";
import { useStore } from "@nanostores/react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ClientOnly } from "remix-utils/client-only";
import { createHead } from "remix-island";
import { stripIndents } from "./utils/stripIndent";

import { themeStore } from "./lib/stores/theme";
import { logStore } from "./lib/stores/logs";

import tailwindReset from "@unocss/reset/tailwind-compat.css?url";
import reactToastifyStyles from "react-toastify/dist/ReactToastify.css?url";
import globalStyles from "./styles/index.scss?url";
import xtermStyles from "@xterm/xterm/css/xterm.css?url";

import "virtual:uno.css";

/* -------------------------------------------------- */
/* 1️⃣  Clerk SSR loader                              */
/* -------------------------------------------------- */
export const loader = (args: LoaderFunctionArgs) => rootAuthLoader(args);

/* -------------------------------------------------- */
/* 2️⃣  Meta & Links                                  */
/* -------------------------------------------------- */
export const meta: MetaFunction = () => [
  { title: "artify" },
  { name: "description", content: "AI assistant with Clerk authentication" },
];

export const links: LinksFunction = () => [
  { rel: "icon", href: "/artify.png", type: "image/png+xml" },
  { rel: "stylesheet", href: reactToastifyStyles },
  { rel: "stylesheet", href: tailwindReset },
  { rel: "stylesheet", href: globalStyles },
  { rel: "stylesheet", href: xtermStyles },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
  },
];

/* -------------------------------------------------- */
/* 3️⃣  Inline theme script                           */
/* -------------------------------------------------- */
const inlineTheme = stripIndents`
  (function () {
    const stored = localStorage.getItem('artify_theme');
    const theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;
  })();
`;

export const Head = createHead(() => (
  <>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <Meta />
    <Links />
    <script dangerouslySetInnerHTML={{ __html: inlineTheme }} />
  </>
));

/* -------------------------------------------------- */
/* 4️⃣  Layout wrapper (DnD, Scripts)                 */
/* -------------------------------------------------- */
function Layout({ children }: { children: React.ReactNode }) {
  const theme = useStore(themeStore);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <>
      <ClientOnly>{() => <DndProvider backend={HTML5Backend}>{children}</DndProvider>}</ClientOnly>
      <ScrollRestoration />
      <Scripts />
    </>
  );
}

/* -------------------------------------------------- */
/* 5️⃣  Main App markup                               */
/* -------------------------------------------------- */
function App() {
  const theme = useStore(themeStore);

  /* one‑time client log */
  useEffect(() => {
    logStore.logSystem("Application initialized", {
      theme,
      platform: navigator.platform,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    });
  }, []);

  return (
    <html lang="en">
      <Head />
      <body className="min-h-screen">
        <Layout>
          <Outlet />
        </Layout>
      </body>
    </html>
  );
}

/* -------------------------------------------------- */
/* 6️⃣  Export: wrap with ClerkApp                    */
/* -------------------------------------------------- */
export default ClerkApp(App, {
  publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
  signInUrl: "/signin",
  signUpUrl: "/signup",
  afterSignInUrl: "/",
  afterSignUpUrl: "/",
});
