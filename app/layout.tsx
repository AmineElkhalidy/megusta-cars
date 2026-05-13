import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { FloatingHelp } from "@/components/layout/floating-help";
import { LocaleSync } from "@/components/layout/locale-sync";
import { ThemeProvider } from "@/components/theme-provider";
import { site } from "@/lib/site-config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** Editorial display face — used for hero/section headlines. */
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} · Friendly car rental`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
};

/**
 * Inline bootstrap: read the persisted locale from localStorage and set
 * `<html lang>` + `<html dir>` BEFORE React hydrates. This prevents any flash
 * of LTR content when a Darija user loads the site.
 */
const localeBootstrap = `
(function () {
  try {
    var raw = localStorage.getItem('megusta-locale');
    var locale = 'en';
    if (raw) {
      var parsed = JSON.parse(raw);
      if (parsed && parsed.state && parsed.state.locale) {
        locale = parsed.state.locale;
      }
    }
    var meta = {
      en: { lang: 'en', dir: 'ltr' },
      fr: { lang: 'fr', dir: 'ltr' },
      ar: { lang: 'ar-MA', dir: 'rtl' }
    };
    var m = meta[locale] || meta.en;
    document.documentElement.lang = m.lang;
    document.documentElement.dir = m.dir;
  } catch (err) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: localeBootstrap }}
        />
      </head>
      <body className="relative flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider>
          {/* Soft ambient mesh sitting behind every page — keeps composition warm without overpowering content. */}
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-10 bg-mesh-warm opacity-70"
          />
          <LocaleSync />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <FloatingHelp />
        </ThemeProvider>
      </body>
    </html>
  );
}
