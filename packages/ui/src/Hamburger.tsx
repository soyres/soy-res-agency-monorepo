// app/components/Hamburger.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/app/config/navLinks";

export default function Hamburger() {
  const [open, setOpen] = useState(false);

  // close drawer on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="group inline-flex items-center gap-2 tracking-widest"
      >
        <span className="text-sm">MENU</span>
        <span className="relative h-3 w-5">
          <span className="absolute inset-x-0 top-0 h-[2px] bg-current"></span>
          <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-current"></span>
          <span className="absolute inset-x-0 bottom-0 h-[2px] bg-current"></span>
        </span>
      </button>

      {/* Drawer overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}
      {/* Drawer panel */}
      <aside
        className={[
          "fixed right-0 top-0 z-[90] h-full w-80 bg-white shadow-2xl transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-sm tracking-widest">MENU</span>
          <button aria-label="Close" onClick={() => setOpen(false)} className="text-2xl leading-none">
            ×
          </button>
        </div>
        <nav className="p-6">
          <ul className="space-y-4 text-lg">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block hover:opacity-70"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
