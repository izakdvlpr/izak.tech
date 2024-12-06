'use server'

import { headers as allHeaders } from 'next/headers'

import { EmailTemplate } from '@/components/pages/contact/email-template'
import { resend } from '@/lib/resend'
import { redis } from '@/lib/upstash'

interface SendEmailActionData {
  name: string
  email: string
  subject: string
  message: string
}

const MAX_SEND_EMAILS = 1
const WINDOWS_MS = 60 * 60 * 1000 // 1 hour
const RATELIMIT_KEY = 'email:ratelimit'

export async function sendEmailAction(data: SendEmailActionData) {
  const { name, email, subject, message } = data

  const headers = await allHeaders()
  const ip = headers.get('x-real-ip') ?? '127.0.0.1'
  
  const currentRateLimit = await redis.incr(`${RATELIMIT_KEY}:${ip}`)

  if (currentRateLimit === 1) {
    await redis.expire(`${RATELIMIT_KEY}:${ip}`, Math.floor(WINDOWS_MS / 1000))
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
    console.log(error)

    return false
  }

  return true
}
