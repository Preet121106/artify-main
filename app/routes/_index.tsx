import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";

import { ClientOnly } from "remix-utils/client-only";
import { BaseChat } from "~/components/chat/BaseChat";
import { Chat } from "~/components/chat/Chat.client";
import { Header } from "~/components/header/Header";

// import BackgroundRays from '~/components/ui/BackgroundRays';
import { AuroraBackground } from "~/components/ui/aurora-background";

import { getAuth } from "@clerk/remix/ssr.server";

/* -------------------------------------------------- */
/*  Meta                                              */
/* -------------------------------------------------- */
export const meta: MetaFunction = () => [
  { title: "artify" },
  {
    name: "description",
    content: "Talk with artify, an AI assistant.",
  },
];

/* -------------------------------------------------- */
/*  Loader – protect route                            */
/* -------------------------------------------------- */
export async function loader(args: LoaderFunctionArgs) {
  const { userId } = (await getAuth(args)) as any; // bypass TS type gaps

  if (!userId) {
    throw redirect("/hero");
  } // not signed in → hero

  return json({});
}

/* -------------------------------------------------- */
/*  Component                                         */
/* -------------------------------------------------- */
export default function Index() {
  return (
    <AuroraBackground className="flex flex-col h-full w-full">
      <div className="flex flex-col h-full w-full bg-artify-elements-background-depth-1">
        <Header />
        <ClientOnly fallback={<BaseChat />}>{() => <Chat />}</ClientOnly>
      </div>
    </AuroraBackground>
  );
}
