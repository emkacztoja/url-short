import { z } from 'zod';

export const shortenRequestSchema = z.object({
  originalUrl: z.string().url(),
  customAlias: z.string().regex(/^[a-zA-Z0-9_-]+$/).optional(),
});

export type ShortenRequest = z.infer<typeof shortenRequestSchema>;

