import React from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

interface MonthSelectorProps {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

export function MonthSelector({ selectedMonth, onMonthChange }: MonthSelectorProps) {
  return (
    <div className="relative">
      <div className="flex items-center space-x-2 mb-6">
        <Calendar className="w-5 h-5 text-blue-600" />
        <div className="relative">
          <select
            value={selectedMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
          >
            <option value="October 2024">October 2024</option>
            <option value="November 2024">November 2024</option>
            <option value="December 2024">December 2024</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}