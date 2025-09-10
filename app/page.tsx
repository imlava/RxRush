'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Clock, 
  CreditCard,
  Bot,
  MessageCircle,
  Phone,
  Zap,
  Award,
  Star
} from 'lucide-react'

const features = [
  {
    title: '30-Minute Delivery',
    description: 'AI-powered logistics for lightning-fast medicine delivery',
    icon: Zap,
    color: 'bg-green-50 text-green-600'
  },
  {
    title: 'Verified Medicines',
    description: '100% authentic medicines with QR code verification',
    icon: ShieldCheck,
    color: 'bg-blue-50 text-blue-600'
  },
  {
    title: 'AI Support 24/7',
    description: 'Smart chatbot and voice IVR for instant assistance',
    icon: Bot,
    color: 'bg-purple-50 text-purple-600'
  },
  {
    title: 'Secure Payments',
    description: 'Multiple payment options with bank-level security',
    icon: CreditCard,
    color: 'bg-orange-50 text-orange-600'
  }
]

const aiFeatures = [
  {
    title: 'Smart Order Assistant',
    description: 'AI-powered chatbot helps you find medicines, check interactions, and track orders instantly.',
    icon: MessageCircle
  },
  {
    title: 'Voice IVR System',
    description: 'Call our AI voice assistant for order support in multiple languages, available 24/7.',
    icon: Phone
  },
  {
    title: 'Intelligent Routing',
    description: 'AI optimizes delivery routes and pharmacy selection for fastest possible delivery.',
    icon: Truck
  }
]

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 overflow-hidden">
        <div className="absolute inset-0 bg-white/50"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                  <Zap className="h-4 w-4" />
                  <span>30-Minute Delivery Promise</span>
                </div>
                <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                  Your Health,
                  <span className="text-green-600"> Our Priority</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  India's most trusted pharmacy delivery platform. Get authentic medicines delivered to your doorstep in just 30 minutes with our reliable logistics and dedicated customer support.
                </p>
              </div>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="flex gap-2 p-2 bg-white rounded-xl shadow-lg border">
                <div className="flex-1 flex items-center space-x-3 px-4">
                  <Search className="h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for medicines, supplements, or health products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 py-3 border-0 outline-none text-gray-700 placeholder-gray-400"
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <Search className="h-5 w-5" />
                  <span>Search</span>
                </button>
              </form>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">30min</div>
                  <div className="text-sm text-gray-600">Avg Delivery</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">10,000+</div>
                  <div className="text-sm text-gray-600">Medicines</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">24/7</div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=2940&auto=format&fit=crop"
                  alt="Modern pharmacy with medicines and healthcare products"
                  width={600}
                  height={500}
                  className="object-cover rounded-2xl shadow-xl"
                />
              </div>
              {/* Floating Support Badge */}
              <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-6 w-6 text-blue-600" />
                  <div>
                    <div className="text-sm font-semibold">Support</div>
                    <div className="text-xs text-gray-600">Available 24/7</div>
                  </div>
                </div>
              </div>
              {/* Floating Delivery Badge */}
              <div className="absolute bottom-4 left-4 z-20 bg-green-600 text-white rounded-lg p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <Truck className="h-6 w-6" />
                  <div>
                    <div className="text-sm font-semibold">Fast Delivery</div>
                    <div className="text-xs opacity-90">Within 30 minutes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose RxRush?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the future of pharmacy delivery with our comprehensive platform designed for speed, safety, and convenience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {aiFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="group relative">
                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group-hover:transform group-hover:scale-105">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Main Features Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose RxRush?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the future of pharmacy delivery with our comprehensive platform designed for speed, safety, and convenience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="group relative">
                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group-hover:transform group-hover:scale-105">
                  <div className={`${feature.color} w-16 h-16 rounded-lg flex items-center justify-center mb-6`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">
                Stay Updated with Health Tips & Offers
              </h2>
              <p className="text-gray-600">
                Subscribe to our newsletter for the latest health tips, product updates, and exclusive offers delivered right to your inbox.
              </p>
              <form className="flex gap-2 p-2 bg-white rounded-xl shadow-lg border max-w-md">
                <div className="flex-1 flex items-center space-x-3 px-4">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 py-3 border-0 outline-none text-gray-700 placeholder-gray-400"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2940&auto=format&fit=crop"
                alt="Newsletter"
                width={500}
                height={400}
                className="object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose RxRush?
          </h2>
          <p className="text-gray-600">
            We're committed to providing you with the best healthcare experience possible
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="text-center space-y-4">
                <div className={`w-16 h-16 mx-auto rounded-full ${feature.color} flex items-center justify-center`}>
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px]">
            <Image
              src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2940&auto=format&fit=crop"
              alt="Our pharmacy"
              fill
              className="object-cover rounded-2xl shadow-xl"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              About RxRush
            </h2>
            <p className="text-gray-600">
              RxRush is a leading online pharmacy in India, committed to making healthcare 
              accessible to everyone. With our extensive network of licensed pharmacies and 
              healthcare professionals, we ensure that you get genuine medicines at the best prices.
            </p>
            <p className="text-gray-600">
              Our mission is to revolutionize the way people access healthcare products by 
              providing a seamless online experience, backed by expert support and reliable delivery.
            </p>
            <Link 
              href="/about"
              className="inline-flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              <span>Learn More</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center text-white max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Ready to experience better healthcare?
            </h2>
            <p className="text-green-50 mb-8">
              Join thousands of satisfied customers who trust RxRush for their healthcare needs
            </p>
            <Link
              href="/products"
              className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-medium hover:bg-green-50"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
