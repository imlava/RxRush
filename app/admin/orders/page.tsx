'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { 
  ChevronDown, 
  ChevronUp,
  Search,
  Filter,
  MoreVertical
} from 'lucide-react'
import { Order, OrderStatus } from '@/types/order'
import { orderService } from '@/services/orderService'
import { formatPrice } from '@/lib/utils'
import { OrderDetailsDialog } from '@/app/components/admin/OrderDetailsDialog'

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [sortField, setSortField] = useState<keyof Order>('createdAt')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const data = await orderService.getAll()
      setOrders(data)
    } catch (error) {
      console.error('Error fetching orders:', error)
      toast.error('Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }

  const handleSort = (field: keyof Order) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleUpdateStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await orderService.update({ id: orderId, status: newStatus })
      toast.success('Order status updated')
      fetchOrders()
    } catch (error) {
      console.error('Error updating order:', error)
      toast.error('Failed to update order status')
    }
  }

  const handleDeleteOrder = async (orderId: string) => {
    if (!window.confirm('Are you sure you want to delete this order?')) {
      return
    }

    try {
      await orderService.delete(orderId)
      toast.success('Order deleted')
      fetchOrders()
    } catch (error) {
      console.error('Error deleting order:', error)
      toast.error('Failed to delete order')
    }
  }

  const filteredOrders = orders
    .filter(order => {
      const matchesSearch = 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.userId.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]
      const direction = sortDirection === 'asc' ? 1 : -1

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction * aValue.localeCompare(bValue)
      }
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction * (aValue - bValue)
      }
      return 0
    })

  const statusColors = {
    pending: 'bg-yellow-50 text-yellow-600',
    processing: 'bg-blue-50 text-blue-600',
    shipped: 'bg-indigo-50 text-indigo-600',
    delivered: 'bg-green-50 text-green-600',
    cancelled: 'bg-red-50 text-red-600'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
        <div className="flex gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'all')}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none bg-white"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th 
                  className="px-6 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                  onClick={() => handleSort('id')}
                >
                  <div className="flex items-center gap-2">
                    Order ID
                    {sortField === 'id' && (
                      sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                  onClick={() => handleSort('userId')}
                >
                  <div className="flex items-center gap-2">
                    Customer ID
                    {sortField === 'userId' && (
                      sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                  onClick={() => handleSort('total')}
                >
                  <div className="flex items-center gap-2">
                    Total
                    {sortField === 'total' && (
                      sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center gap-2">
                    Status
                    {sortField === 'status' && (
                      sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                  onClick={() => handleSort('createdAt')}
                >
                  <div className="flex items-center gap-2">
                    Date
                    {sortField === 'createdAt' && (
                      sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td 
                    className="px-6 py-4 text-sm text-gray-900 cursor-pointer hover:text-green-600"
                    onClick={() => setSelectedOrder(order)}
                  >
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {order.userId}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {formatPrice(order.total)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="relative group inline-block">
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                      <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
                        <div className="py-1">
                          {order.status !== 'cancelled' && (
                            <>
                              {order.status !== 'pending' && (
                                <button
                                  onClick={() => handleUpdateStatus(order.id, 'pending')}
                                  className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                                >
                                  Mark as Pending
                                </button>
                              )}
                              {order.status !== 'processing' && (
                                <button
                                  onClick={() => handleUpdateStatus(order.id, 'processing')}
                                  className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                                >
                                  Mark as Processing
                                </button>
                              )}
                              {order.status !== 'shipped' && (
                                <button
                                  onClick={() => handleUpdateStatus(order.id, 'shipped')}
                                  className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                                >
                                  Mark as Shipped
                                </button>
                              )}
                              {order.status !== 'delivered' && (
                                <button
                                  onClick={() => handleUpdateStatus(order.id, 'delivered')}
                                  className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                                >
                                  Mark as Delivered
                                </button>
                              )}
                              <button
                                onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                                className="block w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
                              >
                                Cancel Order
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleDeleteOrder(order.id)}
                            className="block w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
                          >
                            Delete Order
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <OrderDetailsDialog
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  )
} 