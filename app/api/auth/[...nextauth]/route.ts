import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import type { NextAuthOptions } from 'next-auth'
import type { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface User {
    id: string
    email: string
    name: string
    role: string
  }
  
  interface Session {
    user: User & {
      id: string
      role: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string
    id?: string
  }
}

// Mock users (in a real app, these would be in a database)
const USERS = {
  admin: {
    id: '1',
    email: 'admin@rxrush.com',
    name: 'Admin',
    role: 'admin',
    // This is the hashed version of 'admin123'
    password: '$2a$10$oVAG2JoM78jl4/VF26XTiufzJwgnClq.Sc594VqBCFgsFH0PHfC5W'
  },
  user: {
    id: '2',
    email: 'user@rxrush.com',
    name: 'Test User',
    role: 'user',
    // This is the hashed version of 'user123'
    password: '$2a$10$IVrIrCMUCPZaYoNIKlNHqOd5jcO4jB29DYvqoNnqwQqn8wF5WgCXi'
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
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Check if it's a valid user (admin or regular user)
        const user = Object.values(USERS).find(u => u.email === credentials.email)
        
        if (!user) {
          console.log('User not found:', credentials.email)
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

        console.log('Invalid password for:', credentials.email)
        return null
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
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
        session.user.id = token.id as string
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Handle admin redirects
      if (url.startsWith('/admin')) {
        return url
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
}

const handler = NextAuth(options)

export { handler as GET, handler as POST } 