import { notFound } from 'next/navigation'

import { getPostBySlug } from '@/lib/blog'
import { PostContent } from '@/components/pages/blog/post-content'
import { Badge } from '@/components/ui/badge'

interface PostDetailsPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function Post({ params }: PostDetailsPageProps) {
  const { slug } = await params

  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }
  
  const { readingTime, words, source, title, date, tags } = post

  return (
    <main className='mt-10 flex flex-col'>
      <div className='mb-6 flex flex-col gap-2'>
        <h1 className='text-4xl font-extrabold'>{title}</h1>
            
        <p className='text-sm text-gray-200'>
          {date} • {words} words • {readingTime}
        </p>
        
        <div className='flex gap-2'>
          {tags.map((tag) => (
            <Badge key={tag}>
              {tag}
            </Badge>
          ))}
        </div>
     </div>
      
      <PostContent source={source} />
    </main>
  )
}
