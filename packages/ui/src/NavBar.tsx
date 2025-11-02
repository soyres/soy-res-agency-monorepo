// app/components/NavBar.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SlideDrawer from "./SlideDrawer";
import useActiveSection from "@/app/hooks/useActiveSection";
import { useConfig, useNav, useSocials } from "@/app/config/lib/context/ConfigContext";
import { IconX, IconInstagram, IconLinkedIn, IconMail } from "./Icons";

export default function NavBar() {
  const config = useConfig();
  const nav = useNav();
  const socials = useSocials();
  
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const ids = nav.links
    .map((l) => l.href.startsWith("#") ? l.href.slice(1) : "")
    .filter(Boolean) as string[];
  
  const activeId = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'twitter': return <IconX />;
      case 'instagram': return <IconInstagram />;
      case 'linkedin': return <IconLinkedIn />;
      case 'email': return <IconMail />;
      default: return null;
    }
  };

  const drawerSocials = socials.map(s => ({
    href: s.href,
    label: s.label,
    icon: getSocialIcon(s.platform),
  }));

  return (
    <>
      <header 
        className={[
          "fixed inset-x-0 z-50 transition-colors",
          nav.position === 'top' ? 'top-0' : 'bottom-0',
          scrolled 
            ? "backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-black/10" 
            : "bg-transparent",
        ].join(" ")}
      >
        <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-sm tracking-widest uppercase">
            {config.logo ? (
              <img src={config.logo} alt={config.name} className="h-8" />
            ) : (
              <>
                <span className="font-semibold">{config.name.split(' ')[0]}</span>
                {config.name.split(' ').slice(1).join(' ') && (
                  <>&nbsp;{config.name.split(' ').slice(1).join(' ')}</>
                )}
              </>
            )}
          </Link>

          <ul className="hidden md:flex items-center gap-8 text-sm">
            {nav.links.map((l) => {
              const id = l.href.startsWith('#') ? l.href.slice(1) : '';
              const isActive = activeId === id;
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target={l.external ? '_blank' : undefined}
                    rel={l.external ? 'noopener noreferrer' : undefined}
                    className={[
                      "transition-opacity",
                      isActive 
                        ? "opacity-100 font-medium underline underline-offset-8" 
                        : "opacity-80 hover:opacity-100"
                    ].join(" ")}
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {nav.showOnMobile && (
            <button
              onClick={() => setOpen(true)}
              className="md:hidden h-9 w-9 grid place-items-center rounded hover:bg-black/5"
              aria-label="Open menu"
            >
              <span className="inline-block h-5 w-5">☰</span>
            </button>
          )}
        </nav>
      </header>

      <SlideDrawer
        side={nav.drawer?.side || 'left'}
        open={open}
        onClose={() => setOpen(false)}
        links={nav.links}
        socials={drawerSocials}
        title={config.tagline || 'Menu'}
      />
    </>
  );
}