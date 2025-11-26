import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  ORIGIN_FRONTEND: z.string().url(),
  PORT: z.string().default('4000'),
  ADMIN_API_KEY: z.string().min(8).optional(),
});

export const env = envSchema.parse(process.env);
