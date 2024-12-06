import React from 'react';
import { useQRCodeStore } from '../../stores/qrCodeStore';
import { ChevronDown } from 'lucide-react';

export function QRCodeSelector({ selectedId, onSelect }: {
  selectedId: string | 'all';
  onSelect: (id: string | 'all') => void;
}) {
  const qrCodes = useQRCodeStore(state => state.qrCodes);

  return (
    <div className="relative">
      <select
        value={selectedId}
        onChange={(e) => onSelect(e.target.value)}
        className="appearance-none w-full bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="all">All QR Codes</option>
        {qrCodes.map(code => (
          <option key={code.id} value={code.id}>
            {code.name}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
    </div>
  );
}