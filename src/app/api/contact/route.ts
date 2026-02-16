import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { validate, contactSubmissionSchema } from '@/lib/validations'

export async function GET() {
  const session = await auth()
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const contacts = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(contacts)
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const validation = validate(contactSubmissionSchema, body)
    if (!validation.success) {
      return NextResponse.json({ error: 'Validation failed', details: validation.errors }, { status: 400 })
    }
    
    const contact = await prisma.contactSubmission.create({
      data: validation.data,
    })
    return NextResponse.json(contact, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: 'Failed to create contact submission' },
      { status: 500 }
    )
  }
}