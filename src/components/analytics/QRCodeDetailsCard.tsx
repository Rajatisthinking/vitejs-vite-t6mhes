import React from 'react';
import { QRCodeData } from '../../types/qrcode';
import { BarChart, PieChart, Apple, Smartphone as AndroidIcon } from 'lucide-react';

interface QRCodeDetailsCardProps {
  qrCode: QRCodeData;
}

export function QRCodeDetailsCard({ qrCode }: QRCodeDetailsCardProps) {
  const { devices } = qrCode.analytics;
  const totalScans = devices.ios + devices.android;

  const calculatePercentage = (value: number) => {
    return totalScans > 0 ? Math.round((value / totalScans) * 100) : 0;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">{qrCode.name}</h3>
        <span className="text-sm text-gray-500">Created: {qrCode.createdAt}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <PieChart className="w-5 h-5 text-blue-600" />
            <h4 className="font-medium">Device Distribution</h4>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Apple className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">iOS</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${calculatePercentage(devices.ios)}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600">{calculatePercentage(devices.ios)}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AndroidIcon className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">Android</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-600 rounded-full"
                    style={{ width: `${calculatePercentage(devices.android)}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600">{calculatePercentage(devices.android)}%</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-4">
            <BarChart className="w-5 h-5 text-blue-600" />
            <h4 className="font-medium">Scan Statistics</h4>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Scans</span>
              <span className="font-medium">{qrCode.scans.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Daily Average</span>
              <span className="font-medium">
                {Math.round(qrCode.analytics.scansByDay.reduce((acc, day) => acc + day.count, 0) / 
                  qrCode.analytics.scansByDay.length).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}