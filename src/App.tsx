import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { CampaignManagement } from './pages/CampaignManagement';
import { Analytics } from './pages/Analytics';
import { LocationAnalytics } from './pages/analytics/LocationAnalytics';
import { VenueAnalytics } from './pages/analytics/VenueAnalytics';
import { Notifications } from './pages/Notifications';
import { QRCodeGenerator } from './pages/QRCodeGenerator';
import { RedirectPage } from './pages/RedirectPage';
import { Login } from './pages/Login';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      {children}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/qr/:shortUrl" element={<RedirectPage />} />
        
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <CampaignManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Analytics />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/analytics/locations"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <LocationAnalytics />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/analytics/venues"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <VenueAnalytics />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Notifications />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/qr-generator"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <QRCodeGenerator />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}