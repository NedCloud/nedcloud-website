import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Contact as ContactSection } from '@/components/sections/Contact'

export const metadata: Metadata = {
  title: 'Contact | Nedcloud Solutions',
  description: 'Get in touch to discuss your project.',
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}