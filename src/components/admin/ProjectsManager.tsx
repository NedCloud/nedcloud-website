'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, Eye, EyeOff, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface Project {
  id: string
  title: string
  slug: string
  description: string
  featured: boolean
  published: boolean
  technologies: string[]
}

export function ProjectsManager({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState(initialProjects)

  const togglePublished = (id: string, published: boolean) => {
    setProjects(projects.map(p => p.id === id ? { ...p, published } : p))
  }

  const deleteProject = (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return
    setProjects(projects.filter(p => p.id !== id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Projects</h1>
        <Button variant="primary" iconLeft={<Plus size={18} />}>
          Add Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-dark-800/50 backdrop-blur-sm rounded-xl border border-dark-700/50 overflow-hidden"
          >
            <div className="aspect-video bg-dark-700 flex items-center justify-center">
              <span className="text-gray-500 text-sm">Project Image</span>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-medium">{project.title}</h3>
                <div className="flex items-center gap-2">
                  {project.featured && (
                    <span className="text-xs px-2 py-1 bg-neon-purple/10 text-neon-purple rounded">
                      Featured
                    </span>
                  )}
                  <button
                    onClick={() => togglePublished(project.id, !project.published)}
                    className={`p-1 rounded ${
                      project.published ? 'text-neon-green' : 'text-gray-500'
                    }`}
                  >
                    {project.published ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1 mb-4">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-0.5 bg-dark-700 text-gray-400 rounded"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="text-xs px-2 py-0.5 bg-dark-700 text-gray-500 rounded">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-dark-700/50">
                <a
                  href={`/projects/${project.slug}`}
                  target="_blank"
                  className="text-gray-400 hover:text-neon-blue transition-colors"
                >
                  <ExternalLink size={16} />
                </a>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-dark-700 rounded-lg transition-colors">
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-dark-700 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No projects found. Add your first project to get started.
        </div>
      )}
    </div>
  )
}