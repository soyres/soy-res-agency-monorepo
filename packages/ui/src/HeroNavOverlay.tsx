// app/components/HeroNavOverlay.tsx
"use client";

import Link from "next/link";
import OptimizedImage from "./OptimizedImage";
import { NAV_LINKS } from "@/app/config/navLinks";

export default function HeroMegaLinks({
  bgSrc = "/og-image.png",
  links = NAV_LINKS,
}: {
  bgSrc?: string;
  links?: { href: string; label: string }[];
}) {
  return (
    <section className="relative min-h-dvh w-full overflow-hidden">
      {/* Background with blur placeholder */}
      <div className="absolute inset-0 -z-10">
        <OptimizedImage
          src={bgSrc} 
          alt="" 
          fill 
          priority 
          className="object-cover"
          blurColor="dark"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* ... rest of component ... */}
    </section>
  );
}