export interface WeeklyData {
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
}

export interface LocationData {
  id: string;
  name: string;
  type: string;
  address: string;
  weeklyFootfall: WeeklyData;
  metrics: {
    spendQuotient: 'high' | 'medium' | 'low';
    totalAddressableMarket: 'high' | 'medium' | 'low';
    totalHouseholds: number;
    householdsAbove10L: number;
    affluenceIndicator: number;
    spendingCapacity: number;
  };
}

export interface LocationMetrics {
  totalVisitors: number;
  averageDaily: number;
  peakDay: {
    day: string;
    count: number;
  };
  weekOverWeekGrowth: number;
  spendQuotient: 'high' | 'medium' | 'low';
  affluenceIndicator: number;
  spendingCapacity: number;
}