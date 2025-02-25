import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from '@/app/contexts/CartContext'
import { AuthProvider } from '@/app/contexts/AuthContext'
import Header from '@/components/Header'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
})

export const metadata = {
  title: 'Med - 15-minute medicine delivery',
  description: 'Get your medicines delivered in 15 minutes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen bg-gray-100">
              <Header />
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: '#fff',
                    color: '#333',
                  },
                  success: {
                    style: {
                      border: '1px solid #22c55e',
                      padding: '16px',
                    },
                  },
                  error: {
                    style: {
                      border: '1px solid #ef4444',
                      padding: '16px',
                    },
                  },
                }}
              />
              {children}
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
