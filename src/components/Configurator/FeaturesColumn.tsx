import React from 'react';
import { Check } from 'lucide-react';

interface FeaturesColumnProps {
  features: string[];
  className?: string;
}

export default function FeaturesColumn({ features, className = '' }: FeaturesColumnProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {features.map((feature) => (
        <div 
          key={feature} 
          className="bg-white/5 backdrop-blur-sm rounded-lg p-2 flex items-center space-x-2"
        >
          <div className="bg-blue-600/10 rounded-lg p-0.5 shrink-0">
            <Check className="w-3 h-3 text-blue-400" />
          </div>
          <span className="text-xs text-gray-400">{feature}</span>
        </div>
      ))}
    </div>
  );
}