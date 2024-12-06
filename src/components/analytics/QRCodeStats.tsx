import React from 'react';
import { useQRCodeStore } from '../../stores/qrCodeStore';
import { QRCode } from '../../types/qrcode';
import { formatDate } from '../../utils/dateUtils';

interface QRCodeStatsProps {
  qrCode: QRCode;
}

export function QRCodeStats({ qrCode }: QRCodeStatsProps) {
  const totalScans = qrCode.scans.length;
  const iosScans = qrCode.scans.filter(scan => scan.device === 'ios').length;
  const androidScans = qrCode.scans.filter(scan => scan.device === 'android').length;

  const lastScan = qrCode.scans[qrCode.scans.length - 1];
  const lastScanDate = lastScan ? formatDate(lastScan.timestamp) : 'No scans yet';

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">{qrCode.name} Statistics</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Created</p>
          <p className="font-medium">{formatDate(qrCode.createdAt)}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Last Scan</p>
          <p className="font-medium">{lastScanDate}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Total Scans</p>
          <p className="font-medium">{totalScans}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Device Distribution</p>
          <div className="flex items-center space-x-2">
            <span className="text-blue-600 font-medium">{iosScans} iOS</span>
            <span className="text-gray-400">/</span>
            <span className="text-green-600 font-medium">{androidScans} Android</span>
          </div>
        </div>
      </div>
    </div>
  );
}