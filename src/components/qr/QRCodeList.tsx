import React, { useState, useMemo } from 'react';
import { useQRCodeStore } from '../../stores/qrCodeStore';
import { QRPreview } from './QRPreview';
import { Search, Clock, Download, Copy, Link, CheckCircle, Trash2, Edit2, ArrowUpDown } from 'lucide-react';
import { QRCodeSort } from '../../types/qrcode';

export function QRCodeList() {
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editUrl, setEditUrl] = useState('');
  
  const { qrCodes, updateQRCode, deleteQRCode, sort, setSort } = useQRCodeStore();

  const handleSort = (field: QRCodeSort['field']) => {
    setSort({
      field,
      direction: sort.field === field && sort.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const sortedAndFilteredCodes = useMemo(() => {
    let filtered = qrCodes.filter(code => 
      code.name.toLowerCase().includes(search.toLowerCase()) ||
      code.url.toLowerCase().includes(search.toLowerCase())
    );

    return filtered.sort((a, b) => {
      const modifier = sort.direction === 'asc' ? 1 : -1;
      if (sort.field === 'name') {
        return a.name.localeCompare(b.name) * modifier;
      }
      return (new Date(a[sort.field]).getTime() - new Date(b[sort.field]).getTime()) * modifier;
    });
  }, [qrCodes, search, sort]);

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleEdit = (id: string) => {
    const qrCode = qrCodes.find(code => code.id === id);
    if (qrCode) {
      setEditName(qrCode.name);
      setEditUrl(qrCode.url);
      setEditingId(id);
    }
  };

  const handleUpdate = (id: string) => {
    updateQRCode(id, { name: editName, url: editUrl });
    setEditingId(null);
    setEditName('');
    setEditUrl('');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this QR code?')) {
      deleteQRCode(id);
    }
  };

  const handleDownload = (code: { id: string; name: string; url: string }) => {
    const canvas = document.getElementById(`qr-${code.id}`) as HTMLCanvasElement;
    if (canvas) {
      const scale = 4;
      const scaledCanvas = document.createElement('canvas');
      const ctx = scaledCanvas.getContext('2d');
      
      if (ctx) {
        scaledCanvas.width = canvas.width * scale;
        scaledCanvas.height = canvas.height * scale;
        ctx.scale(scale, scale);
        ctx.drawImage(canvas, 0, 0);
        
        const url = scaledCanvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `qr-${code.name.toLowerCase().replace(/\s+/g, '-')}.png`;
        link.href = url;
        link.click();
      }
    }
  };

  const getShortUrl = (shortUrl: string) => {
    return `${window.location.origin}/qr/${shortUrl}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search QR codes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handleSort('name')}
            className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowUpDown className="w-4 h-4 mr-1" />
            Name
          </button>
          <button
            onClick={() => handleSort('createdAt')}
            className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowUpDown className="w-4 h-4 mr-1" />
            Date
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {sortedAndFilteredCodes.map((code) => (
          <div key={code.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-6">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <QRPreview 
                    id={code.id}
                    value={getShortUrl(code.shortUrl)} 
                    size={150} 
                    scale={4} 
                  />
                </div>
                
                <div className="space-y-3">
                  {editingId === code.id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full text-lg font-medium rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                      <input
                        type="url"
                        value={editUrl}
                        onChange={(e) => setEditUrl(e.target.value)}
                        placeholder="New destination URL"
                        className="w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleUpdate(code.id)}
                          className="px-3 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditName('');
                            setEditUrl('');
                          }}
                          className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-medium">{code.name}</h3>
                      <button
                        onClick={() => handleEdit(code.id)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                        title="Edit name and URL"
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
                  )}

                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    Created: {new Date(code.createdAt).toLocaleDateString()}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Destination URL:</span>
                      <button
                        onClick={() => handleCopy(code.url, `url-${code.id}`)}
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                      >
                        {copiedId === `url-${code.id}` ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Link className="w-4 h-4" />
                        )}
                        <span className="max-w-xs truncate">{code.url}</span>
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Short URL:</span>
                      <button
                        onClick={() => handleCopy(getShortUrl(code.shortUrl), `short-${code.id}`)}
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                      >
                        {copiedId === `short-${code.id}` ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                        <span>{getShortUrl(code.shortUrl)}</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDownload(code)}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download High Quality</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {sortedAndFilteredCodes.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No QR codes found
          </div>
        )}
      </div>
    </div>
  );
}