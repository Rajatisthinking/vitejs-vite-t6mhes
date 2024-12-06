import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { QRCodeStore, QRCodeData } from '../types/qr';

export const useQRStore = create<QRCodeStore>()(
  persist(
    (set) => ({
      codes: [],
      addCode: (code) => set((state) => {
        const id = crypto.randomUUID();
        const now = new Date().toISOString();
        return {
          codes: [...state.codes, {
            ...code,
            id,
            createdAt: now,
            updatedAt: now,
            scans: 0
          }]
        };
      }),
      updateUrl: (id, url) => set((state) => ({
        codes: state.codes.map((code) =>
          code.id === id
            ? { ...code, url, updatedAt: new Date().toISOString() }
            : code
        )
      })),
      updateStyle: (id, style) => set((state) => ({
        codes: state.codes.map((code) =>
          code.id === id
            ? { ...code, style: { ...code.style, ...style }, updatedAt: new Date().toISOString() }
            : code
        )
      })),
      deleteCode: (id) => set((state) => ({
        codes: state.codes.filter((code) => code.id !== id)
      })),
      incrementScans: (id) => set((state) => ({
        codes: state.codes.map((code) =>
          code.id === id
            ? { ...code, scans: code.scans + 1 }
            : code
        )
      }))
    }),
    {
      name: 'qr-store',
      version: 1
    }
  )
);