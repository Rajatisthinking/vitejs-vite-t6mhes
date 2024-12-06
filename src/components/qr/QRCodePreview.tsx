import React from 'react';
import QRCode from 'qrcode.react';
import { QRCodeStyle } from '../../types/qr';

interface QRCodePreviewProps {
  value: string;
  style: QRCodeStyle;
  size?: number;
}

export function QRCodePreview({ value, style, size = 300 }: QRCodePreviewProps) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <QRCode
          value={value}
          size={size}
          level="H"
          fgColor={style.foreground}
          bgColor={style.background}
          imageSettings={style.logoUrl ? {
            src: style.logoUrl,
            height: style.logoSize || 24,
            width: style.logoSize || 24,
            excavate: true,
          } : undefined}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>
      
      <div className="w-full">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={value}
            readOnly
            className="flex-1 rounded-lg border-gray-300 bg-gray-50 text-sm"
          />
          <button
            onClick={() => navigator.clipboard.writeText(value)}
            className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm"
          >
            Copy URL
          </button>
        </div>
      </div>
    </div>
  );
}