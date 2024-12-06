import React from 'react';
import { MapPin } from 'lucide-react';
import { LocationData } from '../../../types/location';

interface ShopperOriginsProps {
  origins: LocationData['metrics']['shopperOrigins'];
}

export function ShopperOrigins({ origins }: ShopperOriginsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-6">
        <MapPin className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold">Where Shoppers Come From</h2>
      </div>
      <div className="space-y-4">
        {origins.map((origin, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-gray-700">{origin.location}</span>
            <div className="flex items-center space-x-4">
              <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${origin.percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-16 text-right">
                {origin.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}