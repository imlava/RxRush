'use client'

import { useState } from 'react'
import { 
  Search, 
  X, 
  Filter, 
  ChevronDown,
  Eye,
  MapPin,
  Phone,
  Mail,
  ShoppingBag
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock data - Replace with real data from your API
const customers = [
  {
    id: "CUST001",
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 98765 43210",
    address: "123 Main St, Koramangala, Bengaluru - 560034",
    totalOrders: 15,
    totalSpent: 4500.00,
    lastOrder: "2024-02-25T10:30:00",
    orderHistory: [
      {
        id: "ORD001",
        date: "2024-02-25T10:30:00",
        items: 3,
        total: 310.00,
        status: "Delivered"
      },
      {
        id: "ORD002",
        date: "2024-02-20T15:45:00",
        items: 2,
        total: 280.00,
        status: "Delivered"
      }
    ]
  },
  // Add more customers...
]

interface OrderHistory {
  id: string
  date: string
  items: number
  total: number
  status: string
}

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  totalOrders: number
  totalSpent: number
  lastOrder: string
  orderHistory: OrderHistory[]
}

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  )

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Customers</h1>
        <p className="text-gray-600">View and manage customer information</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search customers by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1 text-gray-600 text-sm hover:text-green-600"
          >
            <Filter className="h-4 w-4" />
            Filters
            <ChevronDown className={`h-3 w-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          
          <span className="text-sm text-gray-500">
            {filteredCustomers.length} customers found
          </span>
        </div>
      </div>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Contact</th>
                  <th className="pb-3">Total Orders</th>
                  <th className="pb-3">Total Spent</th>
                  <th className="pb-3">Last Order</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b last:border-0">
                    <td className="py-4">
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.id}</div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="space-y-1">
                        <div className="text-sm">{customer.email}</div>
                        <div className="text-sm text-gray-500">{customer.phone}</div>
                      </div>
                    </td>
                    <td className="py-4">{customer.totalOrders}</td>
                    <td className="py-4">₹{customer.totalSpent}</td>
                    <td className="py-4">
                      {new Date(customer.lastOrder).toLocaleDateString()}
                    </td>
                    <td className="py-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedCustomer(customer)}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Customer Details - {customer.name}</DialogTitle>
                          </DialogHeader>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
                            {/* Customer Information */}
                            <div>
                              <h3 className="font-semibold mb-4">Contact Information</h3>
                              <div className="space-y-3">
                                <div className="flex items-start gap-2 text-sm">
                                  <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                                  <span>{customer.address}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Phone className="h-4 w-4 text-gray-400" />
                                  <span>{customer.phone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Mail className="h-4 w-4 text-gray-400" />
                                  <span>{customer.email}</span>
                                </div>
                              </div>
                            </div>

                            {/* Customer Stats */}
                            <div>
                              <h3 className="font-semibold mb-4">Customer Statistics</h3>
                              <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Total Orders:</span>
                                  <span>{customer.totalOrders}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Total Spent:</span>
                                  <span>₹{customer.totalSpent}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Last Order:</span>
                                  <span>{new Date(customer.lastOrder).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>

                            {/* Order History */}
                            <div className="md:col-span-2">
                              <h3 className="font-semibold mb-4">Order History</h3>
                              <div className="space-y-4">
                                {customer.orderHistory.map((order) => (
                                  <div 
                                    key={order.id}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                                  >
                                    <div className="flex items-center gap-3">
                                      <ShoppingBag className="h-5 w-5 text-gray-400" />
                                      <div>
                                        <div className="font-medium">{order.id}</div>
                                        <div className="text-sm text-gray-500">
                                          {new Date(order.date).toLocaleDateString()}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div>₹{order.total}</div>
                                      <div>
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                          order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                          order.status === 'Out for Delivery' ? 'bg-yellow-100 text-yellow-800' :
                                          'bg-gray-100 text-gray-800'
                                        }`}>
                                          {order.status}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 