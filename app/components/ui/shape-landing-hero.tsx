/* eslint-disable prettier/prettier */
"use client";

import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import { Link } from "@remix-run/react";
import { AuroraBackground } from "~/components/ui/aurora-background";

/* Removed unused `cn` import */

function HeroGeometric({
  badge = "Design Collective",
  title1 = "Elevate Your Digital Vision",
  title2 = "Crafting Exceptional Websites",
}: {
  badge?: string;
  title1?: string;
  title2?: string;
}) {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: 0.5 + i * 0.2, ease: [0.25, 0.4, 0.25, 1] },
    }),
  };

  return (

    /* Aurora wraps the whole hero */
    <AuroraBackground className="min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        {/* Badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-gray/5 px-3 py-1 md:mb-12"
        >
          <Circle className="h-2 w-2 fill-rose-500/80" />
          <Link to="/signin" className="text-sm tracking-wide text-white/60 transition hover:text-white">
            {badge}
          </Link>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl md:mb-8 md:text-8xl"
        >
          <span className="bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">
            {title1}
          </span>
          <br />
          <span className="bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 bg-clip-text text-transparent">
            {title2}
          </span>
        </motion.h1>

        {/* Sub‑copy */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto mb-8 max-w-xl px-4 text-base font-light leading-relaxed tracking-wide text-white/40 sm:text-lg md:text-xl"
        >
          One workspace. Every layer. Zero fragmentation.
        </motion.p>
      </div>

      {/* A dark vignette for contrast (optional) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80" />

        {/* ──  📌 Footer  ─────────────────────────────────────────── */}
  <footer className="absolute bottom-3 w-full text-center text-[15px] text-white/40">
    Designed and Developed by{" "}
    <a
      href="https://www.linkedin.com/in/preetbiswas"  /* ← put your exact profile URL */
      target="_blank"
      rel="noopener noreferrer"
      className=" hover:text-white/80 text-green-500"
    >
      Preet
    </a>
  </footer>
    </AuroraBackground>
  );
}

export { HeroGeometric };
