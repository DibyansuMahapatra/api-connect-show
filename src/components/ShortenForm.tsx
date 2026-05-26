import { useEffect, useState } from "react";
import { z } from "zod";
import { Loader2, Wand2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createShortUrl, checkAlias } from "@/lib/api/urlShortener";
import type { UrlShortenerModel } from "@/lib/api/types";

const urlSchema = z
  .string()
  .trim()
  .min(1, "Please enter a URL")
  .max(2048, "URL is too long")
  .url("Enter a valid URL (include https://)");

type Props = {
  onResult: (r: { data: UrlShortenerModel; isExisting: boolean }) => void;
};

export function ShortenForm({ onResult }: Props) {
  const [value, setValue] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [error, setError] = useState<string | null>(null);

  // 🔥 alias status tracking
  const [aliasStatus, setAliasStatus] = useState<
    "idle" | "checking" | "available" | "taken"
  >("idle");

  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: {
      originalUrl: string;
      customAlias?: string;
    }) => createShortUrl(payload),

    onSuccess: (res) => {
      if (!res.data) {
        toast.error(res.errorMessage || res.message || "Something went wrong");
        return;
      }

      const msg = (res.message || "").toLowerCase();
      const isExisting =
        msg.includes("exist") || msg.includes("already") || msg.includes("found");

      onResult({ data: res.data, isExisting });

      qc.invalidateQueries({ queryKey: ["urls"] });

      toast.success(
        isExisting ? "Existing short link returned" : "Short link created"
      );
    },

    onError: (err: Error) => toast.error(err.message),
  });

  // 🔥 LIVE ALIAS CHECK (safe + race-condition protected)
  useEffect(() => {
    if (!customAlias.trim()) {
      setAliasStatus("idle");
      return;
    }

    if (customAlias.length > 10) {
      setAliasStatus("taken");
      return;
    }

    let cancelled = false;

    const timeout = setTimeout(async () => {
      try {
        setAliasStatus("checking");

        const alias = customAlias.trim();
        const exists = await checkAlias(alias);

        // prevent stale responses
        if (cancelled) return;

        setAliasStatus(exists ? "taken" : "available");
      } catch (err) {
        console.error("Alias check failed:", err);

        if (cancelled) return;

        setAliasStatus("idle");
        toast.error("Failed to check alias availability");
      }
    }, 400);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [customAlias]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = urlSchema.safeParse(value);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    // block if alias is taken
    if (aliasStatus === "taken") {
      setError("Custom alias is already taken");
      return;
    }

    // basic alias validation
    if (customAlias.length > 10) {
      setError("Alias must be 10 characters or less");
      return;
    }

    if (customAlias && !/^[a-zA-Z0-9_-]*$/.test(customAlias)) {
      setError("Only letters, numbers, _ and - allowed in alias");
      return;
    }

    setError(null);

    mutation.mutate({
      originalUrl: parsed.data,
      customAlias: customAlias.trim() || undefined,
    });
  };

  return (
    <form onSubmit={submit} className="glass rounded-2xl p-3 sm:p-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        {/* URL input */}
        <input
          type="url"
          inputMode="url"
          placeholder="https://example.com/your-very-long-link"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 rounded-xl bg-transparent px-4 py-3 text-base outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40"
          aria-invalid={!!error}
          aria-label="Long URL"
        />

        {/* Submit button */}
        <button
          type="submit"
          disabled={mutation.isPending || aliasStatus === "taken"}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
        >
          {mutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="h-4 w-4" />
          )}
          Shorten
        </button>
      </div>

      {/* Custom Alias Input */}
      <div className="mt-2">
        <input
          type="text"
          placeholder="Custom alias (optional, max 10 chars)"
          value={customAlias}
          maxLength={10}
          onChange={(e) => setCustomAlias(e.target.value)}
          className="w-full rounded-xl bg-transparent px-4 py-3 text-base outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40"
        />

        {/* LIVE STATUS INDICATOR */}
        {customAlias && (
          <p
            className={`mt-1 px-2 text-sm ${
              aliasStatus === "checking"
                ? "text-yellow-400"
                : aliasStatus === "available"
                ? "text-green-500"
                : aliasStatus === "taken"
                ? "text-red-500"
                : "text-muted-foreground"
            }`}
          >
            {aliasStatus === "checking" && "Checking availability..."}
            {aliasStatus === "available" && "Alias is available"}
            {aliasStatus === "taken" && "Alias is already taken"}
          </p>
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="mt-2 px-2 text-sm text-destructive">{error}</p>
      )}
    </form>
  );
}