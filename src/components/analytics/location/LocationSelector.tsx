import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { LocationData } from '../../../types/location';

interface LocationSelectorProps {
  locations: LocationData[];
  selectedLocation: LocationData;
  onLocationChange: (id: string) => void;
}

export function LocationSelector({ locations, selectedLocation, onLocationChange }: LocationSelectorProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <MapPin className="w-5 h-5 text-blue-600" />
          </div>
          <div className="relative">
            <select
              value={selectedLocation.id}
              onChange={(e) => onLocationChange(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold min-w-[200px]"
            >
              {locations.map(location => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {selectedLocation.type} • {selectedLocation.address}
        </div>
      </div>
    </div>
  );
}