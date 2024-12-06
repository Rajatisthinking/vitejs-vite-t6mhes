import React from 'react';
import { AnalyticsNav } from '../../components/layout/AnalyticsNav';
import { MonthSelector } from '../../components/analytics/location/MonthSelector';
import { LocationSelector } from '../../components/analytics/location/LocationSelector';
import { WeeklyFootfallChart } from '../../components/analytics/location/WeeklyFootfallChart';
import { MetricsCards } from '../../components/analytics/location/MetricsCards';
import { ShoppersOriginTable } from '../../components/analytics/location/ShoppersOriginTable';
import { useLocationData } from '../../hooks/useLocationData';

const mockShopperOrigins = [
  { location: 'Downtown Area', percentage: 35 },
  { location: 'Suburban Districts', percentage: 25 },
  { location: 'Neighboring Cities', percentage: 20 },
  { location: 'Business District', percentage: 15 },
  { location: 'Other Regions', percentage: 5 }
];

export function LocationAnalytics() {
  const { 
    selectedMonth, 
    setSelectedMonth, 
    selectedLocation, 
    locations,
    setSelectedLocationId,
    metrics 
  } = useLocationData();

  return (
    <div className="ml-64 p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Location Analytics</h1>
        <AnalyticsNav />
        
        <LocationSelector
          locations={locations}
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocationId}
        />

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <MonthSelector
            selectedMonth={selectedMonth}
            onMonthChange={setSelectedMonth}
          />
          <WeeklyFootfallChart data={selectedLocation.weeklyFootfall} />
        </div>

        <MetricsCards metrics={metrics} />

        <div className="mt-6">
          <ShoppersOriginTable data={mockShopperOrigins} />
        </div>
      </div>
    </div>
  );
}