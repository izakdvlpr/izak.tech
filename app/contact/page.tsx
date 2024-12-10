import type { Metadata } from 'next'

import { Form } from '@/components/pages/contact/form'

export const metadata: Metadata = {
  title: 'Isaque Lima » Contact',
}

export default function ContactPage() {
  return (
    <main className="mt-10 flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Contact</h1>

        <p className="text-lg text-gray-200">
          Have a question or just want to say hi? Feel free to get in touch.
        </p>
      </div>

      <Form />
    </main>
  )
}
