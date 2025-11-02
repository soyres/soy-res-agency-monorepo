// app/components/NavBarLinks.tsx - Fixed to work with config
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useConfig } from "@/app/config/lib/context/ConfigContext";

export default function NavLinksInline({
  className = "",
  linkClassName = "",
  activeClassName = "opacity-100",
  inactiveClassName = "opacity-80 hover:opacity-100",
}: {
  className?: string;
  linkClassName?: string;
  activeClassName?: string;
  inactiveClassName?: string;
}) {
  const config = useConfig();
  const pathname = usePathname();
  const links = config.nav.links;

  return (
    <ul className={["flex items-center gap-6 text-sm", className].join(" ")}>
      {links.map((l) => {
        const isHash = l.href.startsWith("#");
        const active = !isHash && pathname === l.href;
        const aClasses = [
          "transition-opacity underline-offset-8",
          linkClassName,
          active ? activeClassName : inactiveClassName,
        ].join(" ");

        return (
          <li key={l.href}>
            {isHash ? (
              <a 
                href={l.href} 
                className={aClasses}
                onClick={(e) => {
                  e.preventDefault();
                  const id = l.href.slice(1);
                  const element = document.getElementById(id);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                {l.label}
              </a>
            ) : (
              <Link href={l.href} className={aClasses}>
                {l.label}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}