import React from 'react';
import { BarChart3, PieChart, TrendingUp, Users, QrCode } from 'lucide-react';
import { StatCard } from '../components/dashboard/StatCard';
import { QRCodeManager } from '../components/analytics/QRCodeManager';

export function Analytics() {
  return (
    <div className="ml-64 p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Management and Analytics</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Impressions"
            value="1.2M"
            icon={<Users className="w-6 h-6 text-blue-600" />}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Average Engagement"
            value="24.8%"
            icon={<TrendingUp className="w-6 h-6 text-blue-600" />}
            trend={{ value: 2.5, isPositive: true }}
          />
          <StatCard
            title="Campaign ROI"
            value="287%"
            icon={<BarChart3 className="w-6 h-6 text-blue-600" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Active QR Codes"
            value="5"
            icon={<QrCode className="w-6 h-6 text-blue-600" />}
            trend={{ value: 2, isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Performance by Location</h2>
            <div className="h-64 flex items-center justify-center text-gray-500">
              Location performance chart will be displayed here
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Campaign Analytics</h2>
            <div className="h-64 flex items-center justify-center text-gray-500">
              Campaign analytics chart will be displayed here
            </div>
          </div>
        </div>

        <QRCodeManager />
      </div>
    </div>
  );
}