/* app/entry.client.tsx */
import { RemixBrowser } from "@remix-run/react";
import { hydrateRoot } from "react-dom/client";
import { startTransition, StrictMode } from "react";

startTransition(() => {
  /* 1️⃣  Find the <div id="root"> that Remix injected on the server */
  const container = document.getElementById("root");
  
  if (!container) {
    throw new Error("💥 Remix root element <div id=\"root\"> not found");
  }

  /* 2️⃣  Hydrate the app */
  hydrateRoot(
    container,                 // ✅ correct container
    <StrictMode>
      <RemixBrowser />
    </StrictMode>
  );
});
