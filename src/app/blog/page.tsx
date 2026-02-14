import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Blog | Nedcloud Solutions',
  description: 'Articles and insights on AI, infrastructure, and development.',
}

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="py-24 mesh-background">
          <div className="container-custom section-padding">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-neon-purple text-sm font-medium uppercase tracking-wider">
                Blog
              </span>
              <h1 className="heading-xl text-white mt-4 mb-6">
                Articles & Insights
              </h1>
              <p className="text-gray-400 text-lg mb-12">
                Thoughts on Agentic AI, infrastructure, and the future of technology.
              </p>
              
              <div className="glass-card p-12 text-center">
                <p className="text-gray-400">
                  Blog posts coming soon. Check back for articles on AI agents, 
                  infrastructure best practices, and development tutorials.
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