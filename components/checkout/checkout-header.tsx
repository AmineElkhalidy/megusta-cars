"use client";

import { StepIndicator } from "@/components/shared/step-indicator";
import { useT } from "@/lib/i18n/use-t";

export function CheckoutHeader() {
  const { t } = useT();
  const steps = [
    t.steps.items[0].title,
    t.steps.items[1].title,
    t.steps.items[2].title,
  ] as const;

  // Split title around the trailing emoji (if present) for the italic accent.
  const rawTitle = t.checkout.title;
  const emojiMatch = rawTitle.match(/[\p{Extended_Pictographic}]+/u);
  const accent = emojiMatch?.[0] ?? "";
  const titleBody = accent ? rawTitle.replace(accent, "").trim() : rawTitle;

  return (
    <>
      <StepIndicator steps={steps} current={3} />
      <div className="mt-8 mb-10 animate-fade-up">
        <p className="eyebrow">{t.checkout.stepEyebrow}</p>
        <h1 className="mt-4 text-[clamp(2rem,4.4vw,3.25rem)] font-semibold leading-[1.04] tracking-tight text-foreground">
          {titleBody}
          {accent ? (
            <span className="ms-2 font-display italic font-normal">
              {accent}
            </span>
          ) : null}
        </h1>
      </div>
    </>
  );
}
