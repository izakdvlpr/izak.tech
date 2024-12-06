import { Redis } from '@upstash/redis'

import { environment } from './environment'

export const redis = new Redis({
  url: environment.UPSTASH_REDIS_URL,
  token: environment.UPSTASH_REDIS_TOKEN,
})