import { z } from 'zod';

/**
 * Define your environment variables here.
 * This guarantees type safety and runtime validation across the entire app.
 */
const envSchema = z.object({
  // Server-side variables (Not exposed to the client)
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  
  // Client-side variables (Must start with NEXT_PUBLIC_)
  NEXT_PUBLIC_API_URL: z.string().url().default('http://localhost:3000/api'),
});

// Execute the validation
const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment variables:\n', _env.error.format());
  throw new Error('Environment variable validation failed. Please check your .env file.');
}

// Export the strictly typed, validated env variables
export const env = _env.data;
