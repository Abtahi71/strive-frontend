// No "use client" needed: this has no hooks, so it works in server and client components.

type Size = "sm" | "md" | "lg";

const SPINNER_SIZE: Record<Size, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-9 w-9 border-[3px]",
};

const COLUMNS: Record<1 | 2 | 3 | 4, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

/* ============================================================
   PRIMITIVES
============================================================ */
export function Spinner({
  size = "md",
  className = "",
}: {
  size?: Size;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 animate-spin rounded-full border-zinc-700 border-t-white ${SPINNER_SIZE[size]} ${className}`}
    />
  );
}

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-md bg-zinc-800/80 motion-reduce:animate-none ${className}`}
    />
  );
}

/* ============================================================
   SPINNER LOADER
   variant="page"    -> full screen, centered (route-level)
   variant="section" -> fills its parent, centered (a card, panel or tab)
   variant="inline"  -> sits in a line of text or inside a button
   variant="overlay" -> dims the whole screen (for mutations)
============================================================ */
type LoadingProps = {
  variant?: "page" | "section" | "inline" | "overlay";
  size?: Size;
  /** Visible text. Without it, the label is screen-reader only. */
  label?: string;
  className?: string;
};

export default function Loading({
  variant = "section",
  size,
  label,
  className = "",
}: LoadingProps) {
  const spinnerSize: Size = size ?? (variant === "inline" ? "sm" : "md");

  const layout = {
    page: "flex min-h-screen w-full flex-col items-center justify-center gap-3 bg-zinc-950",
    section:
      "flex min-h-[200px] h-full w-full flex-col items-center justify-center gap-3",
    inline: "inline-flex items-center gap-2",
    overlay:
      "fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-black/60 backdrop-blur-sm",
  }[variant];

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={`${layout} ${className}`}
    >
      <Spinner size={spinnerSize} />
      {label ? (
        <span className="text-xs text-zinc-500">{label}</span>
      ) : (
        <span className="sr-only">Loading…</span>
      )}
    </div>
  );
}

/* ============================================================
   SKELETON LOADERS (placeholder shapes, less layout shift)
============================================================ */

/** Rows with an avatar and two lines. Good for activities, friends, invitations. */
export function LoadingList({
  rows = 4,
  className = "",
}: {
  rows?: number;
  className?: string;
}) {
  return (
    <div role="status" aria-busy="true" className={`space-y-3 ${className}`}>
      <span className="sr-only">Loading…</span>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-1">
          <Skeleton className="h-9 w-9 shrink-0 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-2.5 w-1/2 bg-zinc-800/60" />
          </div>
          <Skeleton className="hidden h-2 w-20 sm:block" />
        </div>
      ))}
    </div>
  );
}

/** A grid of card placeholders. */
export function LoadingCards({
  count = 4,
  columns = 2,
  cardClassName = "h-[104px]",
  className = "",
}: {
  count?: number;
  columns?: 1 | 2 | 3 | 4;
  cardClassName?: string;
  className?: string;
}) {
  return (
    <div
      role="status"
      aria-busy="true"
      className={`grid gap-2 ${COLUMNS[columns]} ${className}`}
    >
      <span className="sr-only">Loading…</span>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton
          key={i}
          className={`rounded-xl border border-zinc-800/80 bg-zinc-900/40 ${cardClassName}`}
        />
      ))}
    </div>
  );
}

/** Paragraph-style lines. The last line is shorter. */
export function LoadingText({
  lines = 3,
  className = "",
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div role="status" aria-busy="true" className={`space-y-2 ${className}`}>
      <span className="sr-only">Loading…</span>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-3 ${i === lines - 1 && lines > 1 ? "w-2/3" : "w-full"}`}
        />
      ))}
    </div>
  );
}
