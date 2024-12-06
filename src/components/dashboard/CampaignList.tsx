import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { calculateDuration } from '../../utils/dateUtils';

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'pending';
  venue: string;
  startDate: string;
  endDate: string;
}

interface CampaignListProps {
  campaigns: Campaign[];
  title: string;
}

export function CampaignList({ campaigns, title }: CampaignListProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{campaign.name}</h3>
                <div className="flex items-center text-gray-600 text-sm mt-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {campaign.venue}
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                campaign.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 text-sm mt-3 space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {campaign.startDate} - {campaign.endDate}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Duration: {calculateDuration(campaign.startDate, campaign.endDate)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}