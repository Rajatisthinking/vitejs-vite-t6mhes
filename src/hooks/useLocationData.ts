import { useState } from 'react';
import { LocationData, LocationMetrics, WeeklyData } from '../types/location';

const mockLocations: LocationData[] = [
  {
    id: '1',
    name: 'City Mall',
    type: 'Shopping Mall',
    address: '123 Main Street, Downtown',
    weeklyFootfall: {
      monday: 15000,
      tuesday: 14500,
      wednesday: 16800,
      thursday: 17200,
      friday: 19500,
      saturday: 22000,
      sunday: 18000
    },
    metrics: {
      spendQuotient: 'high',
      totalAddressableMarket: 'high',
      totalHouseholds: 250000,
      householdsAbove10L: 75000,
      affluenceIndicator: 0.8,
      spendingCapacity: 85
    }
  },
  {
    id: '2',
    name: 'Central Plaza',
    type: 'Commercial Complex',
    address: '456 Business Avenue, City Center',
    weeklyFootfall: {
      monday: 12000,
      tuesday: 13500,
      wednesday: 14800,
      thursday: 15200,
      friday: 17500,
      saturday: 19000,
      sunday: 16000
    },
    metrics: {
      spendQuotient: 'medium',
      totalAddressableMarket: 'high',
      totalHouseholds: 180000,
      householdsAbove10L: 45000,
      affluenceIndicator: 0.7,
      spendingCapacity: 75
    }
  }
];

export function useLocationData() {
  const [selectedMonth, setSelectedMonth] = useState('October 2024');
  const [selectedLocationId, setSelectedLocationId] = useState(mockLocations[0].id);

  const selectedLocation = mockLocations.find(loc => loc.id === selectedLocationId) || mockLocations[0];

  const calculateMetrics = (location: LocationData): LocationMetrics => {
    const values = Object.entries(location.weeklyFootfall);
    const totalVisitors = values.reduce((sum, [_, count]) => sum + count, 0);
    const averageDaily = totalVisitors / 7;
    const peakDay = values.reduce((max, [day, count]) => 
      count > max.count ? { day, count } : max,
      { day: '', count: 0 }
    );

    return {
      totalVisitors,
      averageDaily,
      peakDay: {
        day: peakDay.day,
        count: peakDay.count
      },
      weekOverWeekGrowth: 5.2,
      spendQuotient: location.metrics.spendQuotient,
      affluenceIndicator: location.metrics.affluenceIndicator,
      spendingCapacity: location.metrics.spendingCapacity
    };
  };

  const metrics = calculateMetrics(selectedLocation);

  return {
    selectedMonth,
    setSelectedMonth,
    selectedLocation,
    locations: mockLocations,
    setSelectedLocationId,
    metrics
  };
}