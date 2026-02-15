import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { SettingsManager } from '@/components/admin/SettingsManager'
import { redirect } from 'next/navigation'

export default async function AdminSettingsPage() {
  const session = await auth()
  
  if (!session?.user?.email) {
    redirect('/admin/login')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { name: true, email: true },
  })

  if (!user) {
    redirect('/admin/login')
  }

  return <SettingsManager initialUser={user} />
}