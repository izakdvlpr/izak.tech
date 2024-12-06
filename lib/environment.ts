import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const environment = createEnv({
  server: {
    RESEND_TOKEN: z.string(),
    UPSTASH_REDIS_URL: z.string(),
    UPSTASH_REDIS_TOKEN: z.string(),
  },
  runtimeEnv: {
    RESEND_TOKEN: process.env.RESEND_TOKEN,
    UPSTASH_REDIS_URL: process.env.UPSTASH_REDIS_URL,
    UPSTASH_REDIS_TOKEN: process.env.UPSTASH_REDIS_TOKEN,
  },
})
