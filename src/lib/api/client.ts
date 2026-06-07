export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
  }
}

const API_BASE_URL = ""; 
// IMPORTANT: same-origin (Cloudflare URL)

export async function apiFetch<T = unknown>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const url = `${API_BASE_URL}${path}`;

    const res = await fetch(url, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(init.headers ?? {}),
      },
      signal: controller.signal,
    });

    const text = await res.text();
    const json = text ? safeJson(text) : null;

    if (!res.ok) {
      const msg =
        (json && (json.errorMessage || json.message)) ||
        `Request failed (${res.status})`;

      throw new ApiError(msg, res.status);
    }

    return json as T;
  } catch (err) {
    if (err instanceof ApiError) throw err;

    if ((err as Error).name === "AbortError") {
      throw new ApiError("Request timed out");
    }

    throw new ApiError((err as Error).message || "Network error");
  } finally {
    clearTimeout(timeout);
  }
}

function safeJson(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}