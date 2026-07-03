'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import { ShoppingCart, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const { getTotalItems } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);

  const totalItems = getTotalItems();

  const handleLogout = () => {
    logout();
  };

  const adminLinks = [
    { href: '/admin/dashboard', label: 'Dashboard' },
    { href: '/admin/products', label: 'Products' },
    { href: '/admin/reports', label: 'Reports' },
    { href: '/admin/transactions', label: 'Transactions' },
  ];

  const sellerLinks = [
    { href: '/seller/dashboard', label: 'Dashboard' },
    { href: '/seller/orders', label: 'Orders' },
    { href: '/seller/reports', label: 'Reports' },
  ];

  const userLinks = [
    { href: '/products', label: 'Shop' },
    { href: '/favorites', label: 'Favorites' },
  ];

  const getLinks = () => {
    if (!user) return [];
    switch (user.role) {
      case 'admin':
        return adminLinks;
      case 'seller':
        return sellerLinks;
      case 'user':
        return userLinks;
      default:
        return [];
    }
  };

  const links = getLinks();

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            ShopHub
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-gray-200 transition">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user?.role === 'user' && (
              <Link href="/cart" className="relative hover:text-gray-200 transition">
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
            {user && (
              <>
                <span className="text-sm">{user.name}</span>
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded transition flex items-center gap-2">
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            )}
            {!user && (
              <Link href="/login" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition">
                Login
              </Link>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 space-y-3">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="block hover:text-gray-200 transition" onClick={() => setIsOpen(false)}>
                {link.label}
              </Link>
            ))}
            {user?.role === 'user' && (
              <Link href="/cart" className="block hover:text-gray-200 transition">
                Cart ({totalItems})
              </Link>
            )}
            {user && (
              <button onClick={() => { handleLogout(); setIsOpen(false); }} className="w-full bg-red-500 hover:bg-red-600 px-3 py-2 rounded transition flex items-center gap-2">
                <LogOut size={18} />
                Logout
              </button>
            )}
            {!user && (
              <Link href="/login" className="block bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition text-center">
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}