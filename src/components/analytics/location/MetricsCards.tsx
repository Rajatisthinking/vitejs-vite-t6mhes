import React from 'react';
import { Users, TrendingUp, Clock, ArrowUp, Wallet, Target } from 'lucide-react';
import { LocationMetrics } from '../../../types/location';

interface MetricsCardsProps {
  metrics: LocationMetrics;
}

export function MetricsCards({ metrics }: MetricsCardsProps) {
  const getQuotientColor = (value: 'high' | 'medium' | 'low') => {
    switch (value) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-red-600';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Visitors</p>
            <h3 className="text-2xl font-bold mt-2">
              {metrics.totalVisitors.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {Math.round(metrics.averageDaily).toLocaleString()} daily avg
            </p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Peak Day Performance</p>
            <h3 className="text-2xl font-bold mt-2">
              {metrics.peakDay.day.charAt(0).toUpperCase() + metrics.peakDay.day.slice(1)}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {metrics.peakDay.count.toLocaleString()} visitors
            </p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Week over Week</p>
            <div className="flex items-center space-x-2 mt-2">
              <h3 className="text-2xl font-bold text-green-600">
                +{metrics.weekOverWeekGrowth}%
              </h3>
              <ArrowUp className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Spend Quotient</p>
            <h3 className={`text-2xl font-bold mt-2 ${getQuotientColor(metrics.spendQuotient)}`}>
              {metrics.spendQuotient.charAt(0).toUpperCase() + metrics.spendQuotient.slice(1)}
            </h3>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <Wallet className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Affluence Indicator</p>
            <h3 className="text-2xl font-bold mt-2">
              {(metrics.affluenceIndicator * 100).toFixed(0)}%
            </h3>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <Target className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Spending Capacity</p>
            <h3 className="text-2xl font-bold mt-2">
              {metrics.spendingCapacity}/100
            </h3>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
}