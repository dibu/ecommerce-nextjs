'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { BarChart3, ShoppingCart, DollarSign, TrendingUp, Users } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Revenue', value: '$45,231.89', icon: DollarSign, color: 'bg-green-500', change: '+12.5%' },
    { label: 'Total Orders', value: '1,234', icon: ShoppingCart, color: 'bg-blue-500', change: '+8.2%' },
    { label: 'Active Products', value: '856', icon: TrendingUp, color: 'bg-purple-500', change: '+5.1%' },
    { label: 'Total Sellers', value: '42', icon: Users, color: 'bg-orange-500', change: '+2.3%' },
  ];

  const monthlyData = [
    { month: 'Jan', revenue: 4000, orders: 240, products: 120 },
    { month: 'Feb', revenue: 3000, orders: 221, products: 110 },
    { month: 'Mar', revenue: 2000, orders: 229, products: 135 },
    { month: 'Apr', revenue: 2780, orders: 200, products: 145 },
    { month: 'May', revenue: 1890, orders: 221, products: 155 },
    { month: 'Jun', revenue: 2390, orders: 229, products: 165 },
  ];

  const recentOrders = [
    { id: '#001', customer: 'John Doe', amount: '$299.99', status: 'Delivered', date: '2024-01-15' },
    { id: '#002', customer: 'Jane Smith', amount: '$149.99', status: 'Processing', date: '2024-01-14' },
    { id: '#003', customer: 'Bob Johnson', amount: '$499.99', status: 'Pending', date: '2024-01-13' },
    { id: '#004', customer: 'Alice Williams', amount: '$89.99', status: 'Delivered', date: '2024-01-12' },
    { id: '#005', customer: 'Charlie Brown', amount: '$199.99', status: 'Processing', date: '2024-01-11' },
  ];

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <p className="text-green-600 text-sm mt-1">{stat.change}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg text-white`}>
                    <Icon size={32} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Monthly Revenue</h2>
            <div className="h-64 flex items-end gap-2 p-4 bg-gray-50 rounded">
              {monthlyData.map((data, index) => {
                const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));
                const height = (data.revenue / maxRevenue) * 100;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-blue-500 rounded-t" style={{ height: `${height}%`, minHeight: '20px' }}></div>
                    <span className="text-xs text-gray-600 mt-2">{data.month}</span>
                    <span className="text-xs text-gray-900 font-semibold">${data.revenue}k</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Orders Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Monthly Orders</h2>
            <div className="h-64 flex items-end gap-2 p-4 bg-gray-50 rounded">
              {monthlyData.map((data, index) => {
                const maxOrders = Math.max(...monthlyData.map(d => d.orders));
                const height = (data.orders / maxOrders) * 100;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-purple-500 rounded-t" style={{ height: `${height}%`, minHeight: '20px' }}></div>
                    <span className="text-xs text-gray-600 mt-2">{data.month}</span>
                    <span className="text-xs text-gray-900 font-semibold">{data.orders}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Monthly Stats Table */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Monthly Statistics</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Month</th>
                  <th className="text-left py-3 px-4 font-semibold">Revenue</th>
                  <th className="text-left py-3 px-4 font-semibold">Orders</th>
                  <th className="text-left py-3 px-4 font-semibold">Products</th>
                  <th className="text-left py-3 px-4 font-semibold">Avg Order Value</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((data, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-semibold">{data.month}</td>
                    <td className="py-3 px-4 text-green-600 font-semibold">${data.revenue}k</td>
                    <td className="py-3 px-4">{data.orders}</td>
                    <td className="py-3 px-4">{data.products}</td>
                    <td className="py-3 px-4">${(data.revenue * 1000 / data.orders).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Order ID</th>
                  <th className="text-left py-3 px-4 font-semibold">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold">Date</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono">{order.id}</td>
                    <td className="py-3 px-4">{order.customer}</td>
                    <td className="py-3 px-4 font-semibold">{order.amount}</td>
                    <td className="py-3 px-4">{order.date}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === 'Delivered'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'Processing'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}