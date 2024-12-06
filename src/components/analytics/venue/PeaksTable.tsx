import React from 'react';
import { Trophy } from 'lucide-react';

interface PeaksTableProps {
  peaks: {
    time: string;
    value: number;
    rank: number;
  }[];
}

export function PeaksTable({ peaks }: PeaksTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="text-left text-sm font-medium text-gray-500 pb-3">Peak Time</th>
            <th className="text-right text-sm font-medium text-gray-500 pb-3">Peak Value</th>
            <th className="text-right text-sm font-medium text-gray-500 pb-3">Rank</th>
          </tr>
        </thead>
        <tbody>
          {peaks.map((peak, index) => (
            <tr key={index} className="border-t">
              <td className="py-3 text-sm">{peak.time}</td>
              <td className="py-3 text-sm text-right">{peak.value}%</td>
              <td className="py-3 text-right">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  <Trophy className="w-3 h-3 mr-1" />
                  #{peak.rank}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}