'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  dosage: string
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
  updateQuantity: (id: string, quantity: number) => void
  getCartItemsCount: () => number
  getTotalPrice: () => number
  isItemInCart: (id: string) => boolean
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  updateQuantity: () => {},
  getCartItemsCount: () => 0,
  getTotalPrice: () => 0,
  isItemInCart: () => false
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // Load cart from localStorage on component mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        setCartItems(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error)
      // If there's an error parsing the cart, reset it
      localStorage.removeItem('cart')
    } finally {
      setIsInitialized(true)
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('cart', JSON.stringify(cartItems))
      } catch (error) {
        console.error('Error saving cart to localStorage:', error)
      }
    }
  }, [cartItems, isInitialized])

  const addToCart = (item: CartItem) => {
    try {
      setCartItems(prevItems => {
        const existingItem = prevItems.find(cartItem => cartItem.id === item.id)
        if (existingItem) {
          return prevItems.map(cartItem =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + (item.quantity || 1) }
              : cartItem
          )
        }
        return [...prevItems, { ...item, quantity: item.quantity || 1 }]
      })
      toast.success(`${item.name} added to cart`)
    } catch (error) {
      console.error('Error adding item to cart:', error)
      toast.error('Could not add item to cart')
    }
  }

  const removeFromCart = (id: string) => {
    try {
      const itemToRemove = cartItems.find(item => item.id === id)
      setCartItems(prevItems => prevItems.filter(item => item.id !== id))
      if (itemToRemove) {
        toast.success(`${itemToRemove.name} removed from cart`)
      }
    } catch (error) {
      console.error('Error removing item from cart:', error)
      toast.error('Could not remove item from cart')
    }
  }

  const clearCart = () => {
    try {
      setCartItems([])
      localStorage.removeItem('cart')
      toast.success('Cart cleared')
    } catch (error) {
      console.error('Error clearing cart:', error)
      toast.error('Could not clear cart')
    }
  }

  const updateQuantity = (id: string, quantity: number) => {
    try {
      if (quantity <= 0) {
        removeFromCart(id)
        return
      }
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      )
    } catch (error) {
      console.error('Error updating quantity:', error)
      toast.error('Could not update quantity')
    }
  }

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const isItemInCart = (id: string) => {
    return cartItems.some(item => item.id === id)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        getCartItemsCount,
        getTotalPrice,
        isItemInCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
