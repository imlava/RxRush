'use client'

import { useState, useEffect } from 'react'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  X,
  Filter,
  ChevronDown,
  AlertTriangle
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Medicine, MedicineCreateInput, MedicineUpdateInput } from '@/types/medicine'
import { medicineService } from '@/services/medicineService'
import { toast } from 'react-hot-toast'
import { showToast } from '@/app/contexts/CartContext'
import { useRouter, useSearchParams } from 'next/navigation'

export default function InventoryPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState<string>('')
  const [stockFilter, setStockFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('name')
  const [formData, setFormData] = useState<Partial<Medicine>>({
    name: '',
    description: '',
    category: '',
    price: 0,
    originalPrice: 0,
    stock: 0,
    threshold: 0,
    manufacturer: '',
    expiryDate: '',
    image: '',
    dosage: '',
  })
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    loadMedicines()
  }, [])

  useEffect(() => {
    const filterParam = searchParams.get('filter')
    if (filterParam === 'low') {
      setStockFilter('low')
    } else if (filterParam === 'out') {
      setStockFilter('out')
    }
    
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
      setCategoryFilter(categoryParam)
    }
    
    const searchParam = searchParams.get('search')
    if (searchParam) {
      setSearchTerm(searchParam)
    }
  }, [searchParams])

  const loadMedicines = async () => {
    try {
      const data = await medicineService.getAll()
      setMedicines(data)
    } catch (error) {
      showToast('Failed to load medicines', 'error')
      console.error('Error loading medicines:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'originalPrice' || name === 'stock' || name === 'threshold' 
        ? parseFloat(value) || 0
        : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isEditMode && selectedMedicine) {
        await medicineService.update({
          id: selectedMedicine.id,
          ...formData
        })
        showToast('Medicine updated successfully', 'success')
      } else {
        await medicineService.create(formData as MedicineCreateInput)
        showToast('Medicine added successfully', 'success')
      }
      
      loadMedicines()
      handleCloseDialog()
    } catch (error) {
      console.error('Error in handleSubmit:', error)
      showToast(isEditMode ? 'Failed to update medicine' : 'Failed to add medicine', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (medicine: Medicine) => {
    setSelectedMedicine(medicine)
    setFormData({
      name: medicine.name || '',
      description: medicine.description || '',
      category: medicine.category || '',
      price: medicine.price || 0,
      originalPrice: medicine.originalPrice || 0,
      stock: medicine.stock || 0,
      threshold: medicine.threshold || 0,
      manufacturer: medicine.manufacturer || '',
      expiryDate: medicine.expiryDate || '',
      image: medicine.image || '',
      dosage: medicine.dosage || '',
    })
    setIsEditMode(true)
    setDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this medicine?')) {
      return
    }

    try {
      await medicineService.delete(id)
      showToast('Medicine deleted successfully', 'success')
      loadMedicines()
    } catch (error) {
      showToast('Failed to delete medicine', 'error')
      console.error('Error deleting medicine:', error)
    }
  }

  const handleCloseDialog = () => {
    setSelectedMedicine(null)
    setFormData({
      name: '',
      description: '',
      category: '',
      price: 0,
      originalPrice: 0,
      stock: 0,
      threshold: 0,
      manufacturer: '',
      expiryDate: '',
      image: '',
      dosage: '',
    })
    setIsEditMode(false)
    setDialogOpen(false)
  }

  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const lowStockMedicines = filteredMedicines.filter(medicine => 
    medicine.stock <= medicine.threshold
  )

  const updateUrlWithFilters = () => {
    const params = new URLSearchParams()
    
    if (stockFilter !== 'all') {
      params.set('filter', stockFilter)
    }
    
    if (categoryFilter) {
      params.set('category', categoryFilter)
    }
    
    if (searchTerm) {
      params.set('search', searchTerm)
    }
    
    const query = params.toString()
    router.push(`/admin/inventory${query ? '?' + query : ''}`, { scroll: false })
  }

  useEffect(() => {
    updateUrlWithFilters()
  }, [stockFilter, categoryFilter, searchTerm])

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">Inventory Management</h1>
          <p className="text-gray-600">Manage your medicine inventory</p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-500 hover:bg-green-600">
              <Plus className="h-4 w-4 mr-2" />
              Add Medicine
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditMode ? 'Edit Medicine' : 'Add New Medicine'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Medicine name"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Medicine description"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="Medicine category"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="originalPrice">Original Price</Label>
                    <Input
                      id="originalPrice"
                      name="originalPrice"
                      type="number"
                      value={formData.originalPrice}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      value={formData.stock}
                      onChange={handleInputChange}
                      placeholder="0"
                      min="0"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="threshold">Threshold</Label>
                    <Input
                      id="threshold"
                      name="threshold"
                      type="number"
                      value={formData.threshold}
                      onChange={handleInputChange}
                      placeholder="0"
                      min="0"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="manufacturer">Manufacturer</Label>
                  <Input
                    id="manufacturer"
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleInputChange}
                    placeholder="Manufacturer name"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    type="month"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="Image URL"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dosage">Dosage</Label>
                  <Input
                    id="dosage"
                    name="dosage"
                    value={formData.dosage}
                    onChange={handleInputChange}
                    placeholder="e.g., 500mg"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-green-500 hover:bg-green-600"
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : isEditMode ? 'Update' : 'Add'} Medicine
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search medicines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
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

        <div className="flex items-center justify-between">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1 text-gray-600 text-sm hover:text-green-600"
          >
            <Filter className="h-4 w-4" />
            Filters
            <ChevronDown className={`h-3 w-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          
          <span className="text-sm text-gray-500">
            {filteredMedicines.length} items found
          </span>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockMedicines.length > 0 && (
        <Alert className="bg-yellow-50 border-yellow-200">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-600">
            {lowStockMedicines.length} items are running low on stock
          </AlertDescription>
        </Alert>
      )}

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Medicine Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Price</th>
                  <th className="pb-3">Stock</th>
                  <th className="pb-3">Expiry</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMedicines.map((medicine) => (
                  <tr key={medicine.id} className="border-b last:border-0">
                    <td className="py-4">
                      <div>
                        <div className="font-medium">{medicine.name}</div>
                        <div className="text-sm text-gray-500">{medicine.manufacturer}</div>
                      </div>
                    </td>
                    <td className="py-4">{medicine.category}</td>
                    <td className="py-4">
                      <div>
                        <div>₹{medicine.price}</div>
                        {medicine.originalPrice && (
                          <div className="text-sm text-gray-500 line-through">₹{medicine.originalPrice}</div>
                        )}
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        medicine.stock <= medicine.threshold
                          ? 'bg-red-100 text-red-800'
                          : medicine.stock <= medicine.threshold * 2
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {medicine.stock} units
                      </span>
                    </td>
                    <td className="py-4">{medicine.expiryDate}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(medicine)}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(medicine.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 