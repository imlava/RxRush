import NextAuth from "next-auth"
import { UserRole } from "./user"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: UserRole
      pharmacyId?: string
    }
  }

  interface User {
    id: string
    email: string
    name: string
    role: UserRole
    pharmacyId?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: UserRole
    pharmacyId?: string
  }
}
