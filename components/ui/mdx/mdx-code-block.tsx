import type { HTMLAttributes, PropsWithChildren } from 'react'

import { Button } from '../button'

type MDXCodeBlockProps = PropsWithChildren<HTMLAttributes<HTMLPreElement>>

export function MDXCodeBlock(props: MDXCodeBlockProps) {
  const preProps = (props.children as any)?.props
  const language = preProps?.className?.replace('language-', '')?.toUpperCase()

  return (
    <div className="p-4 flex flex-col overflow-x-auto rounded-md bg-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-semibold text-primary">{language}</span>

        <Button size="sm" className="h-6 text-xs">
          Copy
        </Button>
      </div>

      <pre className="font-mono" {...props} />
    </div>
  )
}
