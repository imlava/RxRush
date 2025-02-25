export interface Medicine {
  id: string
  name: string
  dosage: string
  price: number
  originalPrice: number
  discount: string
  description: string
}

export interface CartItem {
  id: string
  name: string
  dosage: string
  price: number
  quantity: number
}

export interface Order {
  id: string
  status: string
  createdAt: string
  estimatedDelivery: string
  items: CartItem[]
  total: number
}

export interface User {
  id: string
  email: string
}
