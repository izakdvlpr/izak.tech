'use client'

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote"

interface ClientProps {
  source: MDXRemoteSerializeResult
}

export function PostContent({ source }: ClientProps) {
  return (
    <MDXRemote {...source} />
  )
}