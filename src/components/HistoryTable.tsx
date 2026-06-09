import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {Check, ChevronLeft, ChevronRight, Copy, ExternalLink} from "lucide-react";
import { toast } from "sonner";
import { fetchAllShortUrls } from "@/lib/api/urlShortener";

const PAGE_SIZE = 10;

function formatDateTime(value?: string | null) {
  if (!value) return "—";

  const d = new Date(value);
  if (isNaN(d.getTime())) return value;

  const pad = (n: number) => String(n).padStart(2, "0");

  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ` +
    `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export function HistoryTable() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["urls", page, PAGE_SIZE],
    queryFn: () => fetchAllShortUrls(page, PAGE_SIZE),
  });

  const rows = data?.data ?? [];
  const total = data?.totalElements ?? rows.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="glass overflow-hidden rounded-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Short</th>
              <th className="px-4 py-3 font-medium">Original</th>
              <th className="px-4 py-3 text-right font-medium">Clicks</th>
              <th className="px-4 py-3 font-medium">Created</th>
              <th className="px-4 py-3 font-medium">Expires</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>

          <tbody>
            {isLoading && <SkeletonRows />}

            {isError && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-destructive">
                  {(error as Error)?.message || "Failed to load links."}
                </td>
              </tr>
            )}

            {!isLoading && !isError && rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">
                  No links yet. Shorten one above to get started.
                </td>
              </tr>
            )}

            {rows.map((r, i) => (
              <Row key={(r.id as string) ?? `${r.shortUrl}-${i}`} row={r} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-border/60 px-4 py-3 text-xs text-muted-foreground">
        <span>
          {total > 0
            ? `Showing page ${page} of ${totalPages} · ${total} total`
            : "—"}
        </span>

        <div className="flex gap-1">
          <PagerBtn disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            <ChevronLeft className="h-4 w-4" />
          </PagerBtn>

          <PagerBtn
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </PagerBtn>
        </div>
      </div>
    </div>
  );
}

function PagerBtn({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="grid h-7 w-7 place-items-center rounded-lg border border-border bg-accent/40 transition hover:bg-accent disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function Row({
  row,
}: {
  row: {
    originalUrl: string;
    shortUrl: string;
    createdAt?: string | null;
    expiryAt?: string | null;
    clickCount?: number | null;
  };
}) {
  const [copied, setCopied] = useState(false);
  const href = row.shortUrl;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(href);
      setCopied(true);
      toast.success("Copied");
      setTimeout(() => setCopied(false), 1200);
    } catch {
      toast.error("Couldn't copy");
    }
  };

  return (
    <tr className="border-t border-border/50 transition hover:bg-accent/30">
      <td className="px-4 py-3">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-primary hover:underline"
        >
          {shortLabel(href)}
        </a>
      </td>

      <td className="max-w-[280px] px-4 py-3">
        <div className="truncate text-muted-foreground" title={row.originalUrl}>
          {row.originalUrl}
        </div>
      </td>

      <td className="px-4 py-3 text-right tabular-nums">
        {row.clickCount ?? 0}
      </td>

      <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
        {formatDateTime(row.createdAt)}
      </td>

      <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
        {formatDateTime(row.expiryAt)}
      </td>

      <td className="px-4 py-3">
        <div className="flex justify-end gap-1">
          <button
            onClick={copy}
            aria-label="Copy short URL"
            className="grid h-7 w-7 place-items-center rounded-lg border border-border bg-accent/30 hover:bg-accent"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>

          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open short URL"
            className="grid h-7 w-7 place-items-center rounded-lg border border-border bg-accent/30 hover:bg-accent"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </td>
    </tr>
  );
}

function shortLabel(href: string) {
  try {
    const u = new URL(href);
    return `${u.host}${u.pathname}`.replace(/\/$/, "");
  } catch {
    return href;
  }
}

function SkeletonRows() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <tr key={i} className="border-t border-border/50">
          {Array.from({ length: 6 }).map((__, j) => (
            <td key={j} className="px-4 py-3">
              <div className="h-3 w-full max-w-[160px] animate-pulse rounded bg-muted" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}