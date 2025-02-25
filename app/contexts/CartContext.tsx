'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { CartItem } from '@/types/medicine'

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  itemCount: number
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error loading cart:', error)
      }
    }
    setIsInitialized(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('cart', JSON.stringify(items))
    }
  }, [items, isInitialized])

  const addItem = (newItem: CartItem) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === newItem.id)
      
      if (existingItem) {
        const updatedItems = currentItems.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        if (isInitialized) {
          toast.success(`Added another ${newItem.name} to cart`)
        }
        return updatedItems
      } else {
        if (isInitialized) {
          toast.success(`${newItem.name} added to cart`)
        }
        return [...currentItems, { ...newItem, quantity: 1 }]
      }
    })
  }

  const removeItem = (itemId: string) => {
    setItems(currentItems => {
      const itemToRemove = currentItems.find(item => item.id === itemId)
      if (itemToRemove && isInitialized) {
        toast.success(`${itemToRemove.name} removed from cart`)
      }
      return currentItems.filter(item => item.id !== itemId)
    })
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(itemId)
      return
    }

    setItems(currentItems => {
      const item = currentItems.find(i => i.id === itemId)
      if (!item) return currentItems

      const updatedItems = currentItems.map(i => 
        i.id === itemId ? { ...i, quantity } : i
      )

      if (isInitialized && quantity !== item.quantity) {
        toast.success(`Updated ${item.name} quantity`)
      }

      return updatedItems
    })
  }

  const clearCart = () => {
    setItems([])
    if (isInitialized) {
      toast.success('Cart cleared')
    }
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
