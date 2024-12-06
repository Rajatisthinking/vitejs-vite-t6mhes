import React, { useState } from 'react';
import { useQRCodeStore } from '../../../stores/qrCodeStore';
import { Smartphone } from 'lucide-react';

interface UniqueDeviceScansProps {
  selectedQRCode: string | 'all';
}

type TimeRange = 'day' | 'month' | 'year';

export function UniqueDeviceScans({ selectedQRCode }: UniqueDeviceScansProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('month');
  const qrCodes = useQRCodeStore(state => state.qrCodes);

  const getDeviceData = () => {
    const now = new Date();
    const devices = new Set<string>();
    
    const relevantCodes = selectedQRCode === 'all'
      ? qrCodes
      : qrCodes.filter(code => code.id === selectedQRCode);

    relevantCodes.forEach(code => {
      code.scans.forEach(scan => {
        const scanDate = new Date(scan.timestamp);
        if (
          (timeRange === 'day' && scanDate.getDate() === now.getDate()) ||
          (timeRange === 'month' && scanDate.getMonth() === now.getMonth()) ||
          (timeRange === 'year' && scanDate.getFullYear() === now.getFullYear())
        ) {
          devices.add(`${code.id}-${scan.device}`);
        }
      });
    });

    return {
      ios: Array.from(devices).filter(d => d.endsWith('ios')).length,
      android: Array.from(devices).filter(d => d.endsWith('android')).length
    };
  };

  const deviceData = getDeviceData();
  const totalDevices = deviceData.ios + deviceData.android;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Smartphone className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold">Unique Device Scans</h2>
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
        <div className="text-center mb-6">
          <span className="text-3xl font-bold text-gray-800">{totalDevices}</span>
          <p className="text-sm text-gray-500">Unique Devices</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="w-full bg-gray-100 rounded-full h-4 mb-2">
              <div
                className="bg-blue-500 h-full rounded-full"
                style={{
                  width: `${totalDevices ? (deviceData.ios / totalDevices) * 100 : 0}%`
                }}
              />
            </div>
            <span className="text-lg font-semibold">{deviceData.ios}</span>
            <p className="text-sm text-gray-500">iOS Devices</p>
          </div>
          <div className="text-center">
            <div className="w-full bg-gray-100 rounded-full h-4 mb-2">
              <div
                className="bg-green-500 h-full rounded-full"
                style={{
                  width: `${totalDevices ? (deviceData.android / totalDevices) * 100 : 0}%`
                }}
              />
            </div>
            <span className="text-lg font-semibold">{deviceData.android}</span>
            <p className="text-sm text-gray-500">Android Devices</p>
          </div>
        </div>
      </div>
    </div>
  );
}