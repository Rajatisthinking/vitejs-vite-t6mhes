import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Location {
  id: string;
  name: string;
  type: string;
  address: string;
}

interface LocationsListProps {
  locations: Location[];
}

export function LocationsList({ locations }: LocationsListProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <MapPin className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold">Active Locations</h2>
        </div>
        <Link
          to="/analytics"
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1"
        >
          <span>Explore Analytics</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="space-y-3">
        {locations.map((location) => (
          <div key={location.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
            <div>
              <h3 className="font-medium">{location.name}</h3>
              <p className="text-sm text-gray-600">{location.type}</p>
              <p className="text-xs text-gray-500 mt-1">{location.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}