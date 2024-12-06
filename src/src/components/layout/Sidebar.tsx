import React from 'react';
import { LayoutDashboard, PieChart, Bell } from 'lucide-react';
import { NavLink } from './NavLink';

export function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4 fixed left-0 top-0">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-center">Chitra Ads</h1>
      </div>
      
      <nav className="space-y-2">
        <NavLink 
          to="/" 
          icon={<LayoutDashboard className="w-5 h-5" />}
          label="Campaign Management"
        />
        <NavLink 
          to="/analytics" 
          icon={<PieChart className="w-5 h-5" />}
          label="Management and Analytics"
        />
        <NavLink 
          to="/notifications" 
          icon={<Bell className="w-5 h-5" />}
          label="Notifications and Updates"
        />
      </nav>
    </div>
  );
}