import React from 'react';
import { PlusCircle } from 'lucide-react';
import { PackageInfo } from '../components/dashboard/PackageInfo';

export function CampaignManagement() {
  return (
    <div className="ml-64 p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Campaign Management</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Create a New Campaign</h2>
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <PlusCircle className="w-5 h-5" />
                  <span>New Campaign</span>
                </button>
              </div>
            </div>
          </div>

          <div>
            <PackageInfo />
          </div>
        </div>
      </div>
    </div>
  );
}