export interface Restaurant {
  id: string;
  name: string;
  type: string;
  location: string;
  weeklyData: {
    busyness: {
      monday: number;
      tuesday: number;
      wednesday: number;
      thursday: number;
      friday: number;
      saturday: number;
      sunday: number;
    };
    peaks: {
      time: string;
      value: number;
      rank: number;
    }[];
    averages: {
      period: string;
      value: number;
      rank: number;
    }[];
  };
  audienceTypes: {
    type: string;
    percentage: number;
  }[];
  psychographics: {
    personalities: string[];
    lifestyle: string[];
    values: string[];
  };
}

export interface VenueMetrics {
  activeVenues: number;
  avgServiceDuration: string;
}