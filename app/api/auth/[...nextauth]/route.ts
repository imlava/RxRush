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

// Admin user (you should move this to a secure configuration)
const ADMIN_USER = {
  id: '1',
  email: 'admin@rxrush.com',
  name: 'Admin',
  role: 'admin',
  password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LHHMQnWRKF4pPZQy' // hashed version of your admin password
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

        // Check if it's the admin user
        if (credentials.email === ADMIN_USER.email) {
          const isValid = await bcrypt.compare(credentials.password, ADMIN_USER.password)
          
          if (isValid) {
            return {
              id: ADMIN_USER.id,
              email: ADMIN_USER.email,
              name: ADMIN_USER.name,
              role: ADMIN_USER.role
            }
          }
        }

        return null
      }
    })
  ],
  session: {
    strategy: 'jwt',
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
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(options)

export { handler as GET, handler as POST } 