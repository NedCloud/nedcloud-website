import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Projects as ProjectsSection } from '@/components/sections/Projects'

export const metadata: Metadata = {
  title: 'Projects | Nedcloud Solutions',
  description: 'Portfolio of infrastructure, AI, and development projects.',
}

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="py-24 mesh-background">
          <div className="container-custom section-padding">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-neon-cyan text-sm font-medium uppercase tracking-wider">
                Portfolio
              </span>
              <h1 className="heading-xl text-white mt-4 mb-6">
                Featured Projects
              </h1>
              <p className="text-gray-400 text-lg">
                A selection of projects showcasing expertise in AI, infrastructure, and development.
              </p>
            </div>
          </div>
        </section>
        <ProjectsSection />
      </main>
      <Footer />
    </>
  )
}