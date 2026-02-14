import { prisma } from '@/lib/prisma'
import { User, Building, Star, Check, X, Trash2 } from 'lucide-react'

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Testimonials</h1>
        <a
          href="/admin/testimonials/new"
          className="btn-primary px-4 py-2 flex items-center gap-2"
        >
          Add Testimonial
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-dark-800/50 backdrop-blur-sm rounded-xl border border-dark-700/50 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="text-white font-medium">{testimonial.name}</div>
                  <div className="text-gray-500 text-sm">
                    {testimonial.role} {testimonial.company && `at ${testimonial.company}`}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {testimonial.approved ? (
                  <span className="flex items-center gap-1 px-2 py-1 bg-neon-green/10 text-neon-green rounded text-sm">
                    <Check size={14} />
                    Approved
                  </span>
                ) : (
                  <span className="flex items-center gap-1 px-2 py-1 bg-yellow-500/10 text-yellow-500 rounded text-sm">
                    <X size={14} />
                    Pending
                  </span>
                )}
              </div>
            </div>

            <p className="text-gray-300 text-sm mb-4 italic">
              &quot;{testimonial.content}&quot;
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-dark-700/50">
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <div className="flex items-center gap-2">
                {!testimonial.approved && (
                  <button className="p-2 text-neon-green hover:bg-dark-700 rounded-lg transition-colors">
                    <Check size={16} />
                  </button>
                )}
                <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-dark-700 rounded-lg transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No testimonials yet. Add your first testimonial to get started.
        </div>
      )}
    </div>
  )
}