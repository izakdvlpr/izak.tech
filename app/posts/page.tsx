import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { getAllPosts } from '@/lib/blog'

export default async function PostListPage() {
  const posts = await getAllPosts()

  return (
    <main className="mt-10 flex flex-col gap-2">
      {posts.map((post) => (
        <Link key={post.slug} href={`/posts/${post.slug}`}>
          <article className="flex">
            <Image
              src={post.thumbnail}
              alt={post.title}
              width={250}
              height={150}
              className="rounded-md"
            />

            <div className="ml-4 flex flex-col justify-center gap-2">
              <div className="flex items-center gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} className="pointer-events-none">
                    {tag}
                  </Badge>
                ))}
              </div>

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
