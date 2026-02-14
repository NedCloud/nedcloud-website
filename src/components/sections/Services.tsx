'use client'

import { motion } from 'framer-motion'
import { Brain, Server, Cloud, Code, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'

const services = [
  {
    icon: Brain,
    title: 'Agentic AI Solutions',
    description: 'Intelligent autonomous agents that automate complex workflows and decision-making processes.',
    href: '/services/agentic-ai',
    color: 'text-neon-purple',
  },
  {
    icon: Server,
    title: 'Infrastructure Architecture',
    description: 'Enterprise-grade infrastructure design with a focus on reliability, security, and performance.',
    href: '/services/infrastructure',
    color: 'text-neon-blue',
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    description: 'Modernize your deployment pipeline with cloud-native practices and CI/CD automation.',
    href: '/services/cloud',
    color: 'text-neon-cyan',
  },
  {
    icon: Code,
    title: 'Full-Stack Development',
    description: 'End-to-end application development with modern technologies and best practices.',
    href: '/services/fullstack',
    color: 'text-neon-green',
  },
]

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
            From infrastructure architecture to intelligent AI agents, I help businesses
            transform their technology landscape.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {services.map((service) => (
            <motion.div key={service.href} variants={itemVariants}>
              <Link href={service.href}>
                <Card className="h-full cursor-pointer group">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-dark-700 ${service.color}`}>
                      <service.icon className="w-6 h-6" />
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
          ))}
        </motion.div>
      </div>
    </section>
  )
}