'use client'

import Link from 'next/link'
import { Package, Pill, ShoppingCart, User } from 'lucide-react'
import { useAuth } from '@/app/contexts/AuthContext'
import { useCart } from '@/app/contexts/CartContext'
import { Button } from '@/components/ui/button'

export default function Header() {
  const { user, logout } = useAuth()
  const { cartItems, getCartItemsCount } = useCart()

  const cartCount = getCartItemsCount()

  return (
    <header className="bg-green-500 text-white px-4 py-3 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold flex items-center gap-2">
        <span>RxRush</span>
        <Pill className="h-6 w-6" />
        <Package className="h-6 w-6" />
      </Link>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm">Welcome, {user.name}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="text-white hover:text-green-500"
            >
              Logout
            </Button>
          </>
        ) : (
          <Link href="/login">
            <User className="w-6 h-6" />
          </Link>
        )}
        <Link href="/cart" className="relative">
          <ShoppingCart className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-green-500 rounded-full w-4 h-4 text-xs flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  )
}
