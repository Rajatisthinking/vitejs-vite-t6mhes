import React from 'react';
import { QRCodeCreator } from '../components/qr/QRCodeCreator';
import { QRCodeList } from '../components/qr/QRCodeList';
import { QrCode } from 'lucide-react';

export function QRCodeGenerator() {
  return (
    <div className="ml-64 p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-2 bg-blue-100 rounded-lg">
            <QrCode className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold">Dynamic QR Code Generator</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <QRCodeCreator />
          </div>
          
          <div className="lg:col-span-2">
            <QRCodeList />
          </div>
        </div>
      </div>
    </div>
  );
}