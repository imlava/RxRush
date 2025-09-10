import { User, UserCreateInput, UserUpdateInput, UserRole } from '@/types/user'

// Mock data for development
const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@rxrush.com",
    name: "Admin User",
    role: "admin",
    phone: "+91 9876543210",
    address: {
      street: "123 Admin Street",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400001",
      country: "India"
    },
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "2",
    email: "customer@example.com",
    name: "John Customer",
    role: "customer",
    phone: "+91 9876543211",
    address: {
      street: "456 User Lane",
      city: "Delhi",
      state: "Delhi",
      postalCode: "110001",
      country: "India"
    },
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-02-01T00:00:00Z"
  },
  {
    id: "3",
    email: "pharmacy@rxrush.com",
    name: "Pharmacy Manager",
    role: "pharmacy",
    phone: "+91 9876543212",
    pharmacyId: "pharmacy-001",
    address: {
      street: "789 Pharmacy Road",
      city: "Bangalore",
      state: "Karnataka",
      postalCode: "560001",
      country: "India"
    },
    createdAt: "2024-03-01T00:00:00Z",
    updatedAt: "2024-03-01T00:00:00Z"
  }
]

// Generate more mock customers
const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata']
const states = ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'West Bengal']

for (let i = 4; i <= 20; i++) {
  const cityIndex = Math.floor(Math.random() * cities.length)
  const createdAt = new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString()
  
  mockUsers.push({
    id: i.toString(),
    email: `customer${i}@example.com`,
    name: `Customer ${i}`,
    role: "user" as UserRole,
    phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    address: {
      street: `${Math.floor(Math.random() * 999) + 1} Street`,
      city: cities[cityIndex],
      state: states[cityIndex],
      postalCode: Math.floor(Math.random() * 900000 + 100000).toString(),
      country: "India"
    },
    createdAt,
    updatedAt: createdAt
  })
}

export const userService = {
  // Get all users
  getAll: async (): Promise<User[]> => {
    // TODO: Replace with actual API call
    return mockUsers
  },

  // Get a single user by ID
  getById: async (id: string): Promise<User | null> => {
    // TODO: Replace with actual API call
    const user = mockUsers.find(u => u.id === id)
    return user || null
  },

  // Get a single user by email
  getByEmail: async (email: string): Promise<User | null> => {
    // TODO: Replace with actual API call
    const user = mockUsers.find(u => u.email === email)
    return user || null
  },

  // Create a new user
  create: async (user: UserCreateInput): Promise<User> => {
    // TODO: Replace with actual API call
    const newUser = {
      ...user,
      id: (mockUsers.length + 1).toString(),
      role: 'customer' as UserRole,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    mockUsers.push(newUser)
    return newUser
  },

  // Update an existing user
  update: async (user: UserUpdateInput): Promise<User> => {
    // TODO: Replace with actual API call
    const index = mockUsers.findIndex(u => u.id === user.id)
    if (index === -1) {
      throw new Error('User not found')
    }
    mockUsers[index] = {
      ...mockUsers[index],
      ...user,
      updatedAt: new Date().toISOString()
    }
    return mockUsers[index]
  },

  // Delete a user
  delete: async (id: string): Promise<void> => {
    // TODO: Replace with actual API call
    const index = mockUsers.findIndex(u => u.id === id)
    if (index === -1) {
      throw new Error('User not found')
    }
    mockUsers.splice(index, 1)
  },

  // Get user statistics
  getStats: async () => {
    const total = mockUsers.length
    const admins = mockUsers.filter(u => u.role === 'admin').length
    const users = mockUsers.filter(u => u.role === 'customer').length
    const activeThisMonth = mockUsers.filter(u => {
      const lastMonth = new Date()
      lastMonth.setMonth(lastMonth.getMonth() - 1)
      return new Date(u.updatedAt) > lastMonth
    }).length

    return {
      total,
      admins,
      users,
      activeThisMonth
    }
  }
} 