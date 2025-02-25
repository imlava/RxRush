import { Order, OrderCreateInput, OrderUpdateInput, OrderStatus } from '@/types/order'

// Mock data for development
const mockOrders: Order[] = [
  {
    id: "1",
    userId: "user1",
    items: [
      { id: "1", name: "Paracetamol", price: 49.99, quantity: 2, image: "https://placehold.co/400x300/e2e8f0/1e293b?text=Paracetamol" },
      { id: "2", name: "Ibuprofen", price: 89.99, quantity: 1, image: "https://placehold.co/400x300/e2e8f0/1e293b?text=Ibuprofen" }
    ],
    total: 189.97,
    status: "delivered" as OrderStatus,
    shippingAddress: {
      street: "123 Main St",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400001",
      country: "India"
    },
    paymentMethod: "card",
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-15T15:00:00Z"
  },
  {
    id: "2",
    userId: "user2",
    items: [
      { id: "3", name: "Aspirin", price: 39.99, quantity: 3, image: "https://placehold.co/400x300/e2e8f0/1e293b?text=Aspirin" }
    ],
    total: 119.97,
    status: "processing" as OrderStatus,
    shippingAddress: {
      street: "456 Park Ave",
      city: "Delhi",
      state: "Delhi",
      postalCode: "110001",
      country: "India"
    },
    paymentMethod: "upi",
    createdAt: "2024-03-16T09:00:00Z",
    updatedAt: "2024-03-16T09:00:00Z"
  }
]

// Generate more mock orders
const orderStatuses: OrderStatus[] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

for (let i = 3; i <= 20; i++) {
  const status = orderStatuses[Math.floor(Math.random() * orderStatuses.length)]
  const itemCount = Math.floor(Math.random() * 4) + 1
  const items = Array(itemCount).fill(null).map((_, index) => ({
    id: Math.random().toString(36).substr(2, 9),
    name: `Medicine-${Math.floor(Math.random() * 100) + 1}`,
    price: Math.floor(Math.random() * 500) + 50,
    quantity: Math.floor(Math.random() * 3) + 1,
    image: `https://placehold.co/400x300/e2e8f0/1e293b?text=Medicine-${i}-${index}`
  }))
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  mockOrders.push({
    id: i.toString(),
    userId: `user${Math.floor(Math.random() * 10) + 1}`,
    items,
    total,
    status,
    shippingAddress: {
      street: `${Math.floor(Math.random() * 999) + 1} Street`,
      city: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'][Math.floor(Math.random() * 5)],
      state: ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'West Bengal'][Math.floor(Math.random() * 5)],
      postalCode: Math.floor(Math.random() * 900000 + 100000).toString(),
      country: "India"
    },
    paymentMethod: ['card', 'upi', 'cod'][Math.floor(Math.random() * 3)],
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString()
  })
}

export const orderService = {
  // Get all orders
  getAll: async (): Promise<Order[]> => {
    // TODO: Replace with actual API call
    return mockOrders
  },

  // Get orders by user ID
  getByUserId: async (userId: string): Promise<Order[]> => {
    // TODO: Replace with actual API call
    return mockOrders.filter(order => order.userId === userId)
  },

  // Get a single order by ID
  getById: async (id: string): Promise<Order | null> => {
    // TODO: Replace with actual API call
    const order = mockOrders.find(o => o.id === id)
    return order || null
  },

  // Create a new order
  create: async (order: OrderCreateInput): Promise<Order> => {
    // TODO: Replace with actual API call
    const newOrder = {
      ...order,
      id: (mockOrders.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    mockOrders.push(newOrder)
    return newOrder
  },

  // Update an existing order
  update: async (order: OrderUpdateInput): Promise<Order> => {
    // TODO: Replace with actual API call
    const index = mockOrders.findIndex(o => o.id === order.id)
    if (index === -1) {
      throw new Error('Order not found')
    }
    mockOrders[index] = {
      ...mockOrders[index],
      ...order,
      updatedAt: new Date().toISOString()
    }
    return mockOrders[index]
  },

  // Delete an order
  delete: async (id: string): Promise<void> => {
    // TODO: Replace with actual API call
    const index = mockOrders.findIndex(o => o.id === id)
    if (index === -1) {
      throw new Error('Order not found')
    }
    mockOrders.splice(index, 1)
  },

  // Get order statistics
  getStats: async () => {
    const total = mockOrders.length
    const pending = mockOrders.filter(o => o.status === 'pending').length
    const processing = mockOrders.filter(o => o.status === 'processing').length
    const shipped = mockOrders.filter(o => o.status === 'shipped').length
    const delivered = mockOrders.filter(o => o.status === 'delivered').length
    const cancelled = mockOrders.filter(o => o.status === 'cancelled').length
    const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0)

    return {
      total,
      pending,
      processing,
      shipped,
      delivered,
      cancelled,
      totalRevenue
    }
  }
} 