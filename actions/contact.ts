'use server'

import { EmailTemplate } from '@/components/pages/contact/email-template'
import { resend } from '@/lib/resend'
import { redis } from '@/lib/upstash'
import { getIp } from '@/utils/get-ip'

interface SendEmailActionData {
  name: string
  email: string
  subject: string
  message: string
}

const MAX_SEND_EMAILS = 3
const WINDOWS_MS = 60 * 60 * 1000 // 1 hour

export async function sendEmailAction(data: SendEmailActionData) {
  const { name, email, subject, message } = data

  const ip = await getIp()
  
  const rateLimitKey = `email:ratelimit:${ip}`
  
  const currentRateLimit = await redis.incr(rateLimitKey)

  if (currentRateLimit === 1) {
    await redis.expire(rateLimitKey, Math.floor(WINDOWS_MS / 1000))
  }

  if (currentRateLimit > MAX_SEND_EMAILS) {
    return false
  }

  const { error } = await resend.emails.send({
    from: 'contact@izak.tech',
    to: 'izakdvlpr@gmail.com',
    subject,
    react: EmailTemplate({ name, email, subject, message }),
  })

  if (error) {
    return false
  }

  return true
}
