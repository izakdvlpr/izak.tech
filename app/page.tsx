import { SpotifyCard } from '@/components/pages/home/spotify-card'
import { VscodeCard } from '@/components/pages/home/vscode-card'
import { getUserById } from '@/lib/lanyard'
import { Hero } from '@/components/pages/home/hero'

export default async function Home() {
  const user = await getUserById('461273822360895491')
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
