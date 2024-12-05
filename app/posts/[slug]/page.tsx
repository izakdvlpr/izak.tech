import { notFound } from 'next/navigation'

import { PostContent } from '@/components/pages/blog/post-content'
import { Badge } from '@/components/ui/badge'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import Link from 'next/link'

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

  const { readingTime, words, source, title, date, tags } = post

  return (
    <main className="mt-10 flex flex-col">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold">{title}</h1>

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

      <PostContent source={source} />
    </main>
  )
}
