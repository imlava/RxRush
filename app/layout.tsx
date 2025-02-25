import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { AuthProvider } from '@/app/contexts/AuthContext'
import Header from '@/components/Header'
import ScrollToTop from '@/components/ScrollToTop'
import { Providers } from './providers'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
})

export const metadata: Metadata = {
  title: 'RxRush - Online Pharmacy',
  description: 'Your trusted online pharmacy for all your medical needs',
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
            <div className="min-h-screen bg-gray-100 pt-16">
              <Header />
              <main className="container mx-auto px-4 py-8">
                {children}
              </main>
              <ScrollToTop />
            </div>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  )
}
