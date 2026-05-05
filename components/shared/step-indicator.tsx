import { Check } from "lucide-react";

type StepIndicatorProps = {
  steps: readonly string[];
  current: number; // 1-based index
};

/** Visual progress indicator so users always see where they are in the journey. */
export function StepIndicator({ steps, current }: StepIndicatorProps) {
  return (
    <ol className="flex items-center gap-2 sm:gap-3">
      {steps.map((label, idx) => {
        const step = idx + 1;
        const completed = step < current;
        const active = step === current;
        return (
          <li key={label} className="flex flex-1 items-center gap-2 sm:gap-3">
            <span
              className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                completed
                  ? "bg-gradient-to-br from-primary to-primary-soft text-primary-foreground shadow-sm shadow-primary/30"
                  : active
                    ? "bg-gradient-to-br from-primary to-primary-soft text-primary-foreground shadow-md shadow-primary/30 ring-2 ring-primary/30 ring-offset-2 ring-offset-background"
                    : "border border-border-strong bg-card text-muted-foreground"
              }`}
              aria-current={active ? "step" : undefined}
            >
              {completed ? (
                <Check className="h-4 w-4" aria-hidden strokeWidth={3} />
              ) : (
                step
              )}
            </span>
            <span
              className={`hidden text-sm font-semibold sm:inline ${
                active
                  ? "text-foreground"
                  : completed
                    ? "text-foreground/80"
                    : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
            {step < steps.length ? (
              <span
                aria-hidden
                className={`h-0.5 flex-1 rounded-full transition-colors ${
                  completed
                    ? "bg-gradient-to-r from-primary to-primary-soft"
                    : "bg-border"
                }`}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
