import React from 'react';
import { Building2, Users, Calendar } from 'lucide-react';

interface Venue {
  id: string;
  name: string;
  location: string;
  capacity: string;
  availability: string;
  status: 'available' | 'occupied' | 'maintenance';
}

interface VenuesListProps {
  venues: Venue[];
}

export function VenuesList({ venues }: VenuesListProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Active Campaign Venues</h2>
      <div className="space-y-4">
        {venues.map((venue) => (
          <div key={venue.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">{venue.name}</h3>
                  <p className="text-sm text-gray-600">{venue.location}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                venue.status === 'available' ? 'bg-green-100 text-green-800' :
                venue.status === 'occupied' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {venue.status.charAt(0).toUpperCase() + venue.status.slice(1)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                Capacity: {venue.capacity}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                {venue.availability}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}