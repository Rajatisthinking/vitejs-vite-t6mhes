import React from 'react';
import { QRCodeStyle } from '../../types/qr';
import { Image } from 'lucide-react';

interface QRCodeStylerProps {
  style: QRCodeStyle;
  onChange: (style: QRCodeStyle) => void;
}

export function QRCodeStyler({ style, onChange }: QRCodeStylerProps) {
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange({
          ...style,
          logoUrl: event.target?.result as string,
          logoSize: 24
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Customize Appearance</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Foreground Color
          </label>
          <input
            type="color"
            value={style.foreground}
            onChange={(e) => onChange({ ...style, foreground: e.target.value })}
            className="w-full h-10 rounded-lg cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Background Color
          </label>
          <input
            type="color"
            value={style.background}
            onChange={(e) => onChange({ ...style, background: e.target.value })}
            className="w-full h-10 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-2">Corner Style</label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              checked={style.cornerStyle === 'square'}
              onChange={() => onChange({ ...style, cornerStyle: 'square' })}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Square</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              checked={style.cornerStyle === 'round'}
              onChange={() => onChange({ ...style, cornerStyle: 'round' })}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Round</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-2">Logo (optional)</label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
            <Image className="w-4 h-4 mr-2" />
            <span className="text-sm text-gray-700">Upload Logo</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
          </label>
          {style.logoUrl && (
            <button
              onClick={() => onChange({ ...style, logoUrl: undefined, logoSize: undefined })}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Remove Logo
            </button>
          )}
        </div>
        {style.logoUrl && (
          <div className="mt-2">
            <label className="block text-sm text-gray-600 mb-1">Logo Size</label>
            <input
              type="range"
              min="16"
              max="64"
              value={style.logoSize || 24}
              onChange={(e) => onChange({ ...style, logoSize: Number(e.target.value) })}
              className="w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}