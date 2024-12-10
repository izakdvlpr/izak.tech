import type { Activity } from '@/lib/lanyard'
import { formatTime } from '@/utils'
import { Code } from 'lucide-react'
import Image from 'next/image'

interface VscodeCardProps {
  vscode: Activity
}

function getAssetUrl(url: string) {
  return url.match(/https\/.*$/)?.[0].replace('https/', 'https://') as string
}

export function VscodeCard({ vscode }: VscodeCardProps) {
  const largeImage = getAssetUrl(vscode.assets.large_image)
  const smallImage = getAssetUrl(vscode.assets.small_image)

  const timeForamted = formatTime(Date.now() - vscode.timestamps.start)

  return (
    <div className="h-[150px] p-4 flex flex-col gap-2 rounded-md bg-primary">
      <div className="flex items-center gap-2">
        <h1 className="text-md font-medium">Programming</h1>

        <Code size={18} />
      </div>

      <div className="flex gap-4">
        <div className="w-16 h-16 relative">
          <Image
            src={largeImage}
            alt={vscode.assets.large_text ?? 'Visual Studio Code'}
            title={vscode.assets.large_text}
            width={64}
            height={64}
            className="w-16 h-16 rounded-md flex-shrink"
          />

          <Image
            src={smallImage}
            alt={vscode.assets.small_text ?? 'Visual Studio Code'}
            title={vscode.assets.small_text}
            width={64}
            height={64}
            className="absolute bottom-[-5px] right-[-5px] w-6 h-6 rounded-full"
          />
        </div>

        <div className="max-w-[300px] flex flex-col truncate">
          <h1 className="text-lg font-bold">Visual Studio Code</h1>
          <p className="text-sm text-ellipsis overflow-hidden">
            {vscode.details}
          </p>
          <p className="text-sm text-ellipsis overflow-hidden">
            {vscode.state}
          </p>
          <p className="text-sm">{timeForamted}</p>
        </div>
      </div>
    </div>
  )
}
