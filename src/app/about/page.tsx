import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'About | Nedcloud Solutions',
  description: 'Learn about Michel van Kessel and Nedcloud Solutions - 25+ years of IT expertise.',
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="py-24 mesh-background">
          <div className="container-custom section-padding">
            <div className="max-w-4xl mx-auto">
              <span className="text-neon-blue text-sm font-medium uppercase tracking-wider">
                About
              </span>
              <h1 className="heading-xl text-white mt-4 mb-8">
                Michel van Kessel
              </h1>
              
              <div className="prose prose-invert max-w-none">
                <div className="glass-card p-8 mb-8">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    In IT since 2000, with 25+ years across data centers, cloud, storage, servers, 
                    and networking. CCIE Data Center certified, Cisco Champion for 10 consecutive 
                    years (2015-2025), now pioneering Agentic AI solutions.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">Experience</h2>
                <div className="space-y-4">
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-neon-blue">Routz</h3>
                    <p className="text-gray-400">IT Consulting & Infrastructure</p>
                    <p className="text-gray-300 mt-2">
                      Consulting for enterprise clients across various industries, specializing 
                      in data center infrastructure, cloud migrations, and network architecture.
                    </p>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">Certifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'CCIE Data Center #44197',
                    'Cisco Certified DevNet Associate',
                    'CompTIA Security+',
                    'Microsoft Azure Fundamentals',
                    'TOGAF Certified',
                    'Cisco Champion 2015-2025',
                  ].map((cert) => (
                    <div key={cert} className="glass-card p-4">
                      <span className="text-gray-200">{cert}</span>
                    </div>
                  ))}
                </div>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">Current Focus</h2>
                <p className="text-gray-300">
                  Now expanding into Agentic AI and full-stack development, combining decades 
                  of infrastructure expertise with modern AI capabilities to build intelligent 
                  automation solutions.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}