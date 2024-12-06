import React from 'react';
import { BarChart } from 'lucide-react';
import { WeeklyData } from '../../../types/location';

interface WeeklyFootfallChartProps {
  data: WeeklyData;
}

export function WeeklyFootfallChart({ data }: WeeklyFootfallChartProps) {
  const maxCount = Math.max(...Object.values(data));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-6">
        <BarChart className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold">Weekly Footfall Trends</h2>
      </div>
      <div className="h-64">
        <div className="flex h-full items-end space-x-2">
          {Object.entries(data).map(([day, count]) => (
            <div key={day} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-blue-100 hover:bg-blue-200 transition-colors relative group cursor-pointer"
                style={{
                  height: `${(count / maxCount) * 100}%`,
                  minHeight: '4px'
                }}
              >
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {count.toLocaleString()} visitors
                </div>
              </div>
              <span className="text-sm text-gray-600 mt-2">
                {day.charAt(0).toUpperCase() + day.slice(1, 3)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}