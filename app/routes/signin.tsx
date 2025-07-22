import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { SignedIn, SignIn } from "@clerk/remix";
import { getAuth } from "@clerk/remix/ssr.server";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import { AuroraBackground } from "~/components/ui/aurora-background";

/* ----------------------------- META ----------------------------- */
export const meta: MetaFunction = () => [{ title: "artify • Sign in" }];

/* ---------------------------- LOADER ---------------------------- */
export async function loader(args: LoaderFunctionArgs) {
  const { userId } = await getAuth(args);

  if (userId) {
    return redirect("/");
  }

  return json({});
}

/* -------------- client‑side redirect if already signed‑in ------------- */
function RedirectHome() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return null;
}

/* -------------------------- COMPONENT -------------------------- */
export default function SignInPage() {
  return (
    <AuroraBackground>
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <SignedIn>
          <RedirectHome />
        </SignedIn>

        <SignIn routing="path" path="/signin" redirectUrl="/" signUpUrl="/signup" />
      </div>
    </AuroraBackground>
  );
}
