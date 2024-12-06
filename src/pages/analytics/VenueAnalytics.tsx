import React from 'react';
import { Building2, Clock } from 'lucide-react';
import { StatCard } from '../../components/dashboard/StatCard';
import { AnalyticsNav } from '../../components/layout/AnalyticsNav';
import { RestaurantList } from '../../components/analytics/venue/RestaurantList';
import { RestaurantDetails } from '../../components/analytics/venue/RestaurantDetails';
import { useVenueData } from '../../hooks/useVenueData';

export function VenueAnalytics() {
  const { restaurants, selectedRestaurant, setSelectedRestaurantId, metrics } = useVenueData();

  return (
    <div className="ml-64 p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Venue Analytics</h1>
        <AnalyticsNav />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <StatCard
            title="Active Venues"
            value={metrics.activeVenues}
            icon={<Building2 className="w-6 h-6 text-blue-600" />}
          />
          <StatCard
            title="Avg. Service Duration"
            value={metrics.avgServiceDuration}
            icon={<Clock className="w-6 h-6 text-blue-600" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <RestaurantList
              restaurants={restaurants}
              selectedId={selectedRestaurant?.id}
              onSelect={setSelectedRestaurantId}
            />
          </div>
          <div className="lg:col-span-2">
            {selectedRestaurant ? (
              <RestaurantDetails restaurant={selectedRestaurant} />
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-6 text-center text-gray-500">
                Select a restaurant to view detailed statistics
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}