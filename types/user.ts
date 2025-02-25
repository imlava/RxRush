export type UserRole = 'admin' | 'user'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  phone?: string
  address?: {
    street: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  createdAt: string
  updatedAt: string
}

export interface UserCreateInput extends Omit<User, 'id' | 'role' | 'createdAt' | 'updatedAt'> {
  password: string
}

export interface UserUpdateInput extends Partial<Omit<User, 'createdAt' | 'updatedAt'>> {
  id: string
  currentPassword?: string
  newPassword?: string
} 