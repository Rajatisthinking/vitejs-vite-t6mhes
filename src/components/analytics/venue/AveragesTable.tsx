import React from 'react';
import { Award } from 'lucide-react';

interface AveragesTableProps {
  averages: {
    period: string;
    value: number;
    rank: number;
  }[];
}

export function AveragesTable({ averages }: AveragesTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="text-left text-sm font-medium text-gray-500 pb-3">Period</th>
            <th className="text-right text-sm font-medium text-gray-500 pb-3">Average</th>
            <th className="text-right text-sm font-medium text-gray-500 pb-3">Rank</th>
          </tr>
        </thead>
        <tbody>
          {averages.map((average, index) => (
            <tr key={index} className="border-t">
              <td className="py-3 text-sm">{average.period}</td>
              <td className="py-3 text-sm text-right">{average.value}%</td>
              <td className="py-3 text-right">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <Award className="w-3 h-3 mr-1" />
                  #{average.rank}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}