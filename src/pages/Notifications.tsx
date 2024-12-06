import React from 'react';
import { Bell, MessageSquare, AlertCircle } from 'lucide-react';

interface Notification {
  id: string;
  type: 'update' | 'alert' | 'message';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'update',
    title: 'Campaign Performance Update',
    message: 'Your "Summer Sale 2024" campaign has reached 50,000 impressions!',
    timestamp: '2 hours ago',
    read: false
  },
  {
    id: '2',
    type: 'alert',
    title: 'Package Expiring Soon',
    message: 'Your premium package will expire in 30 days. Renew now to maintain access.',
    timestamp: '1 day ago',
    read: true
  },
  {
    id: '3',
    type: 'message',
    title: 'New Location Available',
    message: 'A new premium advertising location is now available in your area.',
    timestamp: '2 days ago',
    read: true
  }
];

function NotificationItem({ notification }: { notification: Notification }) {
  const icons = {
    update: <Bell className="w-5 h-5 text-blue-600" />,
    alert: <AlertCircle className="w-5 h-5 text-yellow-600" />,
    message: <MessageSquare className="w-5 h-5 text-green-600" />
  };

  return (
    <div className={`p-4 rounded-lg ${notification.read ? 'bg-white' : 'bg-blue-50'}`}>
      <div className="flex items-start space-x-3">
        <div className="p-2 bg-white rounded-lg shadow-sm">
          {icons[notification.type]}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{notification.title}</h3>
            <span className="text-xs text-gray-500">{notification.timestamp}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
        </div>
      </div>
    </div>
  );
}

export function Notifications() {
  return (
    <div className="ml-64 p-8 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Notifications and Updates</h1>
          <button className="text-sm text-blue-600 hover:text-blue-700">
            Mark all as read
          </button>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
        </div>
      </div>
    </div>
  );
}