"use client";
import { cn } from "~/lib/utils";
import React, { type ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "transition-bg relative flex h-[100vh] flex-col items-center justify-center bg-black text-white",
          className,
        )}
        {...props}
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={
            {
              // 🎨 Brighter and more colorful Aurora
              "--aurora":
                "repeating-linear-gradient(120deg, #5eead4 5%, #22d3ee 10%, #06b6d4 15%, #2dd4bf 20%, #10b981 25%, #059669 30%, #0f172a 35%, #0c4a6e 40%)",

              "--dark-gradient":
                "repeating-linear-gradient(120deg, #000 0%, #000 7%, transparent 10%, transparent 12%, #000 16%)",
              "--white-gradient":
                "repeating-linear-gradient(120deg, #fff 0%, #fff 7%, transparent 10%, transparent 12%, #fff 16%)",

              // Aurora color variables
              "--mint": "#5eead4", // Minty teal
              "--teal-400": "#22d3ee", // Bright teal
              "--cyan-400": "#06b6d4", // Cyan
              "--teal-300": "#2dd4bf", // Soft teal
              "--green-500": "#10b981", // Medium green
              "--green-600": "#059669", // Darker green
              "--navy-900": "#0f172a", // Navy blue
              "--blue-900": "#0c4a6e", // Deep cool blue
              "--black": "#000",
              "--white": "#fff",
              "--transparent": "transparent",
            } as React.CSSProperties
          }
        >
          <div
            className={cn(
              `after:animate-aurora pointer-events-none absolute -inset-[10px]
              [background-image:var(--white-gradient),var(--aurora)]
              [background-size:600%,_400%] [background-position:0%_0%,0%_0%]
              opacity-70 blur-[14px] invert filter will-change-transform
              [--aurora:repeating-linear-gradient(120deg,var(--mint)_5%,var(--teal-400)_10%,var(--cyan-400)_15%,var(--teal-300)_20%,var(--green-500)_25%,var(--green-600)_30%,var(--navy-900)_35%,var(--blue-900)_40%)]
              [--dark-gradient:repeating-linear-gradient(120deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
              [--white-gradient:repeating-linear-gradient(120deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
              after:absolute after:inset-0
              after:[background-image:var(--white-gradient),var(--aurora)]
              after:[background-size:400%,_300%]
              after:[background-position:0%_0%]
              after:[background-attachment:fixed]
              after:mix-blend-difference after:content-[""]
              dark:[background-image:var(--dark-gradient),var(--aurora)]
              dark:invert-0 after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,

              showRadialGradient && `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_80%)]`,
            )}
          />
        </div>
        {children}
      </div>
    </main>
  );
};
