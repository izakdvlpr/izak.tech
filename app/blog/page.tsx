import Link from 'next/link'

import { getAllPosts } from '@/lib/blog'

export default async function PostListPage() {
  const posts = await getAllPosts()

  return (
    <main className="mt-10 flex flex-col gap-2">
      {posts.map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}`}>
          <article>
            <h2 className="text-2xl font-bold">{post.slug}</h2>
          </article>
        </Link>
      ))}
    </main>
  )
}
