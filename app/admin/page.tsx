'use client'

import { useEffect, useState } from 'react'
import { 
  ShoppingBag, 
  Users, 
  TrendingUp,
  Clock,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ShoppingCart
} from 'lucide-react'
import { orderService } from '@/services/orderService'
import { userService } from '@/services/userService'
import { formatPrice } from '@/lib/utils'
import { medicineService } from '@/services/medicineService'
import { Medicine } from '@/types/medicine'
import { showToast } from '@/app/contexts/CartContext'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Stats {
  orders: {
    total: number
    pending: number
    processing: number
    shipped: number
    delivered: number
    cancelled: number
    totalRevenue: number
  }
  users: {
    total: number
    admins: number
    users: number
    activeThisMonth: number
  }
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [customers, setCustomers] = useState<any[]>([])
  const [revenue, setRevenue] = useState(0)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [orderStats, userStats] = await Promise.all([
          orderService.getStats(),
          userService.getStats()
        ])
        setStats({ orders: orderStats, users: userStats })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        
        // Load inventory data
        const medicinesData = await medicineService.getAll()
        setMedicines(medicinesData)
        
        // Load other data as needed
        // const ordersData = await orderService.getRecent()
        // setOrders(ordersData)
        
        // const customersData = await customerService.getRecent()
        // setCustomers(customersData)
        
        // Placeholder data for demo
        setOrders(new Array(15).fill({}))
        setCustomers(new Array(28).fill({}))
        setRevenue(12750)
        
      } catch (error) {
        showToast('Failed to load dashboard data', 'error')
        console.error('Error loading dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [])
  
  // Calculate inventory metrics
  const totalMedicines = medicines.length
  const lowStockMedicines = medicines.filter(med => med.stock <= med.threshold).length
  const outOfStockMedicines = medicines.filter(med => med.stock === 0).length
  const categories = [...new Set(medicines.map(med => med.category))].length

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" />
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="text-center text-gray-600">
        Failed to load dashboard statistics
      </div>
    )
  }

  const statCards = [
    {
      title: 'Total Orders',
      value: stats.orders.total,
      icon: ShoppingBag,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Total Users',
      value: stats.users.total,
      icon: Users,
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Total Revenue',
      value: formatPrice(stats.orders.totalRevenue),
      icon: TrendingUp,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Active Users',
      value: stats.users.activeThisMonth,
      icon: Clock,
      color: 'bg-orange-50 text-orange-600'
    }
  ]

  const orderStatusCards = [
    {
      title: 'Pending',
      value: stats.orders.pending,
      icon: Clock,
      color: 'bg-yellow-50 text-yellow-600'
    },
    {
      title: 'Processing',
      value: stats.orders.processing,
      icon: Package,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Shipped',
      value: stats.orders.shipped,
      icon: Truck,
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      title: 'Delivered',
      value: stats.orders.delivered,
      icon: CheckCircle,
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Cancelled',
      value: stats.orders.cancelled,
      icon: XCircle,
      color: 'bg-red-50 text-red-600'
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome to RxRush admin dashboard</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.title}
              className="bg-white rounded-xl shadow-sm p-6 space-y-4"
            >
              <div className={`inline-block p-3 rounded-lg ${stat.color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Order Status Stats */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Status</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {orderStatusCards.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.title}
                className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-4"
              >
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Dashboard Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Orders</p>
                <p className="text-3xl font-bold">{loading ? '...' : orders.length}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Revenue</p>
                <p className="text-3xl font-bold">₹{loading ? '...' : revenue.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Customers</p>
                <p className="text-3xl font-bold">{loading ? '...' : customers.length}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Products</p>
                <p className="text-3xl font-bold">{loading ? '...' : totalMedicines}</p>
              </div>
              <div className="p-2 bg-amber-100 rounded-full">
                <Package className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Inventory Status */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Status</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-6">
              <div className="animate-spin h-8 w-8 border-4 border-gray-300 rounded-full border-t-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-gray-500 text-sm">Total Products</h3>
                  <Package className="h-5 w-5 text-gray-400" />
                </div>
                <p className="text-2xl font-bold">{totalMedicines}</p>
                <Link href="/admin/inventory" className="text-blue-600 text-sm hover:underline mt-2 inline-block">
                  View all products
                </Link>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-gray-500 text-sm">Categories</h3>
                  <TrendingUp className="h-5 w-5 text-gray-400" />
                </div>
                <p className="text-2xl font-bold">{categories}</p>
                <Link href="/admin/inventory" className="text-blue-600 text-sm hover:underline mt-2 inline-block">
                  View categories
                </Link>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-gray-500 text-sm">Low Stock</h3>
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                </div>
                <p className="text-2xl font-bold text-yellow-600">{lowStockMedicines}</p>
                <Link href="/admin/inventory?filter=low" className="text-blue-600 text-sm hover:underline mt-2 inline-block">
                  View low stock items
                </Link>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-gray-500 text-sm">Out of Stock</h3>
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <p className="text-2xl font-bold text-red-600">{outOfStockMedicines}</p>
                <Link href="/admin/inventory?filter=out" className="text-blue-600 text-sm hover:underline mt-2 inline-block">
                  View out of stock items
                </Link>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Recent Activity and Other Dashboard Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-6">
                <div className="animate-spin h-8 w-8 border-4 border-gray-300 rounded-full border-t-blue-600"></div>
              </div>
            ) : orders.length === 0 ? (
              <p className="text-gray-500 text-center py-6">No recent orders</p>
            ) : (
              <div className="space-y-4">
                {orders.slice(0, 5).map((_, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                    <div>
                      <p className="font-medium">Order #{(Math.random() * 1000).toFixed(0).padStart(4, '0')}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{(Math.random() * 1500 + 100).toFixed(2)}</p>
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    </div>
                  </div>
                ))}
                <div className="text-center pt-2">
                  <Link href="/admin/orders" className="text-blue-600 text-sm hover:underline">
                    View all orders
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Low Stock Alert</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-6">
                <div className="animate-spin h-8 w-8 border-4 border-gray-300 rounded-full border-t-blue-600"></div>
              </div>
            ) : lowStockMedicines === 0 ? (
              <p className="text-gray-500 text-center py-6">No low stock items</p>
            ) : (
              <div className="space-y-4">
                {medicines
                  .filter(med => med.stock <= med.threshold)
                  .slice(0, 5)
                  .map((medicine, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                      <div>
                        <p className="font-medium">{medicine.name}</p>
                        <p className="text-sm text-gray-500">{medicine.category}</p>
                      </div>
                      <div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          medicine.stock === 0 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {medicine.stock} in stock
                        </span>
                      </div>
                    </div>
                  ))}
                <div className="text-center pt-2">
                  <Link href="/admin/inventory?filter=low" className="text-blue-600 text-sm hover:underline">
                    View all low stock items
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 