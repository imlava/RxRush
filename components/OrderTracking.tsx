// OrderTracking.tsx
'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useApi } from '@/hooks/useApi'

interface OrderTrackingProps {
  id: string
}

interface OrderStatus {
  id: string
  status: 'Processing' | 'Confirmed' | 'Out for Delivery' | 'Delivered'
  timestamp: string
  location?: string
}

export default function OrderTracking({ id }: OrderTrackingProps) {
  const { data: order, loading, error } = useApi<OrderStatus>(`/api/orders/${id}`)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (order) {
      const statusMap = {
        'Processing': 25,
        'Confirmed': 50,
        'Out for Delivery': 75,
        'Delivered': 100
      }
      setProgress(statusMap[order.status] || 0)
    }
  }, [order])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading order status...</CardTitle>
        </CardHeader>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error loading order</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{error.message}</p>
        </CardContent>
      </Card>
    )
  }

  if (!order) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Order not found</CardTitle>
        </CardHeader>
        <CardContent>
          <p>The order you&apos;re looking for doesn&apos;t exist.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order #{id}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <p className="text-lg font-semibold mb-2">Status: {order.status}</p>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className={`w-3 h-3 rounded-full ${progress >= 25 ? 'bg-green-500' : 'bg-gray-300'}`} />
            <div>
              <p className="font-medium">Order Processing</p>
              <p className="text-sm text-gray-500">Your order has been received</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className={`w-3 h-3 rounded-full ${progress >= 50 ? 'bg-green-500' : 'bg-gray-300'}`} />
            <div>
              <p className="font-medium">Order Confirmed</p>
              <p className="text-sm text-gray-500">Your order has been confirmed</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className={`w-3 h-3 rounded-full ${progress >= 75 ? 'bg-green-500' : 'bg-gray-300'}`} />
            <div>
              <p className="font-medium">Out for Delivery</p>
              <p className="text-sm text-gray-500">Your order is on its way</p>
              {order.location && <p className="text-sm text-gray-500">Current location: {order.location}</p>}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className={`w-3 h-3 rounded-full ${progress === 100 ? 'bg-green-500' : 'bg-gray-300'}`} />
            <div>
              <p className="font-medium">Delivered</p>
              <p className="text-sm text-gray-500">Thank you for shopping with us!</p>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          Last updated: {new Date(order.timestamp).toLocaleString()}
        </div>
      </CardContent>
    </Card>
  )
}
