import { useStore } from "@nanostores/react";
import { ClientOnly } from "remix-utils/client-only";
import { chatStore } from "~/lib/stores/chat";
import { classNames } from "~/utils/classNames";
import { HeaderActionButtons } from "./HeaderActionButtons.client";
import { ChatDescription } from "~/lib/persistence/ChatDescription.client";

import { SignedIn, UserButton } from "@clerk/remix"; // 👈 Import from Clerk

export function Header() {
  const chat = useStore(chatStore);

  return (
    <header
      className={classNames("flex items-center justify-between px-4 border-b h-[var(--header-height)]", {
        "border-transparent": !chat.started,
        "border-artify-elements-borderColor": chat.started,
      })}
    >
      {/* ───── Left: Logo ───── */}
      <div className="flex items-center gap-2 z-logo text-artify-elements-textPrimary cursor-pointer">
        <div className="i-ph:sidebar-simple-duotone text-xl" />
        <a href="/" className="text-2xl font-semibold text-accent flex items-center">
          <img src="/logo-light-styled.png" alt="logo" className="w-[90px] inline-block dark:hidden" />
          <img src="/logo-ligh.png" alt="logo" className="w-[90px] inline-block dark:block" />
        </a>
      </div>

      {/* ───── Center: Chat description ───── */}
      {chat.started && (
        <span className="flex-1 px-4 truncate text-center text-artify-elements-textPrimary">
          <ClientOnly>{() => <ChatDescription />}</ClientOnly>
        </span>
      )}

      {/* ───── Right: Action buttons + User profile ───── */}
      <div className="flex items-center gap-3 mr-10">
        {chat.started && <ClientOnly>{() => <HeaderActionButtons chatStarted={chat.started} />}</ClientOnly>}

        {/* ───── Clerk user profile button ───── */}
        <ClientOnly>
          {() => (
            <SignedIn>
              <UserButton afterSignOutUrl="/hero" />
            </SignedIn>
          )}
        </ClientOnly>
      </div>
    </header>
  );
}
