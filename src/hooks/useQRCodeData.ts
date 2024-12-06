import { useState, useEffect } from 'react';
import { QRCodeData, QRCodeAnalytics } from '../types/qrcode';

export function useQRCodeData() {
  const [qrCodesData, setQRCodesData] = useState<QRCodeData[]>([]);
  const [analytics, setAnalytics] = useState<QRCodeAnalytics>({
    totalScans: 0,
    devices: {
      ios: 0,
      android: 0
    },
    topPerforming: null
  });

  useEffect(() => {
    // In a real application, this would fetch data from an API
    // For now, we'll leave it empty as we're removing demo data
    const fetchData = async () => {
      try {
        // Fetch QR code data
        // const response = await fetch('/api/qr-codes');
        // const data = await response.json();
        // setQRCodesData(data);
      } catch (error) {
        console.error('Error fetching QR code data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Calculate analytics based on QR codes data
    const calculateAnalytics = () => {
      const totalScans = qrCodesData.reduce((total, qr) => total + qr.scans, 0);
      const devices = qrCodesData.reduce(
        (acc, qr) => ({
          ios: acc.ios + qr.analytics.devices.ios,
          android: acc.android + qr.analytics.devices.android
        }),
        { ios: 0, android: 0 }
      );
      const topPerforming = qrCodesData.reduce((top, current) => 
        (!top || current.scans > top.scans) ? current : top, null as QRCodeData | null);

      setAnalytics({ totalScans, devices, topPerforming });
    };

    calculateAnalytics();
  }, [qrCodesData]);

  return { qrCodesData, analytics };
}