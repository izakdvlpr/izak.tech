import { type NextRequest, NextResponse } from 'next/server'

import { addViewToPost } from '@/lib/blog'
import { getIp } from '@/utils/get-ip'

export async function POST(request: NextRequest) {
  const ip = await getIp()

  const body = await request.json()

  const { slug } = body

  const isViewed = await addViewToPost({ slug, ip })

  if (!isViewed) {
    return NextResponse.json({ success: false })
  }

  return NextResponse.json({ success: true })
}
