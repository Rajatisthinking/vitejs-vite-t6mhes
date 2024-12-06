import React, { useState } from 'react';
import { useQRCodeStore } from '../../stores/qrCodeStore';
import { QRPreview } from './QRPreview';
import { AlertCircle } from 'lucide-react';

export function QRCodeCreator() {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const addQRCode = useQRCodeStore(state => state.addQRCode);

  const validateUrl = (value: string) => {
    try {
      const urlToValidate = value.match(/^https?:\/\//) ? value : `https://${value}`;
      new URL(urlToValidate);
      return urlToValidate;
    } catch {
      return null;
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    if (value && !validateUrl(value)) {
      setUrlError('Please enter a valid URL (e.g., example.com or https://example.com)');
    } else {
      setUrlError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validatedUrl = validateUrl(url);
    if (!validatedUrl) {
      setUrlError('Please enter a valid URL');
      return;
    }

    addQRCode({ name, url: validatedUrl });
    setName('');
    setUrl('');
    setUrlError('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Create New QR Code</h2>
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
            onChange={handleUrlChange}
            className={`w-full rounded-lg shadow-sm focus:ring-blue-500 ${
              urlError 
                ? 'border-red-300 focus:border-red-500' 
                : 'border-gray-300 focus:border-blue-500'
            }`}
            placeholder="example.com or https://example.com"
            required
          />
          {urlError && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {urlError}
            </p>
          )}
        </div>

        {url && !urlError && (
          <div className="border-t pt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Preview</h3>
            <QRPreview value={validateUrl(url) || ''} size={200} scale={4} />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Generate QR Code
        </button>
      </form>
    </div>
  );
}