'use client'

import Link from 'next/link'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Heart,
  Shield,
  Truck,
  Award,
  ExternalLink,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-green-400">RxRush</span>
              <Heart className="h-6 w-6 text-red-500" />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              30-minute pharmacy delivery platform with LLM-driven order FAQs and voice IVR. 
              Revolutionizing healthcare accessibility with AI-powered supply chain management.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Medicines
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/account" className="text-gray-300 hover:text-white transition-colors text-sm">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-400">Our Services</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-sm">
                <Truck className="h-4 w-4 text-green-400" />
                <span className="text-gray-300">30-min Fast Delivery</span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <Shield className="h-4 w-4 text-green-400" />
                <span className="text-gray-300">Verified Medicines</span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <Award className="h-4 w-4 text-green-400" />
                <span className="text-gray-300">Expert Consultation</span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <Clock className="h-4 w-4 text-green-400" />
                <span className="text-gray-300">24/7 Support</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-400">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-green-400 mt-0.5" />
                <span className="text-gray-300">
                  123 Healthcare Street,<br />
                  Medical District,<br />
                  Mumbai, India 400001
                </span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-green-400" />
                <a href="tel:+911234567890" className="text-gray-300 hover:text-white transition-colors">
                  +91 123 456 7890
                </a>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-green-400" />
                <a href="mailto:support@rxrush.com" className="text-gray-300 hover:text-white transition-colors">
                  support@rxrush.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="text-sm text-gray-400">
              &copy; {currentYear} RxRush. All rights reserved. | Prototype Platform for Pharmacy Delivery
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-400">
                Built with ❤️ by{' '}
                <a 
                  href="https://imlava.in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 transition-colors font-medium inline-flex items-center"
                >
                  imlava.in
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
              <div className="hidden md:flex space-x-4 text-sm">
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
