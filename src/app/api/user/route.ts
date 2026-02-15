import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(request: Request) {
  const session = await auth()
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { name } = body

    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: { name },
      select: { id: true, name: true, email: true },
    })

    return NextResponse.json(user)
  } catch {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}