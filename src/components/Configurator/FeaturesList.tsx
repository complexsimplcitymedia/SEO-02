import React from 'react';
import { Check } from 'lucide-react';

const features = [
  '300+ vehicles, vans included',
  '3,000+ wrap films',
  '350+ design previews',
  '26 backgrounds',
  'Touch screen ready',
  'Design import',
  '3D model import',
  'Edit multiple cars',
  '60+ free cut designs',
  '70+ wheels',
  'Advanced camera mode',
  'Video export',
  'Photo rendering',
  '2D preview',
  'Whitelabeling'
];

export default function FeaturesList() {
  return (
    <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
      <h2 className="text-xl font-bold text-white mb-4">Full License Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((feature) => (
          <div key={feature} className="flex items-center space-x-3">
            <div className="bg-blue-600/20 rounded-lg p-1">
              <Check className="w-4 h-4 text-blue-400" />
            </div>
            <span className="text-sm text-gray-300">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}