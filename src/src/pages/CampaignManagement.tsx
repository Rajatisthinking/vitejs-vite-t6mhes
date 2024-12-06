import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Target, MapPin, Navigation, ArrowRight } from 'lucide-react';
import { StatCard } from '../components/dashboard/StatCard';
import { CampaignList } from '../components/dashboard/CampaignList';
import { PackageInfo } from '../components/dashboard/PackageInfo';
import { LocationsList } from '../components/dashboard/LocationsList';
import { VenuesList } from '../components/dashboard/VenuesList';

const activeCampaigns = [
  {
    id: '1',
    name: 'Summer Sale 2024',
    status: 'active',
    venue: 'City Mall',
    startDate: 'Mar 1, 2024',
    endDate: 'Mar 31, 2024'
  },
  {
    id: '2',
    name: 'Product Launch',
    status: 'active',
    venue: 'Central Plaza',
    startDate: 'Mar 15, 2024',
    endDate: 'Apr 15, 2024'
  }
] as const;

const campaignHistory = [
  {
    id: '3',
    name: 'Winter Campaign',
    status: 'completed',
    venue: 'Metro Station',
    startDate: 'Jan 1, 2024',
    endDate: 'Feb 28, 2024'
  }
] as const;

const activeLocations = [
  {
    id: '1',
    name: 'City Mall',
    type: 'Shopping Mall',
    address: '123 Main Street, Downtown'
  },
  {
    id: '2',
    name: 'Central Plaza',
    type: 'Commercial Complex',
    address: '456 Business Avenue, City Center'
  },
  {
    id: '3',
    name: 'Metro Station',
    type: 'Transit Hub',
    address: 'Metro Line 1, Central Station'
  },
  {
    id: '4',
    name: 'Sports Complex',
    type: 'Entertainment Venue',
    address: '789 Athletic Drive, Westside'
  }
];

const activeVenues = [
  {
    id: '1',
    name: 'City Mall - Main Entrance',
    location: 'Downtown Shopping District',
    capacity: '5000+ daily visitors',
    availability: 'Available 24/7',
    status: 'occupied'
  },
  {
    id: '2',
    name: 'Central Plaza - Food Court',
    location: 'Business District',
    capacity: '3000+ daily visitors',
    availability: 'Mall Hours (10 AM - 10 PM)',
    status: 'available'
  },
  {
    id: '3',
    name: 'Metro Station - Platform A',
    location: 'Central Line',
    capacity: '10000+ daily commuters',
    availability: 'Operating Hours (5 AM - 12 AM)',
    status: 'maintenance'
  }
] as const;

export function CampaignManagement() {
  return (
    <div className="ml-64 p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Campaign Management</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Active Campaigns"
            value="8"
            icon={<Target className="w-6 h-6 text-blue-600" />}
            trend={{ value: 12, isPositive: true }}
          />
          <div className="relative">
            <StatCard
              title="Total Venues"
              value="15"
              icon={<MapPin className="w-6 h-6 text-blue-600" />}
            />
          </div>
          <StatCard
            title="Active Locations"
            value="4"
            icon={<Navigation className="w-6 h-6 text-blue-600" />}
          />
        </div>

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
            
            <VenuesList venues={activeVenues} />
            
            <CampaignList 
              title="Campaign History" 
              campaigns={campaignHistory}
            />
          </div>

          <div className="space-y-6">
            <PackageInfo />
            <LocationsList locations={activeLocations} />
          </div>
        </div>
      </div>
    </div>
  );
}