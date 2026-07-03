import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'ShopHub - Ecommerce Platform',
  description: 'A role-based ecommerce application built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-800 text-white text-center py-4 mt-12">
          <p>&copy; 2024 ShopHub. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}