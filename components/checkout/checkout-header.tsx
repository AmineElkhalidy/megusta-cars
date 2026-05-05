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

  return (
    <>
      <StepIndicator steps={steps} current={3} />
      <div className="mt-8 mb-8 animate-fade-up">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {t.checkout.stepEyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {t.checkout.title}
        </h1>
      </div>
    </>
  );
}
