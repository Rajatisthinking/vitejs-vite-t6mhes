import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { QRCode, QRCodeSort, QRCodeAnalytics, QRCodeScan } from '../types/qrcode';

interface QRCodeStore {
  qrCodes: QRCode[];
  sort: QRCodeSort;
  setSort: (sort: QRCodeSort) => void;
  addQRCode: (code: Omit<QRCode, 'id' | 'createdAt' | 'updatedAt' | 'shortUrl' | 'scans'>) => void;
  updateQRCode: (id: string, updates: Partial<Omit<QRCode, 'id' | 'createdAt' | 'shortUrl' | 'scans'>>) => void;
  deleteQRCode: (id: string) => void;
  recordScan: (id: string, device: 'ios' | 'android') => void;
  getAnalytics: () => QRCodeAnalytics;
}

const initialState: Pick<QRCodeStore, 'qrCodes' | 'sort'> = {
  qrCodes: [],
  sort: { field: 'createdAt', direction: 'desc' }
};

export const useQRCodeStore = create<QRCodeStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      setSort: (sort) => set({ sort }),
      addQRCode: (code) => set((state) => {
        const id = crypto.randomUUID();
        const now = new Date().toISOString();
        const shortUrl = `qr-${id.slice(0, 8)}`;
        
        return {
          qrCodes: [...state.qrCodes, {
            ...code,
            id,
            shortUrl,
            createdAt: now,
            updatedAt: now,
            scans: [],
          }]
        };
      }),
      updateQRCode: (id, updates) => set((state) => ({
        qrCodes: state.qrCodes.map((code) =>
          code.id === id
            ? { ...code, ...updates, updatedAt: new Date().toISOString() }
            : code
        )
      })),
      deleteQRCode: (id) => set((state) => ({
        qrCodes: state.qrCodes.filter((code) => code.id !== id)
      })),
      recordScan: (id, device) => set((state) => ({
        qrCodes: state.qrCodes.map((code) =>
          code.id === id
            ? {
                ...code,
                scans: [...(code.scans || []), { timestamp: new Date().toISOString(), device }]
              }
            : code
        )
      })),
      getAnalytics: () => {
        const { qrCodes } = get();
        const analytics: QRCodeAnalytics = {
          totalScans: 0,
          devices: { ios: 0, android: 0 },
          mostScanned: { code: null, count: 0 }
        };

        if (!qrCodes || qrCodes.length === 0) {
          return analytics;
        }

        qrCodes.forEach((code) => {
          if (!code.scans) return;
          
          const scanCount = code.scans.length;
          analytics.totalScans += scanCount;
          
          code.scans.forEach((scan) => {
            if (scan && scan.device) {
              analytics.devices[scan.device]++;
            }
          });

          if (scanCount > analytics.mostScanned.count) {
            analytics.mostScanned = {
              code,
              count: scanCount
            };
          }
        });

        return analytics;
      }
    }),
    {
      name: 'qr-codes',
      version: 1,
      partialize: (state) => ({
        qrCodes: state.qrCodes,
        sort: state.sort
      }),
      migrate: (persistedState: any) => {
        // If the persisted state is empty or invalid, return initial state
        if (!persistedState || typeof persistedState !== 'object') {
          return initialState;
        }

        // Ensure qrCodes is an array
        if (!Array.isArray(persistedState.qrCodes)) {
          persistedState.qrCodes = [];
        }

        // Ensure each QR code has all required fields
        persistedState.qrCodes = persistedState.qrCodes.map((code: any) => ({
          id: code.id || crypto.randomUUID(),
          name: code.name || '',
          url: code.url || '',
          shortUrl: code.shortUrl || `qr-${crypto.randomUUID().slice(0, 8)}`,
          createdAt: code.createdAt || new Date().toISOString(),
          updatedAt: code.updatedAt || new Date().toISOString(),
          scans: Array.isArray(code.scans) ? code.scans : []
        }));

        // Ensure sort has valid values
        if (!persistedState.sort || typeof persistedState.sort !== 'object') {
          persistedState.sort = initialState.sort;
        } else {
          persistedState.sort = {
            field: ['name', 'createdAt', 'updatedAt'].includes(persistedState.sort.field)
              ? persistedState.sort.field
              : initialState.sort.field,
            direction: ['asc', 'desc'].includes(persistedState.sort.direction)
              ? persistedState.sort.direction
              : initialState.sort.direction
          };
        }

        return persistedState;
      }
    }
  )
);