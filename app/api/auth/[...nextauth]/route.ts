import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const MAX_LOGIN_ATTEMPTS = 5
const LOCKOUT_TIME = 15 * 60 * 1000 // 15 minutes

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user) {
          throw new Error('User not found')
        }

        // Check for account lockout
        if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS && 
            user.lastLoginAttempt && 
            Date.now() - new Date(user.lastLoginAttempt).getTime() < LOCKOUT_TIME) {
          throw new Error('Account locked. Try again later.')
        }

        const isValid = await compare(credentials.password, user.password)

        if (!isValid) {
          // Increment login attempts
          await prisma.user.update({
            where: { email: credentials.email },
            data: {
              loginAttempts: { increment: 1 },
              lastLoginAttempt: new Date()
            }
          })
          throw new Error('Invalid password')
        }

        // Reset login attempts on successful login
        await prisma.user.update({
          where: { email: credentials.email },
          data: {
            loginAttempts: 0,
            lastLoginAttempt: null
          }
        })

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
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
        session.user.role = token.role
        session.user.id = token.id
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

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST } 