'use client'

import { useActionState } from 'react'
import { toast } from 'sonner'

import { sendEmailAction } from '@/actions/contact'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'

export default function ContactPage() {
  const [_error, submitAction, isPending] = useActionState(
    async (_previousState: any, formData: FormData) => {
      const { name, email, subject, message } = Object.fromEntries(
        formData,
      ) as Record<string, string>

      const isEmailSended = await sendEmailAction({
        name,
        email,
        subject,
        message,
      })

      if (!isEmailSended) {
        toast.error('An error occurred while sending the email')

        return
      }

      toast.success('Email sent successfully')
    },
    null,
  )

  return (
    <main className="mt-10 flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Contact</h1>

        <p className="text-lg text-gray-200">
          Have a question or just want to say hi? Feel free to get in touch.
        </p>
      </div>

      <form className="flex flex-col gap-6" action={submitAction}>
        <div className="grid grid-cols-2 gap-6">
          <Input name="name" placeholder="Your name" required />

          <Input
            type="email"
            name="email"
            placeholder="your@email.com"
            required
          />
        </div>

        <Input name="subject" placeholder="Subject" required />

        <Textarea
          name="message"
          placeholder="Message"
          className="min-h-[200px]"
          required
        />

        <Button type="submit" className="max-w-44" disabled={isPending}>
          {isPending ? <Spinner /> : 'Send'}
        </Button>
      </form>
    </main>
  )
}
