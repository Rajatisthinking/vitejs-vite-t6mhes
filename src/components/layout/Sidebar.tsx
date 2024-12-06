import React from 'react';
import { LayoutDashboard, PieChart, Bell, QrCode, LogOut } from 'lucide-react';
import { NavLink } from './NavLink';
import { useAuthStore } from '../../stores/authStore';
import { useNavigate } from 'react-router-dom';

export function Sidebar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4 fixed left-0 top-0 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-center">Chitra Ads</h1>
      </div>
      
      <nav className="space-y-2 flex-1">
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
        <NavLink 
          to="/qr-generator" 
          icon={<QrCode className="w-5 h-5" />}
          label="QR Generator"
        />
      </nav>

      <div className="border-t border-gray-700 pt-4 mt-4">
        <div className="px-4 py-2">
          <p className="text-sm text-gray-400">Signed in as</p>
          <p className="font-medium">{user?.name}</p>
          <p className="text-sm text-gray-400">{user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 w-full px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  );
}