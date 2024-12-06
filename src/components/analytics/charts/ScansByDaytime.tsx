import React from 'react';
import { useQRCodeStore } from '../../../stores/qrCodeStore';
import { Clock } from 'lucide-react';

interface ScansByDaytimeProps {
  selectedQRCode: string | 'all';
}

export function ScansByDaytime({ selectedQRCode }: ScansByDaytimeProps) {
  const qrCodes = useQRCodeStore(state => state.qrCodes);

  // Group scans by hour of day
  const scansByHour = Array(24).fill(0);
  
  if (selectedQRCode === 'all') {
    qrCodes.forEach(code => {
      code.scans.forEach(scan => {
        const hour = new Date(scan.timestamp).getHours();
        scansByHour[hour]++;
      });
    });
  } else {
    const selectedCode = qrCodes.find(code => code.id === selectedQRCode);
    if (selectedCode) {
      selectedCode.scans.forEach(scan => {
        const hour = new Date(scan.timestamp).getHours();
        scansByHour[hour]++;
      });
    }
  }

  // Calculate the max value for scaling
  const maxScans = Math.max(...scansByHour);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Clock className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold">Scans by Daytime</h2>
      </div>
      <div className="h-64">
        <div className="flex h-full items-end space-x-2">
          {scansByHour.map((count, hour) => (
            <div
              key={hour}
              className="flex-1 bg-blue-100 hover:bg-blue-200 transition-colors relative group"
              style={{
                height: `${(count / maxScans) * 100}%`,
                minHeight: count > 0 ? '4px' : '0'
              }}
            >
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {count} scans at {hour.toString().padStart(2, '0')}:00
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>00:00</span>
          <span>12:00</span>
          <span>23:59</span>
        </div>
      </div>
    </div>
  );
}