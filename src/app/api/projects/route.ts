import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: { name: true },
        },
      },
    })
    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const project = await prisma.project.create({
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        content: body.content,
        image: body.image,
        technologies: body.technologies || [],
        url: body.url,
        github: body.github,
        featured: body.featured || false,
        published: body.published || false,
        startDate: body.startDate ? new Date(body.startDate) : null,
        endDate: body.endDate ? new Date(body.endDate) : null,
        authorId: body.authorId,
        serviceId: body.serviceId,
      },
    })
    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}