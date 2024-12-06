import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { StatCard } from './StatCard';
import { useCampaignStore } from '../../stores/campaignStore';

export function MetricsOverview() {
  const metrics = useCampaignStore(state => state.getMetrics());

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <StatCard
        title="Total Venues"
        value={metrics.totalVenues}
        icon={<MapPin className="w-6 h-6 text-blue-600" />}
      />
      <StatCard
        title="Active Locations"
        value={metrics.activeLocations}
        icon={<Navigation className="w-6 h-6 text-blue-600" />}
      />
    </div>
  );
}