import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { compare, hash } from 'bcryptjs'

export async function POST(request: Request) {
  const session = await auth()
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { currentPassword, newPassword } = body

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, password: true },
    })

    if (!user || !user.password) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const isValid = await compare(currentPassword, user.password)
    if (!isValid) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 })
    }

    const hashedPassword = await hash(newPassword, 12)
    
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to change password' }, { status: 500 })
  }
}