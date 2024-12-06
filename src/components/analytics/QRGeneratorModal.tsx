import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { X, Download, Copy } from 'lucide-react';

interface QRGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QRGeneratorModal({ isOpen, onClose }: QRGeneratorModalProps) {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleDownload = () => {
    const canvas = document.getElementById('qr-canvas') as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `qr-code-${name || 'generated'}.png`;
      link.href = url;
      link.click();
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Generate QR Code</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="QR Code Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="https://example.com"
            />
          </div>

          {url && (
            <div className="flex flex-col items-center space-y-4 mt-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <QRCode
                  id="qr-canvas"
                  value={url}
                  size={200}
                  level="H"
                />
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={handleDownload}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
                <button
                  onClick={handleCopyUrl}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy URL</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}