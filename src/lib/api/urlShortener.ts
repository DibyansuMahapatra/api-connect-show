import { apiFetch, API_BASE_URL } from "./client";
import {
  GenericResponseListSchema,
  GenericResponseSchema,
  UrlShortenerModelSchema,
  type GenericResponse,
  type GenericResponseList,
  type UrlShortenerModel,
} from "./types";

const BASE = "/compactURL";

export async function createShortUrl(
  originalUrl: string
): Promise<GenericResponse<UrlShortenerModel>> {
  const raw = await apiFetch(`${BASE}/generate`, {
    method: "POST",
    body: JSON.stringify({ originalUrl }),
  });
  return GenericResponseSchema(UrlShortenerModelSchema).parse(raw);
}

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