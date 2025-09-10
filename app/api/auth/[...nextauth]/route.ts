import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import type { NextAuthOptions } from 'next-auth'
import type { UserRole } from '../../../../types/user'

// Import bcrypt dynamically to avoid potential SSR issues
const bcrypt = require('bcryptjs')

// Mock users (in a real app, these would be in a database)
const USERS = {
  admin: {
    id: '1',
    email: 'admin@rxrush.com',
    name: 'Admin User',
    role: 'admin' as UserRole,
    // This is the hashed version of 'admin123'
    password: '$2a$10$oVAG2JoM78jl4/VF26XTiufzJwgnClq.Sc594VqBCFgsFH0PHfC5W'
  },
  customer: {
    id: '2',
    email: 'customer@example.com',
    name: 'John Customer',
    role: 'customer' as UserRole,
    // This is the hashed version of 'customer123'
    password: '$2a$10$SmzyP0ckGa/8UI6o/7e97ejRIHiYhyKnKLsHm.Xls1rd/BfZw42F2'
  },
  pharmacy: {
    id: '3',
    email: 'pharmacy@rxrush.com',
    name: 'Pharmacy Manager',
    role: 'pharmacy' as UserRole,
    pharmacyId: 'pharmacy-001',
    // This is the hashed version of 'pharmacy123'
    password: '$2a$10$XJ8LPxKdSfM2lFbc8urJwOTzjEADHyvRlZI05CPGe9FdoZXi.b0Xi'
  },
  // Additional test users
  customer2: {
    id: '4',
    email: 'jane@example.com',
    name: 'Jane Doe',
    role: 'customer' as UserRole,
    // This is the hashed version of 'test123'
    password: '$2a$10$x5DCCKmCW3T0q3LaBNzhLuUDRlbJ47v3HXfKLp82w1PZY1hwiODg.'
  }
}

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.error('Missing credentials')
            return null
          }

          // Check if it's a valid user (admin or regular user)
          const user = Object.values(USERS).find(u => u.email === credentials.email)
          
          if (!user) {
            console.error('User not found:', credentials.email)
            return null
          }

          const isValid = await bcrypt.compare(credentials.password, user.password)
          
          if (isValid) {
            console.log('Login successful for:', user.email, 'with role:', user.role)
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role
            }
          }

          console.error('Invalid password for:', credentials.email)
          return null
        } catch (error) {
          console.error('Authorization error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
        if (user.role === 'pharmacy') {
          token.pharmacyId = user.pharmacyId
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as UserRole
        session.user.id = token.id as string
        if (token.pharmacyId) {
          session.user.pharmacyId = token.pharmacyId as string
        }
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // After successful login, redirect to our custom auth-redirect page
      if (url.startsWith('/login') || url === baseUrl) {
        return `${baseUrl}/auth-redirect`
      }
      
      // Allow relative URLs
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`
      }
      // Allow same-origin URLs
      if (url.startsWith(baseUrl)) {
        return url
      }
      
      return baseUrl
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  logger: {
    error(code, ...message) {
      console.error(code, ...message)
    },
    warn(code, ...message) {
      console.warn(code, ...message)
    },
    debug(code, ...message) {
      if (process.env.NODE_ENV === 'development') {
        console.debug(code, ...message)
      }
    }
  }
}

const handler = NextAuth(options)

export { handler as GET, handler as POST } 