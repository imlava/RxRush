import { CartItem } from './medicine'

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: OrderStatus
  shippingAddress: {
    street: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  paymentMethod: string
  createdAt: string
  updatedAt: string
}

export interface OrderCreateInput extends Omit<Order, 'id' | 'createdAt' | 'updatedAt'> {}

export interface OrderUpdateInput extends Partial<Order> {
  id: string
} 