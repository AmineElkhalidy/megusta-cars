import Link from "next/link";
import { site } from "@/lib/site-config";

/** Compact footer with legal placeholders and quick links. */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="text-[15px] font-semibold tracking-tight text-foreground">
            {site.name}
          </p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            {site.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link href="/fleet" className="hover:text-foreground">
            Browse fleet
          </Link>
          <Link href="/dashboard" className="hover:text-foreground">
            Bookings
          </Link>
          <span className="cursor-default">Terms</span>
          <span className="cursor-default">Privacy</span>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {year} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
