import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Building2, BarChart } from 'lucide-react';

export function AnalyticsNav() {
  const location = useLocation();
  
  const navItems = [
    { path: '/analytics', icon: <BarChart className="w-4 h-4" />, label: 'Overview' },
    { path: '/analytics/locations', icon: <MapPin className="w-4 h-4" />, label: 'Location Analytics' },
    { path: '/analytics/venues', icon: <Building2 className="w-4 h-4" />, label: 'Venue Analytics' }
  ];

  return (
    <nav className="bg-white shadow-sm rounded-lg p-2 mb-8">
      <div className="flex items-center">
        <div className="flex space-x-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                location.pathname === item.path
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}