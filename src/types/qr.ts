export interface QRCodeStyle {
  foreground: string;
  background: string;
  cornerStyle: 'square' | 'round';
  logoUrl?: string;
  logoSize?: number;
}

export interface QRCodeData {
  id: string;
  name: string;
  url: string;
  shortUrl: string;
  style: QRCodeStyle;
  createdAt: string;
  updatedAt: string;
  scans: number;
}

export interface QRCodeStore {
  codes: QRCodeData[];
  addCode: (code: Omit<QRCodeData, 'id' | 'createdAt' | 'updatedAt' | 'scans'>) => void;
  updateUrl: (id: string, url: string) => void;
  updateStyle: (id: string, style: Partial<QRCodeStyle>) => void;
  deleteCode: (id: string) => void;
  incrementScans: (id: string) => void;
}