'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Search, ArrowRight, ShieldCheck, Truck, Clock, CreditCard } from 'lucide-react'

const features = [
  {
    title: 'Genuine Medicines',
    description: 'All medicines are sourced directly from authorized manufacturers',
    icon: ShieldCheck,
    color: 'bg-blue-50 text-blue-600'
  },
  {
    title: 'Fast Delivery',
    description: 'Get your medicines delivered within 30 Minutes',
    icon: Truck,
    color: 'bg-green-50 text-green-600'
  },
  {
    title: '24/7 Support',
    description: 'Our customer support team is available round the clock',
    icon: Clock,
    color: 'bg-purple-50 text-purple-600'
  },
  {
    title: 'Secure Payments',
    description: 'Multiple secure payment options available',
    icon: CreditCard,
    color: 'bg-orange-50 text-orange-600'
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
      <section className="relative bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
                Your Health, <br />
                <span className="text-green-600">Our Priority</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-lg">
                RxRush brings you a wide range of medicines and healthcare products, 
                delivered right to your doorstep with just a few clicks.
              </p>
              <form onSubmit={handleSearch} className="relative max-w-lg">
                <input
                  type="text"
                  placeholder="Search for medicines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Search
                </button>
              </form>
            </div>
            <div className="relative h-[400px] lg:h-[500px]">
              <Image
                src="https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?q=80&w=2940&auto=format&fit=crop"
                alt="Healthcare professionals"
                fill
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
              <div key={feature.title} className="bg-white rounded-xl p-6 shadow-sm">
                <div className={`inline-block p-3 rounded-lg ${feature.color} mb-4`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
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
            <div className="pt-4">
              <Link 
                href="/about"
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
              >
                Learn more about us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
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
