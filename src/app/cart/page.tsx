'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';
import { Trash2, Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const router = useRouter();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalPrice = items.reduce(
    (total, item) => total + (item.product?.price || 0) * item.quantity,
    0
  );

  const tax = totalPrice * 0.1;
  const total = totalPrice + tax;

  const handleCheckout = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      router.push('/products');
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <ProtectedRoute requiredRole="user">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-green-50 border-2 border-green-500 rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">✓</div>
            <h1 className="text-4xl font-bold text-green-600 mb-4">Order Placed Successfully!</h1>
            <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been confirmed.</p>
            <p className="text-gray-500">Redirecting to shop...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requiredRole="user">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg mb-6">Your cart is empty</p>
            <Link
              href="/products"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {items.map((item) => (
                  <div key={item.productId} className="flex items-center justify-between p-6 border-b last:border-b-0 hover:bg-gray-50 transition">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.product?.name}</h3>
                      <p className="text-gray-600 text-sm">{item.product?.description}</p>
                      <p className="text-blue-600 font-semibold mt-2">${item.product?.price}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                          className="px-3 py-1 hover:bg-gray-100 text-gray-600"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-1 border-l border-r">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-100 text-gray-600"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="text-red-600 hover:text-red-700 transition"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (10%)</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-blue-600">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold mb-3"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => router.push('/products')}
                  className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}