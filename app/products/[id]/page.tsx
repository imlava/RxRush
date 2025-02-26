'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, ShoppingCart, Shield, Truck, Clock, Check } from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Medicine } from '@/types/medicine'
import { medicineService } from '@/services/medicineService'
import { useCart } from '@/app/contexts/CartContext'
import toast from 'react-hot-toast'

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [medicine, setMedicine] = useState<Medicine | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const { addItem, items } = useCart()

  useEffect(() => {
    loadMedicine()
  }, [params.id])

  const loadMedicine = async () => {
    try {
      const data = await medicineService.getById(params.id)
      if (data) {
        setMedicine(data)
      } else {
        toast.error('Medicine not found')
      }
    } catch (error) {
      toast.error('Failed to load medicine details')
      console.error('Error loading medicine:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddToCart = async () => {
    if (medicine) {
      setIsAddingToCart(true)
      try {
        addItem({
          id: medicine.id,
          name: medicine.name,
          price: medicine.price,
          quantity: 1,
          image: medicine.image
        })
        toast.success(`${medicine.name} added to cart`)
      } catch (error) {
        toast.error('Failed to add to cart')
        console.error('Error adding to cart:', error)
      } finally {
        setIsAddingToCart(false)
      }
    }
  }

  // Check if the item is already in the cart
  const itemInCart = items?.find(item => item.id === params.id)

  // Format price in Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(price)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-[500px] bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-12 bg-gray-200 rounded w-1/3"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!medicine) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Medicine Not Found</h1>
          <p className="text-gray-600 mb-8">The medicine you're looking for doesn't exist or has been removed.</p>
          <Link href="/products">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <Link href="/products" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Card className="p-6 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative aspect-square">
              <img
                src={medicine.image}
                alt={medicine.name}
                className="w-full h-full object-cover rounded-lg"
              />
              {medicine.discount && (
                <span className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {medicine.discount}
                </span>
              )}
            </div>
          </Card>

          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-4">{medicine.name}</h1>
              <p className="text-gray-600 text-lg mb-6">{medicine.description}</p>
              
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-4xl font-bold text-green-600">
                  {formatPrice(medicine.price)}
                </span>
                {medicine.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(medicine.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Shield className="h-6 w-6 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Quality Assured</h3>
                  <p className="text-sm text-gray-600">100% genuine medicines</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="h-6 w-6 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Fast Delivery</h3>
                  <p className="text-sm text-gray-600">Within 30 minutes</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-6 w-6 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">24/7 Support</h3>
                  <p className="text-sm text-gray-600">Always available</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Easy Returns</h3>
                  <p className="text-sm text-gray-600">10-day return policy</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 py-6 border-t border-b">
              <div className="flex justify-between">
                <span className="text-gray-600">Category</span>
                <span className="font-medium">{medicine.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Manufacturer</span>
                <span className="font-medium">{medicine.manufacturer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Dosage</span>
                <span className="font-medium">{medicine.dosage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expiry Date</span>
                <span className="font-medium">{medicine.expiryDate}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  medicine.stock > medicine.threshold
                    ? 'bg-green-100 text-green-800'
                    : medicine.stock === 0
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {medicine.stock === 0
                    ? 'Out of Stock'
                    : medicine.stock <= medicine.threshold
                    ? 'Low Stock'
                    : 'In Stock'}
                </span>
              </div>

              {itemInCart ? (
                <div className="flex gap-4">
                  <Link href="/cart" className="w-full">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      View in Cart ({itemInCart.quantity})
                    </Button>
                  </Link>
                </div>
              ) : (
                <Button
                  onClick={handleAddToCart}
                  disabled={medicine.stock === 0 || isAddingToCart}
                  className="w-full bg-green-600 hover:bg-green-700 h-14 text-lg"
                >
                  <ShoppingCart className="h-6 w-6 mr-3" />
                  {isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 