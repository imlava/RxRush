'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from 'react-hot-toast'
import { Heart, Mail, Lock, User, Phone, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      // This is a demo - normally you'd make an API call to register the user
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('Registration successful! Please sign in with your credentials.')
      router.push('/login')
    } catch (error) {
      console.error('Registration error:', error)
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
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
              Join Our Healthcare Network
            </p>
            <p className="text-gray-500 max-w-md">
              Create your account to access 30-minute medicine delivery, 
              AI-powered support, and seamless healthcare services.
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
              <span>Secure prescription management</span>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="w-full max-w-md mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-gray-900">Create Account</CardTitle>
              <p className="text-gray-500 text-sm">Start your healthcare journey with RxRush</p>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Full Name</span>
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Email Address</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>Phone Number</span>
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="address" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>Address</span>
                  </label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
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
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <Lock className="h-4 w-4" />
                    <span>Confirm Password</span>
                  </label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-11"
                  />
                </div>

                <div className="flex items-start space-x-2 text-sm">
                  <input type="checkbox" className="rounded border-gray-300 mt-1" required />
                  <span className="text-gray-600">
                    I agree to the{' '}
                    <Link href="/terms" className="text-green-600 hover:text-green-700">
                      Terms of Service
                    </Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="text-green-600 hover:text-green-700">
                      Privacy Policy
                    </Link>
                  </span>
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
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Create Account</span>
                    </div>
                  )}
                </Button>

                <div className="text-center text-sm text-gray-600">
                  Already have an account? {' '}
                  <Link href="/login" className="text-green-600 hover:text-green-700 font-medium">
                    Sign in here
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>

          {/* Demo Notice */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700 text-center">
              <strong>Demo Notice:</strong> This is a prototype registration form. 
              Use the demo accounts on the login page for testing.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
