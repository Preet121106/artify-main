import { redirect } from "@remix-run/cloudflare";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLocation, useNavigate } from "@remix-run/react";
import { useEffect } from "react";

export const loader = ({ request }: LoaderFunctionArgs) => {
  const { pathname } = new URL(request.url);

  // If Clerk redirect fails to /signin/sso-callback (route doesn't exist), reroute to /signup
  if (pathname.startsWith("/signin/sso-callback")) {
    throw redirect("/signup");
  }

  // If Clerk redirect fails to /signup/sso-callback, reroute to /signin
  if (pathname.startsWith("/signup/sso-callback")) {
    throw redirect("/signin");
  }

  // All other unknown routes → true 404
  throw new Response("Not Found", { status: 404 });
};

export default function NotFoundCatchAll() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname.startsWith("/signin/sso-callback")) {
      navigate("/signup", { replace: true });
    } else if (pathname.startsWith("/signup/sso-callback")) {
      navigate("/signin", { replace: true });
    }
  }, [pathname, navigate]);

  return (
    <main className="min-h-screen flex items-center justify-center text-center">
      <div>
        <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
        <p className="mt-2 text-gray-400">The page you're looking for doesn't exist.</p>
      </div>
    </main>
  );
}
