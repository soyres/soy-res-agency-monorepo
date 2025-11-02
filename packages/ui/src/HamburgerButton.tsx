"use client";

export default function HamburgerButton({
  onOpen,
  corner = "tr",
  visibleOn = "mobile",
  ariaLabel = "Open menu",
}: {
  onOpen: () => void;
  corner?: "tl" | "tr" | "bl" | "br";
  visibleOn?: "mobile" | "always";
  ariaLabel?: string;
}) {
  const pos =
    corner === "tl" ? "top-4 left-4" :
    corner === "tr" ? "top-4 right-4" :
    corner === "bl" ? "bottom-4 left-4" :
    "bottom-4 right-4";

  const vis = visibleOn === "mobile" ? "md:hidden" : "";

  return (
    <button
      aria-label={ariaLabel}
      onClick={onOpen}
      className={[
        "fixed z-[90] inline-flex items-center justify-center h-11 w-11 rounded border border-black/15 bg-white text-black shadow-sm",
        pos, vis,
      ].join(" ")}
    >
      <span className="relative block h-[2px] w-5 bg-black
                       before:content-[''] before:block before:h-[2px] before:w-5 before:bg-black before:absolute before:-translate-y-2
                       after:content-[''] after:block after:h-[2px] after:w-5 after:bg-black after:absolute after:translate-y-2" />
    </button>
  );
}
