'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/app/contexts/CartContext';

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  price: number;
  description: string;
}

export default function MedicineDetails({ id }: { id: string }) {
  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const response = await fetch(`/api/medicines/${id}`);
        const data = await response.json();
        setMedicine(data);
      } catch (error) {
        console.error('Error fetching medicine:', error);
      }
    };

    fetchMedicine();
  }, [id]);

  if (!medicine) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    addToCart({
      id: medicine.id,
      name: medicine.name,
      dosage: medicine.dosage,
      price: medicine.price,
      quantity: 1,
    });
  };

  return (
    <div className="container-custom py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">{medicine.name}</h1>
        <p className="text-gray-600 mb-2">Dosage: {medicine.dosage}</p>
        <p className="text-primary font-bold text-xl mb-4">
          ${medicine.price.toFixed(2)}
        </p>
        <p className="text-gray-700 mb-6">{medicine.description}</p>
        <button
          onClick={handleAddToCart}
          className="btn-primary px-6 py-2"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
} 