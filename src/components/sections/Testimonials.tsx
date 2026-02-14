'use client'

import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Dennis Wals',
    role: 'IT Infrastructure Lead',
    company: 'Enterprise Client',
    content: 'Michel van Kessel is one of the best, if not the best Cisco ACI designer and troubleshooter in the Netherlands and played an integral part in successfully migrating our datacenters.',
    rating: 5,
  },
  {
    name: 'LinkedIn User',
    role: 'Colleague',
    company: 'Technology Partner',
    content: 'Michel is one of the best professionals I\'ve worked with. Commitment, enthusiastic, self-learner, cooperation, disposal to help other people are just a few qualities of this great professional.',
    rating: 5,
  },
]

export const Testimonials = () => {
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
          <span className="text-neon-purple text-sm font-medium uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="heading-lg text-white mt-4 mb-6">
            What Clients Say
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Trusted by organizations across industries for infrastructure and AI solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-dark-700/50"
            >
              <Quote className="w-8 h-8 text-neon-blue/30 mb-4" />
              <p className="text-gray-300 mb-6 italic">
                &quot;{testimonial.content}&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
              <div className="flex gap-1 mt-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}