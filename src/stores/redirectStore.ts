import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RedirectStore {
  redirects: Record<string, string>;
  setRedirect: (shortUrl: string, destinationUrl: string) => void;
  getDestinationUrl: (shortUrl: string) => string | null;
}

export const useRedirectStore = create<RedirectStore>()(
  persist(
    (set, get) => ({
      redirects: {},
      setRedirect: (shortUrl, destinationUrl) =>
        set((state) => ({
          redirects: {
            ...state.redirects,
            [shortUrl]: destinationUrl,
          },
        })),
      getDestinationUrl: (shortUrl) => {
        const { redirects } = get();
        return redirects[shortUrl] || null;
      },
    }),
    {
      name: 'qr-redirects',
    }
  )
);