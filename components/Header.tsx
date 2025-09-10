'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { 
  Home,
  Search,
  ShoppingCart,
  Menu,
  X,
  User,
  LogOut,
  Shield,
  Building2
} from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/app/contexts/CartContext'
import { Button } from '@/components/ui/button'

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Products', href: '/products', icon: Search },
  { name: 'Cart', href: '/cart', icon: ShoppingCart },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const pathname = usePathname()
  const { itemCount } = useCart()
  const { data: session, status } = useSession()

  const isActive = (path: string) => pathname === path

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  const getUserIcon = () => {
    if (session?.user?.role === 'admin') return <Shield className="h-4 w-4" />
    if (session?.user?.role === 'pharmacy') return <Building2 className="h-4 w-4" />
    return <User className="h-4 w-4" />
  }

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-green-600">RxRush</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium relative ${
                    isActive(item.href)
                      ? 'text-green-600'
                      : 'text-gray-600 hover:text-green-600'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                  {item.name === 'Cart' && itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Link>
              )
            })}

            {/* User Menu */}
            {status === 'loading' ? (
              <div className="h-8 w-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-green-600"
                >
                  {getUserIcon()}
                  <span>{session.user.name}</span>
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900">{session.user.name}</p>
                      <p className="text-xs text-gray-500">{session.user.email}</p>
                      <p className="text-xs text-green-600 capitalize">{session.user.role}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/account"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>Account</span>
                        </div>
                      </Link>
                      {(session.user.role === 'admin' || session.user.role === 'pharmacy') && (
                        <Link
                          href="/admin"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <div className="flex items-center space-x-2">
                            {getUserIcon()}
                            <span>Dashboard</span>
                          </div>
                        </Link>
                      )}
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <div className="flex items-center space-x-2">
                          <LogOut className="h-4 w-4" />
                          <span>Sign Out</span>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-green-600 font-medium"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-gray-600 hover:text-green-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-2 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium relative ${
                    isActive(item.href)
                      ? 'text-green-600 bg-green-50'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                  {item.name === 'Cart' && itemCount > 0 && (
                    <span className="absolute right-3 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Link>
              )
            })}
            
            {/* Mobile User Section */}
            {session ? (
              <div className="border-t pt-2 mt-2">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-gray-900">{session.user.name}</p>
                  <p className="text-xs text-gray-500">{session.user.email}</p>
                  <p className="text-xs text-green-600 capitalize">{session.user.role}</p>
                </div>
                <Link
                  href="/account"
                  className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  <span>Account</span>
                </Link>
                {(session.user.role === 'admin' || session.user.role === 'pharmacy') && (
                  <Link
                    href="/admin"
                    className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {getUserIcon()}
                    <span>Dashboard</span>
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-600 hover:text-green-600 hover:bg-green-50"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="border-t pt-2 mt-2 space-y-1">
                <Link
                  href="/login"
                  className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  <span>Sign In</span>
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
      
      {/* Click outside to close user menu */}
      {userMenuOpen && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setUserMenuOpen(false)}
        />
      )}
    </header>
  )
}
