'use client';

import { HelpCircle } from 'lucide-react';

export default function QuestionMarkIcon() {
  return (
    <div className="tooltip-container relative inline-block ml-1">
      <HelpCircle 
        size={16} 
        className="text-gray-400 cursor-help hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
      />
    </div>
  );
} 