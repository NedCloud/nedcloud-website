import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Services as ServicesSection } from '@/components/sections/Services'

export const metadata: Metadata = {
  title: 'Services | Nedcloud Solutions',
  description: 'Agentic AI, Infrastructure, Cloud, and Full-Stack Development services.',
}

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="py-24 mesh-background">
          <div className="container-custom section-padding">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-neon-blue text-sm font-medium uppercase tracking-wider">
                Services
              </span>
              <h1 className="heading-xl text-white mt-4 mb-6">
                What I Can Do For You
              </h1>
              <p className="text-gray-400 text-lg">
                From infrastructure architecture to intelligent AI agents, I help businesses
                transform their technology landscape with modern solutions.
              </p>
            </div>
          </div>
        </section>
        <ServicesSection />
      </main>
      <Footer />
    </>
  )
}