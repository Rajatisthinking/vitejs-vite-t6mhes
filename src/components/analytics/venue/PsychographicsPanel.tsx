import React from 'react';
import { UserCircle2, Activity, Heart } from 'lucide-react';

interface PsychographicsPanelProps {
  personalities: string[];
  lifestyle: string[];
  values: string[];
}

export function PsychographicsPanel({ personalities, lifestyle, values }: PsychographicsPanelProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Audience Psychographics</h2>
      
      <div className="space-y-6">
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <UserCircle2 className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium">Personality Traits</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {personalities.map((trait, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Activity className="w-5 h-5 text-green-600" />
            <h3 className="font-medium">Lifestyle Indicators</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {lifestyle.map((indicator, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
              >
                {indicator}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Heart className="w-5 h-5 text-rose-600" />
            <h3 className="font-medium">Core Values</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {values.map((value, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-rose-50 text-rose-700 rounded-full text-sm"
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}