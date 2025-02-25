'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { User, Package, LogOut } from 'lucide-react'

interface Order {
  id: string
  date: string
  status: string
  total: number
  items: Array<{
    id: string
    name: string
    quantity: number
    price: number
  }>
}

export default function AccountPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  // Mock user data - in a real app, this would come from your auth system
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    joinDate: '2024-02-25'
  }

  useEffect(() => {
    // Mock fetching orders - in a real app, this would be an API call
    const mockOrders = [
      {
        id: '1',
        date: '2024-02-24',
        status: 'Delivered',
        total: 180,
        items: [
          { id: '1', name: 'Paracetamol', quantity: 2, price: 50 },
          { id: '2', name: 'Ibuprofen', quantity: 1, price: 80 }
        ]
      },
      {
        id: '2',
        date: '2024-02-20',
        status: 'Processing',
        total: 120,
        items: [
          { id: '3', name: 'Amoxicillin', quantity: 1, price: 120 }
        ]
      }
    ]
    setOrders(mockOrders)
    setLoading(false)
  }, [])

  const handleLogout = () => {
    // Add logout logic here
    router.push('/login')
  }

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div>Loading...</div>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Name</h3>
                <p className="text-gray-600">{user.name}</p>
              </div>
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-gray-600">{user.email}</p>
              </div>
              <div>
                <h3 className="font-medium">Member Since</h3>
                <p className="text-gray-600">{new Date(user.joinDate).toLocaleDateString()}</p>
              </div>
              <Button 
                variant="destructive" 
                className="w-full mt-4"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Order History Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-medium">Order #{order.id}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{order.total}</p>
                      <p className="text-sm text-gray-500">{order.status}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.name} x{item.quantity}</span>
                        <span>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
} 