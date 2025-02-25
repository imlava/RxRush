"use client";

import { useState, useEffect } from "react";
import { Search, X, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/app/contexts/CartContext";
import { Medicine } from "@/types/medicine";
import { medicineService } from "@/services/medicineService";
import toast from "react-hot-toast";
import Link from 'next/link';

export default function ProductsPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const { addItem } = useCart();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMedicines();
  }, []);

  const loadMedicines = async () => {
    try {
      const data = await medicineService.getAll();
      setMedicines(data);
    } catch (error) {
      toast.error('Failed to load medicines');
      console.error('Error loading medicines:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = Array.from(new Set(medicines.map(med => med.category)));
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || medicine.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (e: React.MouseEvent, medicine: Medicine) => {
    e.preventDefault(); // Prevent navigation when clicking the Add to Cart button
    addItem({
      id: medicine.id,
      name: medicine.name,
      price: medicine.price,
      quantity: 1,
      image: medicine.image
    });
  };

  // Format price in Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden border animate-pulse">
              <div className="h-48 bg-gray-200" />
              <div className="p-4 space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-8 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Products</h1>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
          
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter size={20} />
              <span>Filter</span>
              <ChevronDown size={16} className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
            
            {showFilters && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border p-2 z-10">
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-3 py-2 rounded-md ${!selectedCategory ? 'bg-green-50 text-green-600' : 'hover:bg-gray-100'}`}
                  >
                    All Categories
                  </button>
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-md ${selectedCategory === category ? 'bg-green-50 text-green-600' : 'hover:bg-gray-100'}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMedicines.map(medicine => (
          <Link href={`/products/${medicine.id}`} key={medicine.id} className="group">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border hover:shadow-lg transition-shadow h-full">
              <div className="aspect-w-3 aspect-h-2">
                <img
                  src={medicine.image}
                  alt={medicine.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-green-600 transition-colors">{medicine.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{medicine.description}</p>
                <div className="flex items-baseline mb-4">
                  <span className="text-2xl font-bold text-green-600">{formatPrice(medicine.price)}</span>
                  {medicine.originalPrice && (
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      {formatPrice(medicine.originalPrice)}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${medicine.stock > medicine.threshold ? 'text-green-600' : 'text-red-600'}`}>
                    {medicine.stock > medicine.threshold ? 'In Stock' : 'Low Stock'}
                  </span>
                  <Button
                    onClick={(e) => handleAddToCart(e, medicine)}
                    disabled={medicine.stock === 0}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredMedicines.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No medicines found matching your search.</p>
        </div>
      )}
    </div>
  );
} 