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
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                completed
                  ? "bg-primary text-primary-foreground"
                  : active
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                    : "bg-muted text-muted-foreground"
              }`}
              aria-current={active ? "step" : undefined}
            >
              {completed ? <Check className="h-4 w-4" aria-hidden /> : step}
            </span>
            <span
              className={`hidden text-sm font-medium sm:inline ${
                active ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
            {step < steps.length ? (
              <span
                aria-hidden
                className={`h-px flex-1 ${
                  completed ? "bg-primary" : "bg-border"
                }`}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
