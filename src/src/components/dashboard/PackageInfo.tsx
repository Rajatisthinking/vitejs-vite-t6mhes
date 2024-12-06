import React from 'react';
import { Package } from 'lucide-react';

export function PackageInfo() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-4">
        <Package className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Current Package</h2>
      </div>
      <div className="space-y-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-semibold text-lg">Premium Plan</h3>
          <p className="text-gray-600 mt-2">Valid until: Dec 31, 2024</p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center text-gray-700">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
              Unlimited active campaigns
            </li>
            <li className="flex items-center text-gray-700">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
              Advanced analytics
            </li>
            <li className="flex items-center text-gray-700">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
              Priority support
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}