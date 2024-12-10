import { Redis } from 'ioredis'

import { environment } from './environment'

export const redis = new Redis({
  host: environment.REDIS_HOST,
  port: environment.REDIS_PORT,
  password: environment.REDIS_PASSWORD,
})
