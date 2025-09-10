'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  ChevronDown, 
  ChevronUp,
  Clock,
  Truck,
  CreditCard,
  Shield,
  Phone
} from 'lucide-react'
import { toast } from 'react-hot-toast'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: 'orders' | 'delivery' | 'payment' | 'medicines' | 'general'
}

interface ChatMessage {
  id: string
  message: string
  isUser: boolean
  timestamp: Date
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'How fast is your delivery?',
    answer: 'We offer 30-minute delivery service for most medicines within our delivery zones. Our AI-powered logistics system ensures the fastest possible delivery to your location.',
    category: 'delivery'
  },
  {
    id: '2',
    question: 'Are the medicines authentic?',
    answer: 'Yes, all our medicines are sourced directly from licensed manufacturers and distributors. We maintain strict quality control and verification processes to ensure 100% authenticity.',
    category: 'medicines'
  },
  {
    id: '3',
    question: 'What payment methods do you accept?',
    answer: 'We accept credit/debit cards, UPI payments, and cash on delivery. All online payments are secured with 256-bit encryption.',
    category: 'payment'
  },
  {
    id: '4',
    question: 'Can I track my order?',
    answer: 'Absolutely! You can track your order in real-time through our app or website. You\'ll receive updates via SMS and push notifications.',
    category: 'orders'
  },
  {
    id: '5',
    question: 'What if my order is late?',
    answer: 'If your order exceeds our 30-minute delivery promise, you\'ll receive a discount on your next order. Contact our support team for immediate assistance.',
    category: 'delivery'
  },
  {
    id: '6',
    question: 'Do you require a prescription?',
    answer: 'Prescription medicines require a valid prescription upload. Over-the-counter medicines can be ordered without prescription. Our pharmacists verify all prescriptions.',
    category: 'medicines'
  }
]

const categoryIcons = {
  orders: Clock,
  delivery: Truck,
  payment: CreditCard,
  medicines: Shield,
  general: MessageCircle
}

export default function AIFAQSupport() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      message: 'Hi! I\'m your AI assistant. How can I help you with your pharmacy needs today?',
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [chatInput, setChatInput] = useState('')
  const [showChat, setShowChat] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  const categories = [
    { id: 'all', label: 'All Questions', icon: MessageCircle },
    { id: 'orders', label: 'Orders', icon: Clock },
    { id: 'delivery', label: 'Delivery', icon: Truck },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'medicines', label: 'Medicines', icon: Shield },
  ]

  const filteredFAQs = selectedCategory === 'all' 
    ? faqData 
    : faqData.filter(faq => faq.category === selectedCategory)

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    // Simple AI-like responses based on keywords
    if (lowerMessage.includes('delivery') || lowerMessage.includes('fast') || lowerMessage.includes('time')) {
      return 'Our 30-minute delivery service is powered by AI-optimized routing and local pharmacy partnerships. We currently serve most urban areas with this rapid delivery promise.'
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('cheap')) {
      return 'We offer competitive pricing with regular discounts. Our AI pricing algorithm ensures you get the best available prices. Plus, delivery is free on all orders!'
    }
    
    if (lowerMessage.includes('prescription') || lowerMessage.includes('doctor')) {
      return 'For prescription medicines, simply upload a clear photo of your prescription. Our licensed pharmacists will verify it before processing your order. OTC medicines don\'t require a prescription.'
    }
    
    if (lowerMessage.includes('track') || lowerMessage.includes('order') || lowerMessage.includes('status')) {
      return 'You can track your order in real-time! Check your order status in the \'My Orders\' section or click the tracking link sent to your phone. You\'ll get live updates every step of the way.'
    }
    
    if (lowerMessage.includes('payment') || lowerMessage.includes('pay') || lowerMessage.includes('card')) {
      return 'We accept all major payment methods: Credit/Debit cards, UPI (GPay, PhonePe, Paytm), and Cash on Delivery. All payments are 100% secure with bank-level encryption.'
    }
    
    if (lowerMessage.includes('cancel') || lowerMessage.includes('return') || lowerMessage.includes('refund')) {
      return 'You can cancel orders before they\'re dispatched for a full refund. For returns, medicines must be unopened and within expiry. Refunds are processed within 3-5 business days.'
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('contact')) {
      return 'Our 24/7 support team is here to help! You can reach us via this chat, call +91-123-456-7890, or email support@rxrush.com. We typically respond within 2 minutes.'
    }
    
    // Default response
    return 'I understand you\'re asking about "' + userMessage + '". Let me connect you with a human representative who can provide more specific assistance. In the meantime, feel free to browse our FAQ section above!'
  }

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: chatInput,
      isUser: true,
      timestamp: new Date()
    }

    setChatMessages(prev => [...prev, userMessage])
    setChatInput('')
    setIsTyping(true)

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: generateAIResponse(chatInput),
        isUser: false,
        timestamp: new Date()
      }
      
      setChatMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleFAQClick = (faq: FAQItem) => {
    setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)
  }

  return (
    <div className="space-y-6">
      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-6 w-6" />
            Frequently Asked Questions
          </CardTitle>
          <p className="text-gray-600">
            Quick answers to common questions. Can't find what you're looking for? Try our AI chat below!
          </p>
        </CardHeader>
        <CardContent>
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {category.label}
                </button>
              )
            })}
          </div>

          {/* FAQ List */}
          <div className="space-y-3">
            {filteredFAQs.map((faq) => {
              const Icon = categoryIcons[faq.category]
              return (
                <div
                  key={faq.id}
                  className="border rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => handleFAQClick(faq)}
                    className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-green-600" />
                      <span className="font-medium">{faq.question}</span>
                    </div>
                    {expandedFAQ === faq.id ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  {expandedFAQ === faq.id && (
                    <div className="px-4 pb-4 text-gray-600 border-t bg-gray-50">
                      <p className="pt-3">{faq.answer}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* AI Chat Section */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-6 w-6 text-blue-600" />
              AI Assistant
            </CardTitle>
            <Button
              variant="outline"
              onClick={() => setShowChat(!showChat)}
            >
              {showChat ? 'Hide Chat' : 'Start Chat'}
            </Button>
          </div>
          <p className="text-gray-600">
            Get instant answers powered by AI. Available 24/7 for immediate assistance.
          </p>
        </CardHeader>
        
        {showChat && (
          <CardContent>
            {/* Chat Messages */}
            <div className="h-80 overflow-y-auto border rounded-lg p-4 mb-4 bg-gray-50">
              <div className="space-y-4">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!message.isUser && (
                      <div className="flex-shrink-0">
                        <Bot className="h-8 w-8 text-blue-600 bg-blue-100 rounded-full p-1.5" />
                      </div>
                    )}
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isUser
                          ? 'bg-green-600 text-white'
                          : 'bg-white border shadow-sm'
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                      <p className={`text-xs mt-1 ${message.isUser ? 'text-green-100' : 'text-gray-500'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {message.isUser && (
                      <div className="flex-shrink-0">
                        <User className="h-8 w-8 text-gray-600 bg-gray-200 rounded-full p-1.5" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <Bot className="h-8 w-8 text-blue-600 bg-blue-100 rounded-full p-1.5" />
                    <div className="bg-white border shadow-sm rounded-lg px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Chat Input */}
            <div className="flex gap-2">
              <Input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask me anything about your order, delivery, or medicines..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!chatInput.trim() || isTyping}>
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                'Track my order',
                'Delivery time?',
                'Payment options',
                'Upload prescription',
                'Contact support'
              ].map((quickAction) => (
                <button
                  key={quickAction}
                  onClick={() => setChatInput(quickAction)}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                >
                  {quickAction}
                </button>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Voice IVR Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-6 w-6 text-green-600" />
            Voice Support (IVR)
          </CardTitle>
          <p className="text-gray-600">
            Prefer to speak? Our AI-powered voice system is available 24/7 for order support.
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
            <div>
              <p className="font-semibold text-green-900">Call our AI Voice Assistant</p>
              <p className="text-sm text-green-700">Available 24/7 • Multi-language support</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">+91 123 456 7890</p>
              <p className="text-sm text-green-600">Toll-free</p>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Voice IVR Features:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Order tracking by voice</li>
                <li>• Medicine availability check</li>
                <li>• Prescription upload assistance</li>
                <li>• Real-time delivery updates</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Supported Languages:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• English & Hindi</li>
                <li>• Tamil & Telugu</li>
                <li>• Bengali & Marathi</li>
                <li>• More languages available</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
