import React from 'react';
import { Users } from 'lucide-react';
import { LocationData } from '../../../types/location';

interface FootfallTrendsProps {
  trends: LocationData['metrics']['footfallTrends'];
}

export function FootfallTrends({ trends }: FootfallTrendsProps) {
  const maxCount = Math.max(...trends.map(t => t.count));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold">October 2024 Footfall Trends</h2>
        </div>
        <div className="text-sm text-gray-500">
          Total Visitors: {trends.reduce((sum, t) => sum + t.count, 0).toLocaleString()}
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="h-64 min-w-[600px]">
          <div className="flex h-full items-end space-x-1">
            {trends.map((trend, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-blue-100 hover:bg-blue-200 transition-colors relative group"
                  style={{
                    height: `${(trend.count / maxCount) * 100}%`,
                    minHeight: '4px'
                  }}
                >
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {trend.day}: {trend.count.toLocaleString()} visitors
                  </div>
                </div>
                <span className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-top-left">
                  {trend.day.split(', ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}