import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Badge } from '@/components/ui/badge'
import { MDXCodeBlock } from '@/components/ui/mdx/mdx-code-block'
import {
  MDXHeading1,
  MDXHeading2,
  MDXHeading3,
} from '@/components/ui/mdx/mdx-heading'
import { MDXParagraph } from '@/components/ui/mdx/mdx-paragraph'
import { getAllPosts, getPostBySlug } from '@/lib/blog'

interface PostDetailsPageProps {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = async () => {
  const posts = await getAllPosts()

  return posts.slice(0, 10).map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: PostDetailsPageProps) {
  const { slug } = await params

  const post = await getPostBySlug(slug)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
  }
}

export default async function PostPage({ params }: PostDetailsPageProps) {
  const { slug } = await params

  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const { readingTime, words, content, title, date, tags } = post

  return (
    <main className="mt-10 flex flex-col">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold">{title}</h1>

        <p className="text-sm text-gray-200">
          {date} • {words} words • {readingTime}
        </p>

        <div className="flex gap-2">
          {tags.map((tag) => (
            <Link href={`/tags/${tag}`} key={tag}>
              <Badge>{tag}</Badge>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <MDXRemote
          source={content}
          components={{
            p: MDXParagraph,
            h1: MDXHeading1,
            h2: MDXHeading2,
            h3: MDXHeading3,
            pre: MDXCodeBlock,
          }}
        />
      </div>
    </main>
  )
}
