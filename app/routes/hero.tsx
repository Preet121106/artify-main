import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { SignedIn, SignedOut } from "@clerk/remix";
import { getAuth } from "@clerk/remix/ssr.server";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";

// 🧩 IMPORT the HeroGeometric UI component
import { HeroGeometric } from "~/components/ui/shape-landing-hero";

// ----------------------------- META -----------------------------
export const meta: MetaFunction = () => [
  { title: "artify • Welcome" },
  { name: "description", content: "Sign up to start chatting with artify." },
];

// ---------------------------- LOADER ----------------------------
export async function loader(args: LoaderFunctionArgs) {
  const { userId } = await getAuth(args);

  if (userId) {
    return redirect("/");
  }

  return json({});
}

// --------------------- CLIENT REDIRECT HELPER ---------------------
function RedirectHome() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return null;
}

// -------------------------- PAGE COMPONENT --------------------------
export default function Hero() {
  return (
    <>
      <SignedIn>
        <RedirectHome />
      </SignedIn>

      <SignedOut>
        {/* Show animated HeroGeometric when signed out */}
        <HeroGeometric badge="Dive with artify" title1="The workspace" title2="Re-Imagined" />
      </SignedOut>
    </>
  );
}
