'use client';

import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';

export default function Home() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to ShopHub
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Your ultimate ecommerce platform with role-based access
        </p>

        {!user ? (
          <div className="flex gap-4 justify-center mb-12 flex-wrap">
            <Link
              href="/login?role=user"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Shop as User
            </Link>
            <Link
              href="/login?role=seller"
              className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition"
            >
              Login as Seller
            </Link>
            <Link
              href="/login?role=admin"
              className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition"
            >
              Login as Admin
            </Link>
          </div>
        ) : (
          <div className="mb-12">
            <p className="text-lg text-gray-700 mb-6">
              Welcome, {user.name}! You are logged in as <strong>{user.role}</strong>
            </p>
            {user.role === 'user' && (
              <Link
                href="/products"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition inline-block"
              >
                Start Shopping
              </Link>
            )}
            {user.role === 'seller' && (
              <Link
                href="/seller/dashboard"
                className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition inline-block"
              >
                Go to Dashboard
              </Link>
            )}
            {user.role === 'admin' && (
              <Link
                href="/admin/dashboard"
                className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition inline-block"
              >
                Go to Admin Panel
              </Link>
            )}
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-xl font-semibold mb-2">Role-Based Access</h3>
          <p className="text-gray-600">
            Admin, Seller, and User roles with tailored features for each
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-4xl mb-4">📱</div>
          <h3 className="text-xl font-semibold mb-2">Responsive Design</h3>
          <p className="text-gray-600">
            Works seamlessly on mobile, tablet, and desktop devices
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-4xl mb-4">🛍️</div>
          <h3 className="text-xl font-semibold mb-2">Shop & Sell</h3>
          <p className="text-gray-600">
            Buy products as a user or manage orders as a seller
          </p>
        </div>
      </section>
    </div>
  );
}