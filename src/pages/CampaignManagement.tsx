import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { MetricsOverview } from '../components/dashboard/MetricsOverview';
import { CampaignList } from '../components/dashboard/CampaignList';
import { PackageInfo } from '../components/dashboard/PackageInfo';
import { LocationsList } from '../components/dashboard/LocationsList';
import { VenuesList } from '../components/dashboard/VenuesList';
import { useCampaignStore } from '../stores/campaignStore';

export function CampaignManagement() {
  const { campaigns, venues, locations } = useCampaignStore();
  const activeCampaigns = campaigns.filter(c => c.status === 'active');
  const completedCampaigns = campaigns.filter(c => c.status === 'completed');

  return (
    <div className="ml-64 p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Campaign Management</h1>
        
        <MetricsOverview />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Create a New Campaign</h2>
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <PlusCircle className="w-5 h-5" />
                  <span>New Campaign</span>
                </button>
              </div>
            </div>

            <CampaignList 
              title="Active Campaigns" 
              campaigns={activeCampaigns}
            />
            
            <VenuesList venues={venues} />
            
            <CampaignList 
              title="Campaign History" 
              campaigns={completedCampaigns}
            />
          </div>

          <div className="space-y-6">
            <PackageInfo />
            <LocationsList locations={locations} />
          </div>
        </div>
      </div>
    </div>
  );
}