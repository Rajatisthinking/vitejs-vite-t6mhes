import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Location {
  id: string;
  name: string;
  type: string;
  address: string;
  status: 'active' | 'inactive';
}

export interface Venue {
  id: string;
  name: string;
  location: string;
  capacity: string;
  availability: string;
  status: 'available' | 'occupied' | 'maintenance';
}

export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'pending';
  venue: string;
  startDate: string;
  endDate: string;
}

interface CampaignStore {
  campaigns: Campaign[];
  venues: Venue[];
  locations: Location[];
  addCampaign: (campaign: Omit<Campaign, 'id'>) => void;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;
  addVenue: (venue: Omit<Venue, 'id'>) => void;
  updateVenue: (id: string, updates: Partial<Venue>) => void;
  deleteVenue: (id: string) => void;
  addLocation: (location: Omit<Location, 'id'>) => void;
  updateLocation: (id: string, updates: Partial<Location>) => void;
  deleteLocation: (id: string) => void;
  getMetrics: () => {
    activeCampaigns: number;
    totalVenues: number;
    activeLocations: number;
  };
}

export const useCampaignStore = create<CampaignStore>()(
  persist(
    (set, get) => ({
      campaigns: [],
      venues: [],
      locations: [],

      addCampaign: (campaign) => set((state) => ({
        campaigns: [...state.campaigns, { ...campaign, id: crypto.randomUUID() }]
      })),

      updateCampaign: (id, updates) => set((state) => ({
        campaigns: state.campaigns.map((campaign) =>
          campaign.id === id ? { ...campaign, ...updates } : campaign
        )
      })),

      deleteCampaign: (id) => set((state) => ({
        campaigns: state.campaigns.filter((campaign) => campaign.id !== id)
      })),

      addVenue: (venue) => set((state) => ({
        venues: [...state.venues, { ...venue, id: crypto.randomUUID() }]
      })),

      updateVenue: (id, updates) => set((state) => ({
        venues: state.venues.map((venue) =>
          venue.id === id ? { ...venue, ...updates } : venue
        )
      })),

      deleteVenue: (id) => set((state) => ({
        venues: state.venues.filter((venue) => venue.id !== id)
      })),

      addLocation: (location) => set((state) => ({
        locations: [...state.locations, { ...location, id: crypto.randomUUID() }]
      })),

      updateLocation: (id, updates) => set((state) => ({
        locations: state.locations.map((location) =>
          location.id === id ? { ...location, ...updates } : location
        )
      })),

      deleteLocation: (id) => set((state) => ({
        locations: state.locations.filter((location) => location.id !== id)
      })),

      getMetrics: () => {
        const { campaigns, venues, locations } = get();
        return {
          activeCampaigns: campaigns.filter(c => c.status === 'active').length,
          totalVenues: venues.length,
          activeLocations: locations.filter(l => l.status === 'active').length
        };
      }
    }),
    {
      name: 'campaign-store',
      version: 1,
    }
  )
);