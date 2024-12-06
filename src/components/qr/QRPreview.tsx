import React, { memo } from 'react';
import QRCode from 'qrcode.react';

interface QRPreviewProps {
  id: string;
  value: string;
  size?: number;
  scale?: number;
  includeMargin?: boolean;
}

export const QRPreview = memo(function QRPreview({ 
  id,
  value, 
  size = 128, 
  scale = 4,
  includeMargin = true 
}: QRPreviewProps) {
  return (
    <div className="bg-white p-2 rounded-lg shadow-sm inline-block">
      <QRCode
        id={`qr-${id}`}
        value={value}
        size={size}
        level="H"
        includeMargin={includeMargin}
        renderAs="canvas"
        imageSettings={{
          src: "",
          x: undefined,
          y: undefined,
          height: 24,
          width: 24,
          excavate: true,
        }}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
});