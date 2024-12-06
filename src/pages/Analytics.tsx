import React from 'react';
import { AnalyticsNav } from '../components/layout/AnalyticsNav';
import { MetricsOverview } from '../components/dashboard/MetricsOverview';
import { QRCodeAnalyticsSummary } from '../components/analytics/QRCodeAnalyticsSummary';
import { ScansByDaytime } from '../components/analytics/charts/ScansByDaytime';
import { TotalUsersGraph } from '../components/analytics/charts/TotalUsersGraph';
import { UniqueDeviceScans } from '../components/analytics/charts/UniqueDeviceScans';
import { QRCodeSelector } from '../components/analytics/QRCodeSelector';
import { QRCodeStats } from '../components/analytics/QRCodeStats';
import { useQRCodeStore } from '../stores/qrCodeStore';
import { useState } from 'react';

export function Analytics() {
  const [selectedQRCode, setSelectedQRCode] = useState<string | 'all'>('all');
  const qrCodes = useQRCodeStore(state => state.qrCodes);
  const selectedCode = qrCodes.find(code => code.id === selectedQRCode);

  return (
    <div className="ml-64 p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Analytics Overview</h1>
        <AnalyticsNav />
        
        <MetricsOverview />

        <div className="mb-6">
          <QRCodeSelector
            selectedId={selectedQRCode}
            onSelect={setSelectedQRCode}
          />
        </div>

        {selectedCode ? (
          <QRCodeStats qrCode={selectedCode} />
        ) : (
          <QRCodeAnalyticsSummary />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ScansByDaytime selectedQRCode={selectedQRCode} />
          <UniqueDeviceScans selectedQRCode={selectedQRCode} />
        </div>

        <div className="mb-8">
          <TotalUsersGraph selectedQRCode={selectedQRCode} />
        </div>
      </div>
    </div>
  );
}