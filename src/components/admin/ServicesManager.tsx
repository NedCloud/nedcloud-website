'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface Service {
  id: string
  title: string
  slug: string
  description: string
  published: boolean
  order: number
}

export function ServicesManager({ initialServices }: { initialServices: Service[] }) {
  const [services, setServices] = useState(initialServices)

  const togglePublished = async (id: string, published: boolean) => {
    setServices(services.map(s => s.id === id ? { ...s, published } : s))
  }

  const deleteService = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return
    setServices(services.filter(s => s.id !== id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Services</h1>
        <Button variant="primary" iconLeft={<Plus size={18} />}>
          Add Service
        </Button>
      </div>

      <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl border border-dark-700/50 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-700/50">
              <th className="text-left p-4 text-gray-400 font-medium">Title</th>
              <th className="text-left p-4 text-gray-400 font-medium">Slug</th>
              <th className="text-left p-4 text-gray-400 font-medium">Status</th>
              <th className="text-left p-4 text-gray-400 font-medium">Order</th>
              <th className="text-right p-4 text-gray-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="border-b border-dark-700/30 last:border-0">
                <td className="p-4">
                  <div className="text-white font-medium">{service.title}</div>
                  <div className="text-gray-500 text-sm truncate max-w-xs">
                    {service.description}
                  </div>
                </td>
                <td className="p-4 text-gray-400">{service.slug}</td>
                <td className="p-4">
                  <button
                    onClick={() => togglePublished(service.id, !service.published)}
                    className={`flex items-center gap-1 px-2 py-1 rounded text-sm ${
                      service.published
                        ? 'bg-neon-green/10 text-neon-green'
                        : 'bg-gray-600/10 text-gray-400'
                    }`}
                  >
                    {service.published ? <Eye size={14} /> : <EyeOff size={14} />}
                    {service.published ? 'Published' : 'Draft'}
                  </button>
                </td>
                <td className="p-4 text-gray-400">{service.order}</td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-dark-700 rounded-lg transition-colors">
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => deleteService(service.id)}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-dark-700 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {services.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No services found. Add your first service to get started.
          </div>
        )}
      </div>
    </div>
  )
}