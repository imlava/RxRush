import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare, hash } from 'bcryptjs'

// Admin user (you should move this to a secure configuration)
const ADMIN_USER = {
  id: '1',
  email: 'admin@rxrush.com',
  name: 'Admin',
  role: 'admin',
  password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LHHMQnWRKF4pPZQy' // hashed version of your admin password
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        // Check if it's the admin user
        if (credentials.email === ADMIN_USER.email) {
          const isValid = await compare(credentials.password, ADMIN_USER.password)
          
          if (isValid) {
            return {
              id: ADMIN_USER.id,
              email: ADMIN_USER.email,
              name: ADMIN_USER.name,
              role: ADMIN_USER.role
            }
          }
        }

        throw new Error('Invalid credentials')
      }
    })
  ],
  session: {
    strategy: 'jwt' as const,
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
        (session.user as any).role = token.role
        ;(session.user as any).id = token.id
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST } 