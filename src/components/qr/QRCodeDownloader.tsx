import React from 'react';
import QRCode from 'qrcode.react';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import { QRCodeStyle } from '../../types/qr';
import { Download } from 'lucide-react';

interface QRCodeDownloaderProps {
  value: string;
  style: QRCodeStyle;
  filename: string;
}

export function QRCodeDownloader({ value, style, filename }: QRCodeDownloaderProps) {
  const getCanvas = (): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    const scale = 4; // High resolution scale
    canvas.width = 300 * scale;
    canvas.height = 300 * scale;
    
    const qr = (
      <QRCode
        value={value}
        size={300 * scale}
        level="H"
        fgColor={style.foreground}
        bgColor={style.background}
        imageSettings={style.logoUrl ? {
          src: style.logoUrl,
          height: (style.logoSize || 24) * scale,
          width: (style.logoSize || 24) * scale,
          excavate: true,
        } : undefined}
      />
    );

    // Render QR code to canvas
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = style.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    return canvas;
  };

  const downloadPNG = () => {
    const canvas = getCanvas();
    canvas.toBlob((blob) => {
      if (blob) {
        saveAs(blob, `${filename}.png`);
      }
    });
  };

  const downloadSVG = () => {
    const svgString = document.querySelector('svg')?.outerHTML;
    if (svgString) {
      const blob = new Blob([svgString], { type: 'image/svg+xml' });
      saveAs(blob, `${filename}.svg`);
    }
  };

  const downloadPDF = () => {
    const canvas = getCanvas();
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();
    const qrSize = Math.min(width, height) * 0.8;
    const x = (width - qrSize) / 2;
    const y = (height - qrSize) / 2;

    pdf.addImage(canvas.toDataURL(), 'PNG', x, y, qrSize, qrSize);
    pdf.save(`${filename}.pdf`);
  };

  return (
    <div className="flex flex-col space-y-2">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Download Options</h3>
      <div className="flex space-x-2">
        <button
          onClick={downloadPNG}
          className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          PNG
        </button>
        <button
          onClick={downloadSVG}
          className="flex items-center px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          SVG
        </button>
        <button
          onClick={downloadPDF}
          className="flex items-center px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          PDF
        </button>
      </div>
    </div>
  );
}