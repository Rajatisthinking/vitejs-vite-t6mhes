import React from 'react';
import { MapPin } from 'lucide-react';

interface ShopperOrigin {
  location: string;
  percentage: number;
}

interface ShoppersOriginTableProps {
  data: ShopperOrigin[];
}

export function ShoppersOriginTable({ data }: ShoppersOriginTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-6">
        <MapPin className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold">Where Shoppers Come From</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 text-sm font-medium text-gray-500">Location</th>
              <th className="text-right py-3 text-sm font-medium text-gray-500">Traffic %</th>
              <th className="text-left py-3 text-sm font-medium text-gray-500 pl-4">Distribution</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b last:border-0">
                <td className="py-3 text-gray-900">{item.location}</td>
                <td className="text-right text-gray-900">{item.percentage}%</td>
                <td className="pl-4">
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-full rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}