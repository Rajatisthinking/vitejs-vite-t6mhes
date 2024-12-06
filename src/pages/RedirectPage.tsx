import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRedirectStore } from '../stores/redirectStore';

export function RedirectPage() {
  const { shortUrl } = useParams<{ shortUrl: string }>();
  const getDestinationUrl = useRedirectStore((state) => state.getDestinationUrl);
  const navigate = useNavigate();

  useEffect(() => {
    if (shortUrl) {
      const destinationUrl = getDestinationUrl(shortUrl);
      if (destinationUrl) {
        window.location.href = destinationUrl;
      } else {
        navigate('/');
      }
    }
  }, [shortUrl, getDestinationUrl, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
        <p className="text-gray-600">Please wait while we redirect you to your destination.</p>
      </div>
    </div>
  );
}