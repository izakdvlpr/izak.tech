import fs from 'node:fs'
import dayjs from 'dayjs'
import fg from 'fast-glob'
import matter from 'gray-matter'
import readingTime from 'reading-time'

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
    }
  } catch {
    return null
  }
}