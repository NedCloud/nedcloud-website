import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const team = await prisma.teamMember.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(team)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    )
  }
}