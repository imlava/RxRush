'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from '@/app/contexts/CartContext'
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, CheckCircle, Clock, TruckIcon, CreditCard } from 'lucide-react'
import { useApi } from '@/hooks/useApi'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Medicine {
  id: string
  name: string
  dosage: string
  price: number
  originalPrice: number
  discount: string
  description: string
}

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

interface MedicineDetailProps {
  id: string
}

export default function MedicineDetail({ id }: MedicineDetailProps) {
  const router = useRouter()
  const { addItem, items = [] } = useCart()
  const { data: medicine, loading, error } = useApi<Medicine>(`/api/medicines?id=${id}`)
  const [isAdding, setIsAdding] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  
  // Check if the medicine is already in the cart
  const isInCart = items?.some((item: CartItem) => item.id === id) || false
  const itemInCart = items?.find((item: CartItem) => item.id === id)

  const handleAddToCart = () => {
    if (medicine) {
      setIsAdding(true)
      try {
        addItem({
          id: medicine.id,
          name: medicine.name,
          price: medicine.price,
          quantity: 1
        })
        setAddedToCart(true)
      } catch (error) {
        console.error('Error adding to cart:', error)
      } finally {
        setIsAdding(false)
      }
    }
  }

  const navigateToCart = () => {
    router.push('/cart')
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-10 w-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Alert className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error.message || 'Failed to load medicine details. Please try again.'}
        </AlertDescription>
      </Alert>
    )
  }

  if (!medicine) {
    return null
  }

  return (
    <>
      {addedToCart && (
        <Alert className="mb-4 bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertTitle>Added to Cart</AlertTitle>
          <AlertDescription>
            {medicine.name} has been added to your cart.
          </AlertDescription>
        </Alert>
      )}
      
      <Card className="mb-4 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{medicine.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-gray-600">{medicine.dosage}</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">₹{medicine.price}</span>
              <span className="text-gray-500 line-through">₹{medicine.originalPrice}</span>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">{medicine.discount}</span>
            </div>
            <p className="text-sm text-gray-700 mt-4">{medicine.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Delivery in 30 minutes</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <TruckIcon className="h-4 w-4" />
              <span>Free delivery</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CreditCard className="h-4 w-4" />
              <span>Secure payment</span>
            </div>
          </div>

          <div className="flex gap-4">
            {isInCart ? (
              <Button 
                className="w-full" 
                onClick={navigateToCart}
              >
                View in Cart ({itemInCart?.quantity || 0})
              </Button>
            ) : (
              <Button 
                className="w-full" 
                onClick={handleAddToCart}
                disabled={isAdding}
              >
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
