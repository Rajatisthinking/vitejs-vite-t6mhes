import React, { useState } from 'react';
import { useQRCodeStore } from '../../../stores/qrCodeStore';
import { Users } from 'lucide-react';

interface TotalUsersGraphProps {
  selectedQRCode: string | 'all';
}

type TimeRange = 'day' | 'month' | 'year';

export function TotalUsersGraph({ selectedQRCode }: TotalUsersGraphProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('month');
  const qrCodes = useQRCodeStore(state => state.qrCodes);

  const getDataPoints = () => {
    const now = new Date();
    const data: { date: Date; count: number }[] = [];

    const relevantCodes = selectedQRCode === 'all' 
      ? qrCodes 
      : qrCodes.filter(code => code.id === selectedQRCode);

    relevantCodes.forEach(code => {
      code.scans.forEach(scan => {
        const scanDate = new Date(scan.timestamp);
        if (timeRange === 'day' && scanDate.getDate() === now.getDate()) {
          data.push({ date: scanDate, count: 1 });
        } else if (timeRange === 'month' && scanDate.getMonth() === now.getMonth()) {
          data.push({ date: scanDate, count: 1 });
        } else if (timeRange === 'year' && scanDate.getFullYear() === now.getFullYear()) {
          data.push({ date: scanDate, count: 1 });
        }
      });
    });

    return data.sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  const dataPoints = getDataPoints();
  const totalScans = dataPoints.length;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold">Total Users</h2>
        </div>
        <div className="flex space-x-2">
          {(['day', 'month', 'year'] as TimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-md text-sm ${
                timeRange === range
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="h-64">
        <div className="text-center mb-4">
          <span className="text-3xl font-bold text-gray-800">{totalScans}</span>
          <p className="text-sm text-gray-500">Total Scans</p>
        </div>
        <div className="relative h-40">
          <div className="absolute inset-0 flex items-end">
            {dataPoints.map((point, index) => (
              <div
                key={index}
                className="flex-1 bg-blue-500 opacity-75 hover:opacity-100 transition-opacity"
                style={{
                  height: `${(point.count / Math.max(...dataPoints.map(p => p.count))) * 100}%`,
                  minHeight: '2px'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}