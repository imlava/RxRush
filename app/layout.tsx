import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { AuthProvider } from '@/app/contexts/AuthContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import { Providers } from './providers'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
})

export const metadata: Metadata = {
  title: 'RxRush - 30-Minute Pharmacy Delivery',
  description: 'AI-powered pharmacy delivery platform with 30-minute delivery, LLM-driven FAQs, and voice IVR support',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Providers>
          <AuthProvider>
            <div className="min-h-screen flex flex-col bg-gray-50">
              <Header />
              <main className="flex-1 pt-16">
                <div className="container mx-auto px-4 py-8">
                  {children}
                </div>
              </main>
              <Footer />
              <ScrollToTop />
            </div>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  )
}
