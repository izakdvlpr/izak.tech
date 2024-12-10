import { Activities } from '@/components/pages/home/activities'
import { Hero } from '@/components/pages/home/hero'

export default async function HomePage() {
  return (
    <main className="flex flex-col gap-4">
      <Hero />

      <Activities />
    </main>
  )
}
