import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      include: {
        author: {
          select: { name: true },
        },
      },
    })
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const post = await prisma.post.create({
      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        coverImage: body.coverImage,
        tags: body.tags || [],
        featured: body.featured || false,
        published: body.published || false,
        publishedAt: body.published ? new Date() : null,
        authorId: body.authorId,
      },
    })
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}