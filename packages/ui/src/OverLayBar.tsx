"use client";

import React from "react";

type Anchor = "top" | "bottom";
type Justify = "start" | "center" | "end" | "between";
type ShowMode = "mobile" | "desktop" | "always" | "never";

export default function OverlayBar({
  anchor = "top",
  justify = "between",
  fixed = true,
  containerClassName = "mx-auto max-w-7xl px-5 py-6",
  className = "",
  left,
  center,
  right,
}: {
  anchor?: Anchor;
  justify?: Justify;              // control placement when not using all 3 slots
  fixed?: boolean;                // fixed vs absolute
  containerClassName?: string;    // your "mx-auto max-w-7xl px-5 py-6"
  className?: string;             // extra classes for the wrapper
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}) {
  const pos = anchor === "top" ? "top-0" : "bottom-0";
  const place =
    justify === "between"
      ? "justify-between"
      : justify === "center"
      ? "justify-center"
      : justify === "end"
      ? "justify-end"
      : "justify-start";

  // border only on the edge we dock to
  const edgeBorder =
    anchor === "top"
      ? "border-b border-white/20"
      : "border-t border-white/20";

  return (
    <div
      className={[
        fixed ? "fixed" : "absolute",
        "inset-x-0 z-50", pos,
        "bg-transparent pointer-events-none", // keep overlay feeling
        className,
      ].join(" ")}
    >
      <div className={`${containerClassName}`}>
        <div className={`flex items-center ${place} ${edgeBorder} pointer-events-none`}>
          {/* slots: enable pointer events per slot */}
          {left && <div className="pointer-events-auto">{left}</div>}
          {center && <div className="flex-1 pointer-events-none flex justify-center">
            <div className="pointer-events-auto">{center}</div>
          </div>}
          {right && <div className="pointer-events-auto">{right}</div>}
        </div>
      </div>
    </div>
  );
}

/** Small helper to show/hide children by breakpoint */
export function Show({
  on = "always",
  children,
}: { on?: ShowMode; children: React.ReactNode }) {
  const map: Record<ShowMode, string> = {
    always: "",
    never: "hidden",
    mobile: "md:hidden",
    desktop: "hidden md:block",
  };
  return <div className={map[on]}>{children}</div>;
}
