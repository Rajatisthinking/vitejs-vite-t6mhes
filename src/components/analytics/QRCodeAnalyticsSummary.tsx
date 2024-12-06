import React from 'react';
import { Smartphone, Scan, Trophy, Apple } from 'lucide-react';
import { StatCard } from '../dashboard/StatCard';
import { useQRCodeStore } from '../../stores/qrCodeStore';

export function QRCodeAnalyticsSummary() {
  const analytics = useQRCodeStore(state => state.getAnalytics());
  const totalDevices = analytics.devices.ios + analytics.devices.android;
  
  const calculatePercentage = (value: number) => {
    return totalDevices > 0 ? Math.round((value / totalDevices) * 100) : 0;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total QR Code Scans"
        value={analytics.totalScans.toLocaleString()}
        icon={<Scan className="w-6 h-6 text-blue-600" />}
      />
      <StatCard
        title="iOS Devices"
        value={`${calculatePercentage(analytics.devices.ios)}%`}
        icon={<Apple className="w-6 h-6 text-blue-600" />}
        trend={totalDevices > 0 ? {
          value: analytics.devices.ios,
          isPositive: true
        } : undefined}
      />
      <StatCard
        title="Android Devices"
        value={`${calculatePercentage(analytics.devices.android)}%`}
        icon={<Smartphone className="w-6 h-6 text-blue-600" />}
        trend={totalDevices > 0 ? {
          value: analytics.devices.android,
          isPositive: true
        } : undefined}
      />
      <StatCard
        title="Most Scanned QR"
        value={analytics.mostScanned.code?.name || 'No scans yet'}
        icon={<Trophy className="w-6 h-6 text-blue-600" />}
        trend={analytics.mostScanned.code ? {
          value: analytics.mostScanned.count,
          isPositive: true
        } : undefined}
      />
    </div>
  );
}