import fs from 'node:fs'
import dayjs from 'dayjs'
import fg from 'fast-glob'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import readingTime from 'reading-time'

interface SourceFormatter {
  title: string
  description: string
  date: string
  tags: string[]
  thumbnail: string
}

interface Post {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  thumbnail: string
  readingTime: string
  words: number
  source: MDXRemoteSerializeResult
}

export async function getAllPosts(): Promise<Post[]> {
  const files = fg.sync('posts/**/*.mdx')

  const posts = await Promise.all(
    files
      .map(async (filePath) => {
        const slug = filePath.split('/').slice(-1)[0].replace('.mdx', '')
        const post = await getPostBySlug(slug)

        return post as Post
      })
      .filter(Boolean),
  )

  return posts
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const content = await fs.promises.readFile(`posts/${slug}.mdx`, 'utf-8')

    const times = readingTime(content)

    const source = await serialize(content, { parseFrontmatter: true })

    const { title, description, date, tags, thumbnail } =
      source.frontmatter as unknown as SourceFormatter

    return {
      slug,
      title,
      description,
      date: dayjs(date).format('MMMM D, YYYY'),
      tags,
      thumbnail,
      readingTime: times.text,
      words: times.words,
      source,
    }
  } catch {
    return null
  }
}
