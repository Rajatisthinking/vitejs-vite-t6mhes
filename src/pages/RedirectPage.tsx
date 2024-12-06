import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQRCodeStore } from '../stores/qrCodeStore';

export function RedirectPage() {
  const { shortUrl } = useParams<{ shortUrl: string }>();
  const navigate = useNavigate();
  const qrCodes = useQRCodeStore(state => state.qrCodes);
  const recordScan = useQRCodeStore(state => state.recordScan);

  useEffect(() => {
    if (!shortUrl) {
      navigate('/');
      return;
    }

    const qrCode = qrCodes.find(code => code.shortUrl === shortUrl);
    if (!qrCode) {
      navigate('/');
      return;
    }

    // Record the scan with a basic device detection
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    recordScan(qrCode.id, isIOS ? 'ios' : 'android');

    // Redirect to the destination URL
    window.location.href = qrCode.url;
  }, [shortUrl, qrCodes, navigate, recordScan]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
        <p className="text-gray-600">Please wait while we redirect you to your destination.</p>
      </div>
    </div>
  );
}