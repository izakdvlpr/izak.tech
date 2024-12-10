import { Hero } from '@/components/pages/home/hero'
import { SpotifyCard } from '@/components/pages/home/spotify-card'
import { VscodeCard } from '@/components/pages/home/vscode-card'
import { environment } from '@/lib/environment'
import { getUserById } from '@/lib/lanyard'

export default async function HomePage() {
  const user = await getUserById(environment.DISCORD_ID)
  const vscode = user?.activities?.find((a) => a.name === 'Visual Studio Code')

  return (
    <main className="flex flex-col gap-4">
      <Hero />

      <div className="grid grid-cols-2 gap-4">
        {vscode && <VscodeCard vscode={vscode} />}
        {user?.spotify && <SpotifyCard spotify={user.spotify} />}
      </div>
    </main>
  )
}
