import React from 'react';
import { Home, Users, Wallet, TrendingUp } from 'lucide-react';
import { LocationData } from '../../../types/location';

interface LocationMetricsProps {
  location: LocationData;
}

export function LocationMetrics({ location }: LocationMetricsProps) {
  const { metrics } = location;
  
  const getIndicatorColor = (value: 'high' | 'medium' | 'low') => {
    switch (value) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium">Spend Quotient</h3>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm ${getIndicatorColor(metrics.spendQuotient)}`}>
            {metrics.spendQuotient.charAt(0).toUpperCase() + metrics.spendQuotient.slice(1)}
          </span>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <Users className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium">Total Addressable Market</h3>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm ${getIndicatorColor(metrics.totalAddressableMarket)}`}>
            {metrics.totalAddressableMarket.charAt(0).toUpperCase() + metrics.totalAddressableMarket.slice(1)}
          </span>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <Home className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium">Households</h3>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold">{metrics.totalHouseholds.toLocaleString()}</p>
            <p className="text-sm text-gray-500">
              {metrics.householdsAbove10L.toLocaleString()} above 10L
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <Wallet className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium">Spending Metrics</h3>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm text-gray-600">Affluence Indicator</p>
                <span className="text-sm font-medium">{(metrics.affluenceIndicator * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-blue-600 h-full rounded-full"
                  style={{ width: `${metrics.affluenceIndicator * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm text-gray-600">Spending Capacity</p>
                <span className="text-sm font-medium">{metrics.spendingCapacity}/100</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-green-600 h-full rounded-full"
                  style={{ width: `${metrics.spendingCapacity}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}