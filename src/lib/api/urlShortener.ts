import { apiFetch } from "./client";
import {
  GenericResponseListSchema,
  GenericResponseSchema,
  UrlShortenerModelSchema,
  type GenericResponse,
  type GenericResponseList,
  type UrlShortenerModel,
} from "./types";

const BASE = "/compactURL";

/**
 * Create short URL (supports optional custom alias)
 */
export async function createShortUrl(payload: {
  originalUrl: string;
  customAlias?: string;
}): Promise<GenericResponse<UrlShortenerModel>> {
  const raw = await apiFetch(`${BASE}/generate`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return GenericResponseSchema(UrlShortenerModelSchema).parse(raw);
}

/**
 * Fetch paginated URLs
 */
export async function fetchAllShortUrls(
  page = 1,
  size = 10
): Promise<GenericResponseList<UrlShortenerModel>> {
  const raw = await apiFetch(
    `${BASE}/fetchAll?page=${page}&size=${size}`,
    { method: "GET" }
  );

  return GenericResponseListSchema(UrlShortenerModelSchema).parse(raw);
}

/**
 * Check if custom alias is already taken
 * returns: true = taken, false = available
 */
export async function checkAlias(alias: string): Promise<boolean> {
  if (!alias || !alias.trim()) return false;

  const raw = await apiFetch(`${BASE}/check-alias/${alias}`, {
    method: "GET",
  }) as {
    data: boolean;
  };

  return raw.data;
}