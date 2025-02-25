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
  XCircle
} from 'lucide-react'
import { orderService } from '@/services/orderService'
import { userService } from '@/services/userService'
import { formatPrice } from '@/lib/utils'

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
    </div>
  )
} 