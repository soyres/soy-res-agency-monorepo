// app/components/PageShell.tsx
"use client";

import { useEffect, useState, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import SlideDrawer from "./SlideDrawer";
import HamburgerButton from "./HamburgerButton";
import NavBarLinks from "./NavBarLinks";
import { useConfig } from "@/app/config/lib/context/ConfigContext";

type Anchor = "top" | "bottom" | "hidden";
type ShowMode = "mobile" | "desktop" | "always" | "never";

export function Show({ on = "always", children }: { on?: ShowMode; children: React.ReactNode }) {
  const map: Record<ShowMode, string> = {
    always: "",
    never: "hidden",
    mobile: "md:hidden",
    desktop: "hidden md:block",
  };
  return <div className={map[on]}>{children}</div>;
}

function PageShell({
  children,
  fullHeight = false,
  navAnchor = "top",
  showHamburger = "mobile",
  drawerSide = "left",
  footer,
  className = "",
  containerClassName = "mx-auto max-w-7xl px-5 py-6",
  navLeft,
  navCenter,
  navRight,
}: {
  children: React.ReactNode;
  fullHeight?: boolean;
  navAnchor?: Anchor;
  showHamburger?: ShowMode;
  drawerSide?: "left" | "right";
  footer?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  navLeft?: React.ReactNode;
  navCenter?: React.ReactNode;
  navRight?: React.ReactNode;
}) {
  const config = useConfig();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const NAV_H = 80;

  useEffect(() => {
    // Improved scroll threshold - more stable at 50px instead of 4px
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const posClass = navAnchor === "top" ? "top-0" : "bottom-0";
  const edgeBorder = navAnchor === "top" ? "border-b border-black/10" : "border-t border-black/10";
  const headerBg =
    scrolled && navAnchor !== "hidden"
      ? `backdrop-blur-md supports-[backdrop-filter]:bg-white/70 ${edgeBorder}` // Increased blur and opacity
      : "bg-transparent";

  // Get social icons from config
  const getSocialIcon = (platform: string) => {
    const { IconX, IconInstagram, IconLinkedIn, IconMail } = require('./Icons');
    switch (platform) {
      case 'twitter': return <IconX />;
      case 'instagram': return <IconInstagram />;
      case 'linkedin': return <IconLinkedIn />;
      case 'email': return <IconMail />;
      default: return null;
    }
  };

  const drawerSocials = (config.socials || []).map(s => ({
    href: s.href,
    label: s.label,
    icon: getSocialIcon(s.platform),
  }));

  const defaultLeft = (
    <Link 
      href="/contact" 
      className="tracking-widest text-sm text-white/90 hover:text-white transition-colors duration-200"
    >
      CONTACT
    </Link>
  );
  
  const defaultCenter = (
    <Image src="/res.png" alt="res" width={40} height={40} className="opacity-90" />
  );
  
  const defaultRight = (
    <>
      <Show on="desktop">
        <NavBarLinks className="text-white/90" />
      </Show>
      {showHamburger !== "never" && (
        <Show on={showHamburger}>
          <HamburgerButton visibleOn="always" corner="tr" onOpen={() => setOpen(true)} />
        </Show>
      )}
    </>
  );

  return (
    <>
      {navAnchor !== "hidden" && (
        <header
          className={[
            "fixed inset-x-0 z-[60] transition-all duration-500", // Smoother transition
            posClass,
            headerBg,
          ].join(" ")}
        >
          <nav className={[containerClassName, "grid grid-cols-3 items-center"].join(" ")}>
            <div className="justify-self-start">{navLeft ?? defaultLeft}</div>
            <div className="justify-self-center">{navCenter ?? defaultCenter}</div>
            <div className="justify-self-end flex items-center gap-4">{navRight ?? defaultRight}</div>
          </nav>
        </header>
      )}

      <SlideDrawer
        side={drawerSide}
        open={open}
        onClose={() => setOpen(false)}
        links={config.nav.links}
        socials={drawerSocials}
        title="Menu"
        mode={config.mode}
      />

      <main
        id="main"
        className={[
          navAnchor !== "hidden" && !fullHeight
            ? navAnchor === "top"
              ? "pt-20"
              : "pb-20"
            : "",
          fullHeight ? "min-h-dvh overflow-hidden" : "",
          className,
        ].join(" ")}
        style={
          navAnchor !== "hidden" && !fullHeight
            ? navAnchor === "top"
              ? { paddingTop: NAV_H }
              : { paddingBottom: NAV_H }
            : undefined
        }
      >
        {children}
      </main>

      {footer ?? null}
    </>
  );
}

export default memo(PageShell);