'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from 'react-hot-toast'
import { User, Lock, Mail, Heart } from 'lucide-react'
import Link from 'next/link'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get('callbackUrl') || '/'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: true, // Let NextAuth handle the redirect
        callbackUrl: callbackUrl
      })

      // If we reach here without redirect, there was an error
      if (result?.error) {
        toast.error('Invalid credentials')
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Branding */}
        <div className="text-center lg:text-left space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-center lg:justify-start space-x-3">
              <div className="h-12 w-12 bg-green-600 rounded-xl flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">
                <span className="text-green-600">Rx</span>Rush
              </h1>
            </div>
            <p className="text-xl text-gray-600 font-medium">
              30-Minute Medicine Delivery
            </p>
            <p className="text-gray-500 max-w-md">
              AI-powered pharmacy delivery platform with intelligent order management 
              and voice support for seamless healthcare access.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3 max-w-md">
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span>Express 30-minute delivery</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span>AI-powered customer support</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span>Multi-pharmacy network</span>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-gray-900">Welcome Back</CardTitle>
              <p className="text-gray-500 text-sm">Sign in to your RxRush account</p>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Email Address</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-11"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <Lock className="h-4 w-4" />
                    <span>Password</span>
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-11"
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2 text-gray-600">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span>Remember me</span>
                  </label>
                  <Link href="/forgot-password" className="text-green-600 hover:text-green-700">
                    Forgot password?
                  </Link>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full h-11 bg-green-600 hover:bg-green-700 text-white font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Sign In</span>
                    </div>
                  )}
                </Button>

                <div className="text-center text-sm text-gray-600">
                  Don't have an account? {' '}
                  <Link href="/register" className="text-green-600 hover:text-green-700 font-medium">
                    Sign up for free
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
} 