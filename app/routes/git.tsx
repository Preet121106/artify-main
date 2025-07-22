import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json, type MetaFunction } from "@remix-run/cloudflare";
import { ClientOnly } from "remix-utils/client-only";
import { BaseChat } from "~/components/chat/BaseChat";
import { GitUrlImport } from "~/components/git/GitUrlImport.client";
import { Header } from "~/components/header/Header";

//import BackgroundRays from '~/components/ui/BackgroundRays';
import { AuroraBackground } from "~/components/ui/aurora-background";

export const meta: MetaFunction = () => {
  return [{ title: "artify" }, { name: "description", content: "Talk with artify, an AI assistant from StackBlitz" }];
};

export async function loader(args: LoaderFunctionArgs) {
  return json({ url: args.params.url });
}

export default function Index() {
  return (
    <AuroraBackground>
      <div className="flex flex-col h-full w-full bg-artify-elements-background-depth-1">
        <Header />
        <ClientOnly fallback={<BaseChat />}>{() => <GitUrlImport />}</ClientOnly>
      </div>
    </AuroraBackground>
  );
}
