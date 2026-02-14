import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { approved: true, featured: true },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(testimonials)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const testimonial = await prisma.testimonial.create({
      data: {
        name: body.name,
        role: body.role,
        company: body.company,
        content: body.content,
        avatar: body.avatar,
        rating: body.rating || 5,
        featured: body.featured || false,
        approved: body.approved || false,
      },
    })
    return NextResponse.json(testimonial, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    )
  }
}