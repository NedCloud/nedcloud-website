import { prisma } from '@/lib/prisma'
import { ServicesManager } from '@/components/admin/ServicesManager'

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { order: 'asc' },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      published: true,
      order: true,
    },
  })

  return <ServicesManager initialServices={services} />
}