'use client';

import { CartProvider } from './contexts/CartContext';
import { Toaster } from 'react-hot-toast'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            <CartProvider>
                {children}
            </CartProvider>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                    success: {
                        duration: 3000,
                        style: {
                            background: '#059669',
                            color: '#fff',
                        },
                    },
                    error: {
                        duration: 4000,
                        style: {
                            background: '#dc2626',
                            color: '#fff',
                        },
                    },
                }}
            />
        </>
    );
} 