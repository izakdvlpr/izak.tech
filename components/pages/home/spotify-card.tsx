import { Disc3 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import type { Spotify } from '@/lib/lanyard'
import { formatTime } from '@/lib/utils'

interface SpotifyCardProps {
  spotify: Spotify
}

export function SpotifyCard({ spotify }: SpotifyCardProps) {
  const timeFormated = formatTime(
    spotify.timestamps.end - spotify.timestamps.start,
  )

  return (
    <div className="h-[150px] p-4 flex flex-col gap-2 rounded-md bg-primary">
      <div className="flex items-center gap-2">
        <h1 className="text-md font-medium">Listening to music</h1>

        <Disc3 size={18} />
      </div>

      <div className="flex gap-4">
        <Image
          src={spotify.album_art_url}
          alt={spotify.album}
          title={spotify.album}
          width={64}
          height={64}
          className="w-16 h-16 rounded-md"
        />

        <div className="flex flex-col truncate">
          <Link
            href={`https://open.spotify.com/track/${spotify.track_id}`}
            title={spotify.song}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-bold text-ellipsis overflow-hidden hover:underline hover:cursor-pointer"
          >
            {spotify.song}
          </Link>

          <p
            title={spotify.album}
            className="text-sm text-ellipsis overflow-hidden"
          >
            {' '}
            {spotify.album}
          </p>
          <p
            title={spotify.artist}
            className="text-sm text-ellipsis overflow-hidden"
          >
            {spotify.artist}
          </p>
          <p className="text-sm">{timeFormated}</p>
        </div>
      </div>
    </div>
  )
}
