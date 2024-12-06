import Link from 'next/link'
import { unstable_cache as cache } from 'next/cache'
import { notFound } from 'next/navigation'

import { Badge } from '@/components/ui/badge'
import { addViewToPost, getAllPosts, getPostBySlug } from '@/lib/blog'
import { getIp } from '@/utils/get-ip'
import { MDXRender } from '@/components/ui/mdx/mdx-render'

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
  
  const getCachedPost = cache(
    () => getPostBySlug(slug),
    [`posts:${slug}`],
    { revalidate: 60 }
  )

  const post = await getCachedPost()

  if (!post) {
    notFound()
  }
  
  const ip = await getIp()
  
  await addViewToPost({ slug, ip })

  return (
    <main className="mt-10 flex flex-col">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold">{post.title}</h1>

        <p className="text-sm text-gray-200">
          {post.date} • {post.words} words • {post.readingTime} • {post.views} views
        </p>

        <div className="flex gap-2">
          {post.tags.map((tag) => (
            <Link href={`/tags/${tag}`} key={tag}>
              <Badge>{tag}</Badge>
            </Link>
          ))}
        </div>
      </div>

      <MDXRender content={post.content} />
    </main>
  )
}
