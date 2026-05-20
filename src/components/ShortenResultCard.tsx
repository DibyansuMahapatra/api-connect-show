import { Check, Copy, ExternalLink, Info } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { UrlShortenerModel } from "@/lib/api/types";
import { buildRedirectUrl } from "@/lib/api/urlShortener";

export function ShortenResultCard({
  data,
  isExisting,
}: {
  data: UrlShortenerModel;
  isExisting: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const href = buildRedirectUrl(data.shortUrl);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(href);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Couldn't copy");
    }
  };

  return (
    <div className="glass mt-4 animate-fade-in rounded-2xl p-5">
      {isExisting && (
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-accent/60 px-3 py-1 text-xs text-muted-foreground">
          <Info className="h-3.5 w-3.5" />
          This URL was already shortened — showing the existing link.
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="break-all font-mono text-lg text-primary hover:underline sm:text-xl"
        >
          {href}
        </a>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={copy}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-accent/40 px-3 py-2 text-sm transition hover:bg-accent"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy"}
          </button>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            <ExternalLink className="h-4 w-4" />
            Open
          </a>
        </div>
      </div>

      <p className="mt-3 truncate text-sm text-muted-foreground" title={data.originalUrl}>
        {data.originalUrl}
      </p>

      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
        {data.createdAt && <span>Created {formatDate(data.createdAt)}</span>}
        {data.expiryAt && <span>Expires {formatDate(data.expiryAt)}</span>}
        {typeof data.clickCount === "number" && (
          <span>{data.clickCount} clicks</span>
        )}
      </div>
    </div>
  );
}

function formatDate(s: string) {
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  return d.toLocaleString();
}
