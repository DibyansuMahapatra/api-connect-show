import { z } from "zod";

export const UrlShortenerModelSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  originalUrl: z.string(),
  shortUrl: z.string(),
  createdAt: z.string().optional().nullable(),
  expiryAt: z.string().optional().nullable(),
  clickCount: z.number().optional().nullable(),
});
export type UrlShortenerModel = z.infer<typeof UrlShortenerModelSchema>;

export const GenericResponseSchema = <T extends z.ZodTypeAny>(data: T) =>
  z.object({
    statusCode: z.number().optional(),
    status: z.string().optional(),
    data: data.nullable().optional(),
    errorMessage: z.string().nullable().optional(),
    message: z.string().nullable().optional(),
  });

export const GenericResponseListSchema = <T extends z.ZodTypeAny>(data: T) =>
  z.object({
    statusCode: z.number().optional(),
    status: z.string().optional(),
    data: z.array(data).nullable().optional(),
    errorMessage: z.string().nullable().optional(),
    message: z.string().nullable().optional(),
    totalElements: z.number().optional(),
    page: z.number().optional(),
    size: z.number().optional(),
  });

export type GenericResponse<T> = {
  statusCode?: number;
  status?: string;
  data?: T | null;
  errorMessage?: string | null;
  message?: string | null;
};

export type GenericResponseList<T> = GenericResponse<T[]> & {
  totalElements?: number;
  page?: number;
  size?: number;
};
