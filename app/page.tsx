'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, X, Filter, ChevronDown } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useApi } from '@/hooks/useApi'
import { useCart } from '@/app/contexts/CartContext'

interface Medicine {
  id: string
  name: string
  dosage: string
  price: number
  originalPrice: number
  discount: string
}

export default function Home() {
  const { data: medicines, loading, error } = useApi<Medicine[]>('/api/medicines')
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])

  // Save medicines to localStorage for offline access
  useEffect(() => {
    if (medicines && medicines.length > 0) {
      localStorage.setItem('medicines', JSON.stringify(medicines))
    }
  }, [medicines])

  // Filters
  const filteredMedicines = medicines?.filter(medicine => 
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    medicine.price >= priceRange[0] && 
    medicine.price <= priceRange[1]
  ) || []

  // For skeleton loading
  const skeletonCards = Array(6).fill(0).map((_, i) => (
    <Card key={`skeleton-${i}`} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse"></div>
      </CardHeader>
      <CardContent>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
        <div className="flex items-center gap-2">
          <div className="h-5 bg-gray-200 rounded w-16 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
        </div>
      </CardContent>
    </Card>
  ))

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Medicines at your doorstep under 15 minutes! <span className="hidden sm:inline" role="img" aria-label="alarm clock">⏰</span>
      </h1>

      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search for a medicine..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1 text-gray-600 text-sm hover:text-green-600"
          >
            <Filter className="h-4 w-4" />
            Filters
            <ChevronDown className={`h-3 w-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          
          {filteredMedicines.length > 0 && (
            <span className="text-sm text-gray-500">
              {filteredMedicines.length} medicine{filteredMedicines.length !== 1 ? 's' : ''} found
            </span>
          )}
        </div>

        {showFilters && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-sm border">
            <h3 className="font-medium mb-3">Price Range</h3>
            <div className="flex items-center gap-4">
              <Input
                type="number"
                min="0"
                max={priceRange[1]}
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                className="w-24"
              />
              <span>to</span>
              <Input
                type="number"
                min={priceRange[0]}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
                className="w-24"
              />
            </div>
          </div>
        )}
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skeletonCards}
        </div>
      )}

      {error && (
        <div className="text-center text-red-500">
          <p>Error loading medicines. Please try again later.</p>
        </div>
      )}

      {!loading && !error && filteredMedicines.length === 0 && (
        <div className="text-center text-gray-500">
          <p>No medicines found matching your search.</p>
        </div>
      )}

      {!loading && !error && filteredMedicines.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedicines.map((medicine) => (
            <Link href={`/medicine/${medicine.id}`} key={medicine.id}>
              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <CardTitle>{medicine.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">{medicine.dosage}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">₹{medicine.price}</span>
                    <span className="text-sm text-gray-500 line-through">₹{medicine.originalPrice}</span>
                    <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">{medicine.discount}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      <footer className="bg-gray-50 py-6 mt-16 border-t">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© 2024 RxRush. All medicines are delivered within 15 minutes or your money back.</p>
          <p className="mt-2">Contact: support@RxRush.com | Emergency: +91 9876543210</p>
        </div>
      </footer>
    </main>
  )
}
