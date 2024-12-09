import type { Metadata } from 'next'
import { unstable_cache as cache } from 'next/cache'
import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { getAllPosts, getTags } from '@/lib/blog'

const getCachedPosts = cache(() => getAllPosts(), ['posts'], { revalidate: 60, tags: ['posts'] })

export const metadata: Metadata = {
  title: 'Isaque Lima | Blog',
}

export default async function PostListPage() {
  const posts = await getCachedPosts()
  const tags = getTags(posts)

  return (
    <main className="mt-10 flex flex-col gap-6">
      <div className='flex flex-col gap-2'>
        <h1 className="text-3xl font-bold">Blog</h1>
        
        <div className='flex items-center gap-2'>
          {tags.map((tag) => (
            <Badge key={tag} className="pointer-events-none">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {posts.map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}`}>
          <article className="flex">
            <Image
              src={post.thumbnail}
              alt={post.title}
              width={250}
              height={150}
              className="rounded-md"
            />

            <div className="ml-4 flex flex-col justify-center gap-2">
              <h2 className="text-3xl font-bold">{post.title}</h2>

              <p className="text-sm text-gray-200">
                {post.date} • {post.words} words • {post.readingTime}
              </p>
            </div>
          </article>
        </Link>
      ))}
    </main>
  )
}
