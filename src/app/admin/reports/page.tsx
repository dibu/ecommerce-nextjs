'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { BarChart3, TrendingUp, DollarSign } from 'lucide-react';

export default function AdminReports() {
  const monthlyData = [
    { month: 'January', sales: 4000, orders: 240, revenue: 2400, growth: 12 },
    { month: 'February', sales: 3000, orders: 221, revenue: 2210, growth: 8 },
    { month: 'March', sales: 2000, orders: 229, revenue: 2290, growth: 5 },
    { month: 'April', sales: 2780, orders: 200, revenue: 2000, growth: -3 },
    { month: 'May', sales: 1890, orders: 221, revenue: 2290, growth: 7 },
    { month: 'June', sales: 2390, orders: 229, revenue: 2390, growth: 9 },
  ];

  const totalRevenue = monthlyData.reduce((sum, d) => sum + d.revenue, 0);
  const totalOrders = monthlyData.reduce((sum, d) => sum + d.orders, 0);
  const averageOrderValue = (totalRevenue * 1000) / totalOrders;

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Reports & Analytics</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Revenue (6 months)</p>
                <p className="text-4xl font-bold mt-2">${(totalRevenue).toFixed(0)}k</p>
                <p className="text-blue-200 text-sm mt-1">Average: ${(totalRevenue/6).toFixed(0)}k/month</p>
              </div>
              <DollarSign size={48} className="opacity-20" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Total Orders (6 months)</p>
                <p className="text-4xl font-bold mt-2">{totalOrders.toLocaleString()}</p>
                <p className="text-purple-200 text-sm mt-1">Average: {(totalOrders/6).toFixed(0)}/month</p>
              </div>
              <BarChart3 size={48} className="opacity-20" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Average Order Value</p>
                <p className="text-4xl font-bold mt-2">${averageOrderValue.toFixed(2)}</p>
                <p className="text-green-200 text-sm mt-1">Growth: +9.2% YoY</p>
              </div>
              <TrendingUp size={48} className="opacity-20" />
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Revenue Trend</h2>
          <div className="h-80 flex items-end gap-2 p-4 bg-gray-50 rounded">
            {monthlyData.map((data, index) => {
              const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));
              const height = (data.revenue / maxRevenue) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center group">
                  <div className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t hover:from-blue-600 hover:to-blue-500 cursor-pointer transition" style={{ height: `${height}%`, minHeight: '30px' }}>
                    <div className="opacity-0 group-hover:opacity-100 transition absolute -mt-8 ml-2 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                      ${data.revenue}k
                    </div>
                  </div>
                  <span className="text-xs text-gray-600 mt-3 font-semibold">{data.month.slice(0, 3)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Monthly Data Table */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Monthly Performance Details</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold">Month</th>
                  <th className="text-left py-3 px-4 font-semibold">Revenue</th>
                  <th className="text-left py-3 px-4 font-semibold">Orders</th>
                  <th className="text-left py-3 px-4 font-semibold">Avg Order Value</th>
                  <th className="text-left py-3 px-4 font-semibold">Growth</th>
                  <th className="text-left py-3 px-4 font-semibold">Trend</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((data, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-semibold">{data.month}</td>
                    <td className="py-3 px-4 text-green-600 font-semibold">${data.revenue}k</td>
                    <td className="py-3 px-4">{data.orders}</td>
                    <td className="py-3 px-4">${((data.revenue * 1000) / data.orders).toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-sm font-semibold ${
                        data.growth > 0
                          ? 'bg-green-100 text-green-800'
                          : data.growth < 0
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {data.growth > 0 ? '+' : ''}{data.growth}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {data.growth > 0 ? (
                        <span className="text-green-600 font-bold">↑</span>
                      ) : data.growth < 0 ? (
                        <span className="text-red-600 font-bold">↓</span>
                      ) : (
                        <span className="text-gray-600 font-bold">→</span>
                      )}
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