'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, Server, Cloud, Code, ArrowRight, Cpu } from 'lucide-react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'

interface Service {
  id: string
  title: string
  slug: string
  description: string
  icon: string | null
  order: number
}

const iconMap: Record<string, typeof Cpu> = {
  brain: Brain,
  server: Server,
  cloud: Cloud,
  code: Code,
}

const colorMap: Record<string, string> = {
  brain: 'text-neon-purple',
  server: 'text-neon-blue',
  cloud: 'text-neon-cyan',
  code: 'text-neon-green',
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export const Services = () => {
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setServices(data)
        }
      })
      .catch(() => {
        // Silently fail — section will just be empty
      })
  }, [])

  if (services.length === 0) {
    return null
  }

  return (
    <section className="py-24 bg-dark-950">
      <div className="container-custom section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-neon-blue text-sm font-medium uppercase tracking-wider">
            Services
          </span>
          <h2 className="heading-lg text-white mt-4 mb-6">
            What I Can Do For You
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Bridging 25 years of infrastructure expertise with Agentic AI capabilities.
            Designing platforms where AI agents become operational assets.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {services.map((service) => {
            const IconComponent = iconMap[service.icon || ''] || Cpu
            const color = colorMap[service.icon || ''] || 'text-neon-blue'

            return (
              <motion.div key={service.id} variants={itemVariants}>
                <Link href={`/services/${service.slug}`}>
                  <Card className="h-full cursor-pointer group">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg bg-dark-700 ${color}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-neon-blue transition-colors flex items-center gap-2">
                          {service.title}
                          <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
