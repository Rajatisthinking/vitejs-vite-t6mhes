import React from 'react';
import { AnalyticsNav } from '../../components/layout/AnalyticsNav';
import { MonthSelector } from '../../components/analytics/location/MonthSelector';
import { LocationSelector } from '../../components/analytics/location/LocationSelector';
import { WeeklyFootfallChart } from '../../components/analytics/location/WeeklyFootfallChart';
import { MetricsCards } from '../../components/analytics/location/MetricsCards';
import { useLocationData } from '../../hooks/useLocationData';

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
      </div>
    </div>
  );
}