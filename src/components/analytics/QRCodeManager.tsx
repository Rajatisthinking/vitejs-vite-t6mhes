import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { QrCode, Copy, Download } from 'lucide-react';
import { QRCodeData } from '../../types/qrcode';

const initialQRCodes: QRCodeData[] = [
  {
    id: '1',
    name: 'Summer Campaign Landing',
    url: 'https://example.com/summer2024',
    createdAt: '2024-03-15',
    scans: 1234,
    analytics: {
      devices: { ios: 0, android: 0 },
      scansByDay: []
    }
  },
  {
    id: '2',
    name: 'Product Catalog',
    url: 'https://example.com/catalog',
    createdAt: '2024-03-10',
    scans: 856,
    analytics: {
      devices: { ios: 0, android: 0 },
      scansByDay: []
    }
  }
];

export function QRCodeManager() {
  const [qrCodes, setQRCodes] = useState<QRCodeData[]>(initialQRCodes);
  const [newQRCode, setNewQRCode] = useState({ name: '', url: '' });
  const [selectedQR, setSelectedQR] = useState<QRCodeData | null>(null);
  const [editUrl, setEditUrl] = useState('');

  const handleCreateQR = (e: React.FormEvent) => {
    e.preventDefault();
    const newCode: QRCodeData = {
      id: Date.now().toString(),
      name: newQRCode.name,
      url: newQRCode.url,
      createdAt: new Date().toISOString().split('T')[0],
      scans: 0,
      analytics: {
        devices: { ios: 0, android: 0 },
        scansByDay: []
      }
    };
    setQRCodes([...qrCodes, newCode]);
    setNewQRCode({ name: '', url: '' });
  };

  const handleUpdateUrl = (id: string) => {
    setQRCodes(qrCodes.map(qr => 
      qr.id === id ? { ...qr, url: editUrl } : qr
    ));
    setSelectedQR(null);
    setEditUrl('');
  };

  const downloadQR = (id: string) => {
    const canvas = document.getElementById(`qr-${id}`) as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `qr-code-${id}.png`;
      link.href = url;
      link.click();
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Create New QR Code</h2>
        <form onSubmit={handleCreateQR} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={newQRCode.name}
              onChange={(e) => setNewQRCode({ ...newQRCode, name: e.target.value })}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Destination URL
            </label>
            <input
              type="url"
              value={newQRCode.url}
              onChange={(e) => setNewQRCode({ ...newQRCode, url: e.target.value })}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create QR Code
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Your QR Codes</h2>
        <div className="space-y-4">
          {qrCodes.map((qr) => (
            <div key={qr.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <QRCode
                      id={`qr-${qr.id}`}
                      value={qr.url}
                      size={100}
                      level="H"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{qr.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Created: {qr.createdAt}
                    </p>
                    <p className="text-sm text-gray-600">
                      Scans: {qr.scans}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => copyUrl(qr.url)}
                        className="text-gray-600 hover:text-gray-800"
                        title="Copy URL"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => downloadQR(qr.id)}
                        className="text-gray-600 hover:text-gray-800"
                        title="Download QR Code"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedQR(qr);
                    setEditUrl(qr.url);
                  }}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Edit URL
                </button>
              </div>
              {selectedQR?.id === qr.id && (
                <div className="mt-4 space-y-2">
                  <input
                    type="url"
                    value={editUrl}
                    onChange={(e) => setEditUrl(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleUpdateUrl(qr.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => {
                        setSelectedQR(null);
                        setEditUrl('');
                      }}
                      className="bg-gray-200 text-gray-600 px-3 py-1 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}