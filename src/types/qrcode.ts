export interface QRCodeScan {
  timestamp: string;
  device: 'ios' | 'android';
}

export interface QRCode {
  id: string;
  name: string;
  url: string;
  shortUrl: string;
  createdAt: string;
  updatedAt: string;
  scans: QRCodeScan[];
}

export interface QRCodeSort {
  field: 'name' | 'createdAt' | 'updatedAt';
  direction: 'asc' | 'desc';
}

export interface QRCodeAnalytics {
  totalScans: number;
  devices: {
    ios: number;
    android: number;
  };
  mostScanned: {
    code: QRCode | null;
    count: number;
  };
}