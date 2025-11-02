"use client";

export default function TemplatePage({
  title,
  intro,
  fullHeight = false,
  children,
}: {
  title?: string;
  intro?: string | React.ReactNode;
  fullHeight?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={[fullHeight ? "min-h-screen" : "", "px-4 py-16"].join(" ")}>
      {title ? <h1 className="text-3xl md:text-4xl font-semibold">{title}</h1> : null}
      {intro ? <p className="mt-3 opacity-80 max-w-3xl">{intro}</p> : null}
      <div className="mt-8">{children}</div>
    </section>
  );
}
