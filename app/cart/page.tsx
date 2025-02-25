'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCart } from '../contexts/CartContext';

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  dosage: string;
};

export default function Cart() {
  const router = useRouter();
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems, total: totalPrice }),
      });
      if (response.ok) {
        const order = await response.json();
        clearCart();
        router.push(`/order/${order.id}`);
      } else {
        throw new Error('Failed to create order');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred during checkout. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <Button onClick={() => router.push('/')} variant="outline">
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item: CartItem) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{item.dosage}</p>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                      className="w-16 text-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="font-bold">₹{item.price * item.quantity}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </CardFooter>
            </Card>
          ))}
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Total</span>
                <span className="text-xl font-bold">₹{totalPrice}</span>
              </div>
              <Button
                className="w-full"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? 'Processing...' : 'Checkout'}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
}
