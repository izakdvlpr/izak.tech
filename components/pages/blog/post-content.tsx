'use client'

import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'

import { MDXCodeBlock } from '@/components/ui/mdx/mdx-code-block'
import {
  MDXHeading1,
  MDXHeading2,
  MDXHeading3,
} from '@/components/ui/mdx/mdx-heading'
import { MDXParagraph } from '@/components/ui/mdx/mdx-paragraph'

interface ClientProps {
  source: MDXRemoteSerializeResult
}

export function PostContent({ source }: ClientProps) {
  return (
    <div className="flex flex-col gap-6">
      <MDXRemote
        {...source}
        components={{
          p: MDXParagraph,
          h1: MDXHeading1,
          h2: MDXHeading2,
          h3: MDXHeading3,
          pre: MDXCodeBlock,
        }}
      />
    </div>
  )
}
