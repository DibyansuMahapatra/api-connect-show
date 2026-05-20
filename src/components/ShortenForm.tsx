import { useState } from "react";
import { z } from "zod";
import { Loader2, Wand2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createShortUrl } from "@/lib/api/urlShortener";
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
  const [error, setError] = useState<string | null>(null);
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: (url: string) => createShortUrl(url),
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
      toast.success(isExisting ? "Existing short link returned" : "Short link created");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = urlSchema.safeParse(value);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setError(null);
    mutation.mutate(parsed.data);
  };

  return (
    <form onSubmit={submit} className="glass rounded-2xl p-3 sm:p-4">
      <div className="flex flex-col gap-2 sm:flex-row">
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
        <button
          type="submit"
          disabled={mutation.isPending}
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
      {error && (
        <p className="mt-2 px-2 text-sm text-destructive">{error}</p>
      )}
    </form>
  );
}
