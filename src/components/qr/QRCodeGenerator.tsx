import React, { useState } from 'react';
import { QRCodeStyler } from './QRCodeStyler';
import { QRCodePreview } from './QRCodePreview';
import { QRCodeDownloader } from './QRCodeDownloader';
import { useQRStore } from '../../stores/qrStore';
import { QRCodeStyle } from '../../types/qr';
import { AlertCircle } from 'lucide-react';

const defaultStyle: QRCodeStyle = {
  foreground: '#000000',
  background: '#FFFFFF',
  cornerStyle: 'square',
};

export function QRCodeGenerator() {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [style, setStyle] = useState<QRCodeStyle>(defaultStyle);
  const [error, setError] = useState('');
  const addCode = useQRStore((state) => state.addCode);

  const validateUrl = (input: string): string | null => {
    try {
      const urlToValidate = input.match(/^https?:\/\//) ? input : `https://${input}`;
      new URL(urlToValidate);
      return urlToValidate;
    } catch {
      return null;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validUrl = validateUrl(url);
    if (!validUrl) {
      setError('Please enter a valid URL');
      return;
    }

    addCode({
      name,
      url: validUrl,
      shortUrl: `qr-${crypto.randomUUID().slice(0, 8)}`,
      style
    });

    setName('');
    setUrl('');
    setStyle(defaultStyle);
    setError('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Create Dynamic QR Code</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              QR Code Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g., Product Landing Page"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Destination URL
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError('');
              }}
              className={`w-full rounded-lg shadow-sm focus:ring-blue-500 ${
                error ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
              placeholder="example.com or https://example.com"
              required
            />
            {error && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {error}
              </p>
            )}
          </div>

          <QRCodeStyler style={style} onChange={setStyle} />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Generate QR Code
          </button>
        </form>

        <div className="space-y-6">
          {url && !error && (
            <>
              <QRCodePreview
                value={validateUrl(url) || url}
                style={style}
                size={300}
              />
              <QRCodeDownloader
                value={validateUrl(url) || url}
                style={style}
                filename={name || 'qr-code'}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}