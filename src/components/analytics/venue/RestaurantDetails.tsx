import React from 'react';
import { Restaurant } from '../../../types/venue';
import { WeekBusynessChart } from './WeekBusynessChart';
import { AudienceDistribution } from './AudienceDistribution';
import { PeaksTable } from './PeaksTable';
import { AveragesTable } from './AveragesTable';
import { PsychographicsPanel } from './PsychographicsPanel';

interface RestaurantDetailsProps {
  restaurant: Restaurant;
}

export function RestaurantDetails({ restaurant }: RestaurantDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Week Busyness</h2>
        <WeekBusynessChart data={restaurant.weeklyData.busyness} />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Audience Distribution</h2>
        <AudienceDistribution data={restaurant.audienceTypes} />
      </div>

      <PsychographicsPanel
        personalities={restaurant.psychographics.personalities}
        lifestyle={restaurant.psychographics.lifestyle}
        values={restaurant.psychographics.values}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Week Peaks</h2>
          <PeaksTable peaks={restaurant.weeklyData.peaks} />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Week Average Overview</h2>
          <AveragesTable averages={restaurant.weeklyData.averages} />
        </div>
      </div>
    </div>
  );
}