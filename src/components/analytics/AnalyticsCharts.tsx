import React from 'react';

export function AnalyticsCharts() {
  return (
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
  );
}