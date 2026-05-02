import { Car, CalendarCheck, ShieldCheck } from "lucide-react";

const steps = [
  {
    title: "Pick dates & desk",
    body: "Tell us where you’ll collect and return the car — no clutter.",
    icon: CalendarCheck,
  },
  {
    title: "Choose your car",
    body: "Filters stay simple so you find the right fit in one glance.",
    icon: Car,
  },
  {
    title: "Confirm & go",
    body: "Your details, license, and confirmation — clear and quick.",
    icon: ShieldCheck,
  },
] as const;

/** Lightweight explainer reinforcing the three-step journey (anchors landing SEO section). */
export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <h2 className="text-center text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        Three steps. Then you’re on the road.
      </h2>
      <p className="mx-auto mt-3 max-w-lg text-center text-[15px] text-muted-foreground">
        We stripped everything nonessential so booking feels calm — especially on
        mobile.
      </p>

      <ul className="mt-12 grid gap-6 sm:grid-cols-3">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <step.icon className="h-5 w-5" aria-hidden />
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Step {index + 1}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-foreground">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {step.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
