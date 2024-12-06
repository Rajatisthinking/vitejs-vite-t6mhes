import React from 'react';
import { Restaurant } from '../../../types/venue';
import { Store } from 'lucide-react';

interface RestaurantListProps {
  restaurants: Restaurant[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function RestaurantList({ restaurants, selectedId, onSelect }: RestaurantListProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Restaurants</h2>
      <div className="space-y-3">
        {restaurants.map((restaurant) => (
          <button
            key={restaurant.id}
            onClick={() => onSelect(restaurant.id)}
            className={`w-full text-left p-4 rounded-lg transition-colors ${
              selectedId === restaurant.id
                ? 'bg-blue-50 border-blue-200'
                : 'hover:bg-gray-50 border-transparent'
            } border`}
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Store className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">{restaurant.name}</h3>
                <p className="text-sm text-gray-600">{restaurant.type}</p>
                <p className="text-xs text-gray-500 mt-1">{restaurant.location}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}