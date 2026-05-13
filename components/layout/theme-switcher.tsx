"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useT } from "@/lib/i18n/use-t";

const MODES = ["light", "dark", "system"] as const;
type Mode = (typeof MODES)[number];

/**
 * Appearance menu (light / dark / system) — mirrors the language switcher
 * so the header controls stay visually consistent.
 */
export function ThemeSwitcher({ className = "" }: { className?: string }) {
  const { t } = useT();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const active: Mode =
    theme === "light" || theme === "dark" || theme === "system"
      ? theme
      : "system";

  const TriggerIcon = () => {
    if (!mounted) {
      return <Sun className="h-4 w-4 text-muted-foreground" aria-hidden />;
    }
    if (active === "system") {
      return <Monitor className="h-4 w-4 text-primary" aria-hidden />;
    }
    return resolvedTheme === "dark" ? (
      <Moon className="h-4 w-4 text-primary" aria-hidden />
    ) : (
      <Sun className="h-4 w-4 text-primary" aria-hidden />
    );
  };

  const labels: Record<Mode, string> = {
    light: t.theme.light,
    dark: t.theme.dark,
    system: t.theme.system,
  };

  const icons: Record<Mode, typeof Sun> = {
    light: Sun,
    dark: Moon,
    system: Monitor,
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        aria-label={t.theme.choose}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-strong bg-card/80 text-foreground shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:border-foreground/20"
      >
        <TriggerIcon />
      </button>

      {open ? (
        <ul
          role="menu"
          className="surface-card-elevated absolute end-0 top-full z-50 mt-2 w-44 overflow-hidden p-1 animate-fade-in"
        >
          {MODES.map((mode) => {
            const Icon = icons[mode];
            const selected = mode === active;
            return (
              <li key={mode} role="none">
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={selected}
                  onClick={() => {
                    setTheme(mode);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-start text-sm transition-colors ${
                    selected
                      ? "bg-gradient-to-br from-primary/10 to-accent/10 text-primary ring-1 ring-primary/15"
                      : "text-foreground hover:bg-muted/60"
                  }`}
                >
                  <span className="flex items-center gap-2 font-medium">
                    <Icon className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                    {labels[mode]}
                  </span>
                  {selected ? (
                    <Check className="h-4 w-4 shrink-0" aria-hidden strokeWidth={3} />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
