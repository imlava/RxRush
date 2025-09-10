'use client'

import AIFAQSupport from '@/app/components/AIFAQSupport'

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Support Center</h1>
          <p className="text-gray-600 text-lg">
            Get instant help with our AI-powered support system and comprehensive FAQ section
          </p>
        </div>
        
        <AIFAQSupport />
      </div>
    </div>
  )
}
