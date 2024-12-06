import fs from 'node:fs'
import dayjs from 'dayjs'
import fg from 'fast-glob'
import matter from 'gray-matter'
import readingTime from 'reading-time'

import { redis } from './upstash'

interface Post {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  thumbnail: string
  readingTime: string
  words: number
  content: string
  views: number
}

function isSlug(slug: string): boolean {
  return /^[a-z0-9-]+$/.test(slug)
}

function getSlug(filePath: string) {
  return filePath.split('/').slice(-1)[0].replace('.mdx', '')
}

export async function getAllPosts(): Promise<Post[]> {
  const files = fg.sync('posts/**/*.mdx')

  const posts = await Promise.all(
    files.map(async (filePath) => {
      const slug = getSlug(filePath)
      const post = await getPostBySlug(slug)

      return post as Post
    }),
  )

  return posts
    .filter(Boolean)
    .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix())
}

export function getTags(posts: Post[]): string[] {
  const tags = posts.flatMap((post) => post.tags)

  return [...new Set(tags)]
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!isSlug(slug)) {
    return null
  }

  try {
    const source = await fs.promises.readFile(`posts/${slug}.mdx`, 'utf-8')

    const times = readingTime(source)

    const {
      data: { title, description, date, tags, thumbnail },
      content,
    } = matter(source)
    
    const views = await redis.get<number>(`post:views:${slug}`) ?? 0

    return {
      slug,
      title,
      description,
      date: dayjs(date).format('MMMM D, YYYY'),
      tags,
      thumbnail,
      readingTime: times.text,
      words: times.words,
      content,
      views,
    }
  } catch {
    return null
  }
}

const VIEW_EXPIRATION = 60 * 60 * 24 // 1 day

export async function addViewToPost({ slug, ip }: { slug: string; ip: string }) {
  const hasViewed = await redis.get(`post:views:${slug}:${ip}`)
  
  if (hasViewed) {
    return
  }
  
  await redis.set(`post:views:${slug}:${ip}`, true, {
    nx: true,
    ex: VIEW_EXPIRATION,
  })
  
  await redis.incr(`post:views:${slug}`)
}
