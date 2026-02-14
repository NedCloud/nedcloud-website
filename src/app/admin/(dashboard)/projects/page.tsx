import { prisma } from '@/lib/prisma'
import { ProjectsManager } from '@/components/admin/ProjectsManager'

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      featured: true,
      published: true,
      technologies: true,
    },
  })

  return <ProjectsManager initialProjects={projects} />
}