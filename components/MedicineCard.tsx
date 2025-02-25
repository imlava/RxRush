'use client'

import Link from 'next/link'
import { useCart } from '@/app/contexts/CartContext'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Medicine {
  id: string
  name: string
  dosage: string
  price: number
  originalPrice: number
  discount: string
}

interface MedicineCardProps {
  medicine: Medicine
}

export default function MedicineCard({ medicine }: MedicineCardProps) {
  let addToCart: ((item: { id: string; name: string; dosage: string; price: number; quantity: number }) => void) | undefined;

  try {
    const cartContext = useCart();
    addToCart = cartContext.addItem;
  } catch (error) {
    console.error('CartProvider not found:', error);
    // Handle the case where CartProvider is not available
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation when clicking the button
    if (addToCart) {
      addToCart({
        id: medicine.id,
        name: medicine.name,
        dosage: medicine.dosage,
        price: medicine.price,
        quantity: 1
      })
    } else {
      console.error('Add to cart functionality is not available');
      // You could show a notification to the user here
    }
  }

  return (
    <Link href={`/medicine/${medicine.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>{medicine.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-2">{medicine.dosage}</p>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">₹{medicine.price}</span>
            <span className="text-sm text-muted-foreground line-through">₹{medicine.originalPrice}</span>
            <span className="text-sm text-green-600">{medicine.discount}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-primary hover:bg-primary/90"
            disabled={!addToCart}
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}