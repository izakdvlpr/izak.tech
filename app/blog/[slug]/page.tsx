import type { Metadata } from 'next'
import { unstable_cache as cache, revalidateTag } from 'next/cache'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Badge } from '@/components/ui/badge'
import { MDXRender } from '@/components/ui/mdx/mdx-render'
import { addViewToPost, getPostBySlug, getSlugs } from '@/lib/blog'
import { PUBLIC_URL } from '@/utils'
import { getIp } from '@/utils/get-ip'

interface PostDetailsPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams(): { slug: string }[] {
  const slugs = getSlugs()

  return slugs.slice(0, 10).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PostDetailsPageProps): Promise<Metadata> {
  const { slug } = await params

  const post = await getPostBySlug(slug)

  if (!post) {
    return {}
  }

  const title = `${post.title} | Blog`
  const url = `${PUBLIC_URL}/blog/${slug}`

  return {
    title,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      url,
      title,
      type: 'article',
      section: 'Blog',
      description: post.description,
      tags: post.tags,
      publishedTime: new Date(post.date ?? 0).toISOString(),
      images: [
        {
          url: `${PUBLIC_URL}/og?title=${encodeURIComponent(title)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@izakdvlpr',
      description: post.description,
      title,
      site: '@izakdvlpr',
      images: [
        {
          url: `${PUBLIC_URL}/og?title=${encodeURIComponent(title)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

export default async function PostPage({ params }: PostDetailsPageProps) {
  const { slug } = await params

  const getCachedPost = cache(() => getPostBySlug(slug), [`posts:${slug}`], {
    revalidate: 60,
    tags: [`posts:${slug}`],
  })

  const post = await getCachedPost()

  if (!post) {
    notFound()
  }

  const ip = await getIp()

  const isViewed = await addViewToPost({ slug, ip })

  if (isViewed) {
    revalidateTag(`posts:${slug}`)
  }

  return (
    <main className="mt-10 flex flex-col">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold">{post.title}</h1>

        <p className="text-sm text-gray-200">
          {post.date} • {post.words} words • {post.readingTime} • {post.views}{' '}
          views
        </p>

        <div className="flex gap-2">
          {post.tags.map((tag) => (
            <Link href={`/blog/tags?${tag}`} key={tag}>
              <Badge>{tag}</Badge>
            </Link>
          ))}
        </div>
      </div>

      <MDXRender content={post.content} />
    </main>
  )
}
