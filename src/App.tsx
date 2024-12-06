import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { CampaignManagement } from './pages/CampaignManagement';
import { Analytics } from './pages/Analytics';
import { LocationAnalytics } from './pages/analytics/LocationAnalytics';
import { VenueAnalytics } from './pages/analytics/VenueAnalytics';
import { Notifications } from './pages/Notifications';
import { QRCodeGenerator } from './pages/QRCodeGenerator';
import { RedirectPage } from './pages/RedirectPage';

export default function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<CampaignManagement />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/analytics/locations" element={<LocationAnalytics />} />
          <Route path="/analytics/venues" element={<VenueAnalytics />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/qr-generator" element={<QRCodeGenerator />} />
          <Route path="/qr/:shortUrl" element={<RedirectPage />} />
        </Routes>
      </div>
    </Router>
  );
}