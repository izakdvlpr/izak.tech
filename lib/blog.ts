import fs from 'node:fs'
import fg from 'fast-glob'
import readingTime from 'reading-time'
import { serialize } from "next-mdx-remote/serialize"
import dayjs from 'dayjs'

export async function getAllPosts() {
  const files = fg.sync('posts/**/*.mdx')

  const posts = await Promise.all(
    files.map(async (filePath) => {
      const content = await fs.promises.readFile(filePath, 'utf-8')

      return {
        slug: filePath.split('/').slice(-1)[0].replace('.mdx', ''),
        content,
      }
    }),
  )

  return posts
}

export async function getPostBySlug(slug: string) {
  try {
    const content = await fs.promises.readFile(`posts/${slug}.mdx`, 'utf-8')
    
    const times = readingTime(content);
    
    const source = await serialize(content, { parseFrontmatter: true })
    
    const { title, date, tags } = source.frontmatter as { title: string, date: string, tags: string[] }

    return {
      slug,
      title,
      date: dayjs(date).format('MMMM D, YYYY'),
      tags,
      readingTime: times.text,
      words: times.words,
      source,
    }
  } catch {
    return null
  }
}
