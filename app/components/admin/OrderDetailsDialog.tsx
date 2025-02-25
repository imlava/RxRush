'use client'

import { Order } from '@/types/order'
import { Dialog } from '@/app/components/ui/Dialog'
import { formatPrice } from '@/lib/utils'
import { MapPin, Phone, Mail, Calendar, CreditCard } from 'lucide-react'
import { userService } from '@/services/userService'
import { useEffect, useState } from 'react'

interface OrderDetailsDialogProps {
  order: Order | null
  isOpen: boolean
  onClose: () => void
}

export function OrderDetailsDialog({ order, isOpen, onClose }: OrderDetailsDialogProps) {
  const [customerDetails, setCustomerDetails] = useState<{ name: string; email: string; phone?: string } | null>(null)

  useEffect(() => {
    if (order) {
      fetchCustomerDetails(order.userId)
    }
  }, [order])

  const fetchCustomerDetails = async (userId: string) => {
    try {
      const user = await userService.getById(userId)
      if (user) {
        setCustomerDetails({
          name: user.name,
          email: user.email,
          phone: user.phone
        })
      }
    } catch (error) {
      console.error('Error fetching customer details:', error)
    }
  }

  if (!order) return null

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={`Order Details - ${order.id}`}
      maxWidth="4xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Customer Information */}
        <div>
          <h3 className="font-semibold mb-4">Customer Information</h3>
          <div className="space-y-3">
            {customerDetails && (
              <>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{customerDetails.email}</span>
                </div>
                {customerDetails.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{customerDetails.phone}</span>
                  </div>
                )}
              </>
            )}
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="h-4 w-4 text-gray-400 mt-1" />
              <div>
                <p>{order.shippingAddress.street}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                <p>{order.shippingAddress.postalCode}</p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Information */}
        <div>
          <h3 className="font-semibold mb-4">Order Information</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-gray-600">Order Date</p>
                <p>{new Date(order.createdAt).toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-gray-600">Payment Method</p>
                <p className="capitalize">{order.paymentMethod}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="md:col-span-2">
          <h3 className="font-semibold mb-4">Order Items</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-2">Item</th>
                  <th className="pb-2">Quantity</th>
                  <th className="pb-2">Price</th>
                  <th className="pb-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id} className="border-b last:border-0">
                    <td className="py-2">
                      <div className="flex items-center gap-3">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td className="py-2">{item.quantity}</td>
                    <td className="py-2">{formatPrice(item.price)}</td>
                    <td className="py-2">{formatPrice(item.price * item.quantity)}</td>
                  </tr>
                ))}
                <tr className="font-medium">
                  <td colSpan={3} className="py-2 text-right">Total:</td>
                  <td className="py-2">{formatPrice(order.total)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Dialog>
  )
} 