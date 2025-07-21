import React from "react";

const EXAMPLE_PROMPTS = [
  { text: "Build a simple blog using Astro" },
  { text: "Build a E-Commerce website using nextjs" },
  { text: "Build a developer portfolio using Vite and React" },
  { text: "Create a cookie consent form using Material UI" },
  { text: "Make a space invaders game" },
  { text: "Make a Tic Tac Toe game in html, css and js only" },
];

export function ExamplePrompts(sendMessage?: { (event: React.UIEvent, messageInput?: string): void | undefined }) {
  return (
    <div id="examples" className="relative flex flex-col gap-9 w-full max-w-3xl mx-auto  justify-center mt-6">
      <div
        className="flex flex-wrap justify-center gap-2"
        style={{
          animation: ".25s ease-out 0s 1 _fade-and-move-in_g2ptj_1 forwards",
        }}
      >
        {EXAMPLE_PROMPTS.map((examplePrompt, index: number) => {
          return (
            <button
              key={index}
              onClick={(event) => {
                sendMessage?.(event, examplePrompt.text);
              }}
              className="border border-artify-elements-borderColor rounded-full bg-black-50 hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-900 text-artify-elements-textSecondary hover:text-artify-elements-textPrimary px-3 py-1 text-xs transition-theme"
            >
              {examplePrompt.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
