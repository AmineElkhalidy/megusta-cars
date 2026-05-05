"use client";

import { useT } from "@/lib/i18n/use-t";

export function DashboardHeader() {
  const { t } = useT();
  // Carve out the trailing emoji (if present) for an italic accent.
  const helloRaw = t.dashboard.hello;
  const emoji = helloRaw.match(/[\p{Extended_Pictographic}]+/u)?.[0] ?? "";
  const hello = emoji ? helloRaw.replace(emoji, "").trim() : helloRaw;

  return (
    <div className="mb-12 animate-fade-up">
      <p className="eyebrow">
        {hello}
        {emoji ? (
          <span className="ms-1 font-display italic">{emoji}</span>
        ) : null}
      </p>
      <h1 className="mt-4 text-[clamp(2.25rem,4.5vw,3.5rem)] font-semibold leading-[1.04] tracking-tight text-foreground">
        {t.dashboard.title.split(" ")[0]}{" "}
        <span className="font-display italic font-normal text-flame">
          {t.dashboard.title.split(" ").slice(1).join(" ")}
        </span>
      </h1>
      <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
        {t.dashboard.subtitle}
      </p>
    </div>
  );
}
