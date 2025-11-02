// "use client";

// import { useEffect } from "react";
// import Link from "next/link";

// export type DrawerLink = { href: string; label: string };
// export type DrawerSocial = { href: string; label: string; icon: React.ReactNode };

// export default function SlideDrawer({
//   side = "left",
//   open,
//   onClose,
//   links = [],
//   socials = [],
//   title = "Menu",
// }: {
//   side?: "left" | "right";
//   open: boolean;
//   onClose: () => void;
//   links?: DrawerLink[];
//   socials?: DrawerSocial[];
//   title?: string;
// }) {
//   const isLeft = side === "left";
//   const closed = isLeft ? "-translate-x-full" : "translate-x-full";

//   // ESC to close
//   useEffect(() => {
//     const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
//     if (open) document.addEventListener("keydown", onKey);
//     return () => document.removeEventListener("keydown", onKey);
//   }, [open, onClose]);

//   // lock scroll
//   useEffect(() => {
//     if (!open) return;
//     const prev = document.body.style.overflow;
//     document.body.style.overflow = "hidden";
//     return () => { document.body.style.overflow = prev; };
//   }, [open]);

//   return (
//     <div
//       aria-hidden={!open}
//       onMouseDown={(e) => e.target === e.currentTarget && onClose()}
//       className={[
//         "fixed inset-0 z-[80] transition-opacity duration-300",
//         open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
//       ].join(" ")}
//     >
//       <div className="absolute inset-0 bg-black/40" />
//       <div
//         role="dialog" aria-modal="true" aria-label={title}
//         className={[
//           "absolute top-0 h-full w-[84%] max-w-sm bg-white text-black shadow-xl flex flex-col",
//           isLeft ? "left-0" : "right-0",
//           "transition-transform duration-300",
//           open ? "translate-x-0" : closed,
//         ].join(" ")}
//       >
//         <div className="flex items-center justify-between px-4 py-4 border-b border-black/10">
//           <div className="text-xs tracking-widest uppercase">{title}</div>
//           <button
//             aria-label="Close menu"
//             onClick={onClose}
//             className="h-9 w-9 grid place-items-center rounded hover:bg-black/5"
//           >
//             ✕
//           </button>
//         </div>

//         <nav className="px-4 py-4 grow">
//           <ul className="flex flex-col gap-1 text-base">
//             {links.map((l) => (
//               <li key={l.href}>
//                 <a
//                   href={l.href}
//                   className="block px-2 py-2 rounded opacity-90 hover:opacity-100 transition-opacity"
//                   onClick={(e) => {
//                     if (l.href.startsWith("#")) {
//                       e.preventDefault();
//                       const id = l.href.slice(1);
//                       document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
//                     }
//                     onClose();
//                   }}
//                 >
//                   {l.label}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </nav>

//         {socials.length > 0 && (
//           <div className="px-4 py-4 border-t border-black/10">
//             <ul className="flex items-center justify-between">
//               {socials.map((s) => (
//                 <li key={s.href}>
//                   <a
//                     href={s.href}
//                     aria-label={s.label}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="opacity-80 hover:opacity-100"
//                   >
//                     {s.icon}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { SITE_MODE } from "@/app/config/site";

export type DrawerLink = { href: string; label: string };
export type DrawerSocial = { href: string; label: string; icon: React.ReactNode };

export default function SlideDrawer({
  side = "left",
  open,
  onClose,
  links = [],
  socials = [],
  title = "Menu",
  mode = SITE_MODE, // ← can override
}: {
  side?: "left" | "right";
  open: boolean;
  onClose: () => void;
  links?: DrawerLink[];
  socials?: DrawerSocial[];
  title?: string;
  mode?: "single" | "multi";
}) {
  const isLeft = side === "left";
  const closed = isLeft ? "-translate-x-full" : "translate-x-full";

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // lock scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  return (
    <div
      aria-hidden={!open}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      className={[
        "fixed inset-0 z-[80] transition-opacity duration-300",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
      ].join(" ")}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div
        role="dialog" aria-modal="true" aria-label={title}
        className={[
          "absolute top-0 h-full w-[84%] max-w-sm bg-white text-black shadow-xl flex flex-col",
          isLeft ? "left-0" : "right-0",
          "transition-transform duration-300",
          open ? "translate-x-0" : closed,
        ].join(" ")}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-black/10">
          <div className="text-xs tracking-widest uppercase">{title}</div>
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="h-9 w-9 grid place-items-center rounded hover:bg-black/5"
          >
            ✕
          </button>
        </div>

        <nav className="px-4 py-4 grow">
          <ul className="flex flex-col gap-1 text-base">
            {links.map((l) => {
              const isHash = l.href.startsWith("#");
              if (mode === "single" && isHash) {
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="block px-2 py-2 rounded opacity-90 hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.preventDefault();
                        const id = l.href.slice(1);
                        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                        onClose();
                      }}
                    >
                      {l.label}
                    </a>
                  </li>
                );
              }
              // multi-page or non-hash link
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="block px-2 py-2 rounded opacity-90 hover:opacity-100 transition-opacity"
                    onClick={() => onClose()}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {socials.length > 0 && (
          <div className="px-4 py-4 border-t border-black/10">
            <ul className="flex items-center justify-between">
              {socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noreferrer"
                    className="opacity-80 hover:opacity-100"
                  >
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
