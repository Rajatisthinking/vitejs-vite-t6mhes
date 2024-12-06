import React, { useState } from 'react';
import { useQRStore } from '../../stores/qrStore';
import { QRCodePreview } from './QRCodePreview';
import { QRCodeDownloader } from './QRCodeDownloader';
import { Edit2, Trash2, ExternalLink, BarChart } from 'lucide-react';

export function QRCodeManager() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editUrl, setEditUrl] = useState('');
  const { codes, updateUrl, deleteCode } = useQRStore();

  const handleUpdateUrl = (id: string) => {
    try {
      new URL(editUrl);
      updateUrl(id, editUrl);
      setEditingId(null);
      setEditUrl('');
    } catch {
      alert('Please enter a valid URL');
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this QR code?')) {
      deleteCode(id);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Your QR Codes</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {codes.map((code) => (
          <div key={code.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium">{code.name}</h3>
                <p className="text-sm text-gray-500">
                  Created: {new Date(code.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditingId(code.id);
                    setEditUrl(code.url);
                  }}
                  className="p-1 text-gray-400 hover:text-gray-600"
                  title="Edit URL"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(code.id)}
                  className="p-1 text-gray-400 hover:text-red-600"
                  title="Delete QR code"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <QRCodePreview
                value={code.url}
                style={code.style}
                size={200}
              />
              
              <div className="space-y-4">
                {editingId === code.id ? (
                  <div className="space-y-2">
                    <input
                      type="url"
                      value={editUrl}
                      onChange={(e) => setEditUrl(e.target.value)}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="https://example.com"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUpdateUrl(code.id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Destination URL:</span>
                      <a
                        href={code.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Visit
                      </a>
                    </div>
                    <input
                      type="text"
                      value={code.url}
                      readOnly
                      className="w-full rounded-lg border-gray-300 bg-gray-50 text-sm"
                    />
                  </div>
                )}

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <BarChart className="w-4 h-4" />
                  <span>{code.scans} scans</span>
                </div>

                <QRCodeDownloader
                  value={code.url}
                  style={code.style}
                  filename={code.name}
                />
              </div>
            </div>
          </div>
        ))}

        {codes.length === 0 && (
          <div className="col-span-2 text-center py-12 text-gray-500">
            No QR codes yet. Create one to get started!
          </div>
        )}
      </div>
    </div>
  );
}