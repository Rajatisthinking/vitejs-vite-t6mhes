import { useState } from 'react';
import { Restaurant } from '../types/venue';

const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'The Urban Spice',
    type: 'Fine Dining',
    location: 'Level 2, North Wing',
    weeklyData: {
      busyness: {
        monday: 45,
        tuesday: 50,
        wednesday: 65,
        thursday: 70,
        friday: 90,
        saturday: 95,
        sunday: 85
      },
      peaks: [
        { time: 'Monday 7 PM', value: 65, rank: 7 },
        { time: 'Tuesday 7:30 PM', value: 70, rank: 6 },
        { time: 'Wednesday 8 PM', value: 75, rank: 5 },
        { time: 'Thursday 8:30 PM', value: 80, rank: 4 },
        { time: 'Friday 8 PM', value: 95, rank: 1 },
        { time: 'Saturday 7:30 PM', value: 92, rank: 2 },
        { time: 'Sunday 1 PM', value: 88, rank: 3 }
      ],
      averages: [
        { period: 'Monday Overall', value: 45, rank: 7 },
        { period: 'Tuesday Overall', value: 50, rank: 6 },
        { period: 'Wednesday Overall', value: 65, rank: 5 },
        { period: 'Thursday Overall', value: 70, rank: 4 },
        { period: 'Friday Overall', value: 90, rank: 2 },
        { period: 'Saturday Overall', value: 95, rank: 1 },
        { period: 'Sunday Overall', value: 85, rank: 3 }
      ]
    },
    audienceTypes: [
      { type: 'Millennials', percentage: 45 },
      { type: 'Gen Z', percentage: 30 },
      { type: 'Gen X', percentage: 15 },
      { type: 'Others', percentage: 10 }
    ],
    psychographics: {
      personalities: [
        'Sophisticated',
        'Adventurous',
        'Social',
        'Quality-conscious',
        'Trend-aware'
      ],
      lifestyle: [
        'Fine dining enthusiasts',
        'Cultural explorers',
        'Urban professionals',
        'Food connoisseurs',
        'Social media active'
      ],
      values: [
        'Authentic experiences',
        'Cultural diversity',
        'Quality over quantity',
        'Social status',
        'Culinary excellence'
      ]
    }
  },
  {
    id: '2',
    name: 'Café Bistro',
    type: 'Casual Dining',
    location: 'Level 1, Food Court',
    weeklyData: {
      busyness: {
        monday: 60,
        tuesday: 65,
        wednesday: 70,
        thursday: 75,
        friday: 85,
        saturday: 90,
        sunday: 80
      },
      peaks: [
        { time: 'Monday 12 PM', value: 70, rank: 7 },
        { time: 'Tuesday 12:30 PM', value: 75, rank: 6 },
        { time: 'Wednesday 1 PM', value: 78, rank: 5 },
        { time: 'Thursday 1:30 PM', value: 80, rank: 4 },
        { time: 'Friday 12:30 PM', value: 85, rank: 2 },
        { time: 'Saturday 1 PM', value: 90, rank: 1 },
        { time: 'Sunday 2 PM', value: 82, rank: 3 }
      ],
      averages: [
        { period: 'Monday Overall', value: 60, rank: 7 },
        { period: 'Tuesday Overall', value: 65, rank: 6 },
        { period: 'Wednesday Overall', value: 70, rank: 5 },
        { period: 'Thursday Overall', value: 75, rank: 4 },
        { period: 'Friday Overall', value: 85, rank: 2 },
        { period: 'Saturday Overall', value: 90, rank: 1 },
        { period: 'Sunday Overall', value: 80, rank: 3 }
      ]
    },
    audienceTypes: [
      { type: 'Gen Z', percentage: 40 },
      { type: 'Millennials', percentage: 35 },
      { type: 'Gen X', percentage: 20 },
      { type: 'Others', percentage: 5 }
    ],
    psychographics: {
      personalities: [
        'Casual',
        'Friendly',
        'Practical',
        'Value-conscious',
        'Energetic'
      ],
      lifestyle: [
        'Quick-service seekers',
        'Budget-conscious diners',
        'Students',
        'Young professionals',
        'Social groups'
      ],
      values: [
        'Convenience',
        'Affordability',
        'Social connection',
        'Quick service',
        'Casual atmosphere'
      ]
    }
  }
];

export function useVenueData() {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(null);
  
  const metrics = {
    activeVenues: 15,
    avgServiceDuration: '45min'
  };

  const selectedRestaurant = selectedRestaurantId 
    ? mockRestaurants.find(r => r.id === selectedRestaurantId)
    : null;

  return {
    restaurants: mockRestaurants,
    selectedRestaurant,
    setSelectedRestaurantId,
    metrics
  };
}