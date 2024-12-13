import React from 'react';
import { Copy } from 'lucide-react';
import { HexColor } from '../types';

interface ColorCardProps {
  color: HexColor;
  onClick?: () => void;
}

export function ColorCard({ color, onClick }: ColorCardProps) {
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(color);
  };

  const textColor = getBrightness(color) > 128 ? 'text-gray-800' : 'text-white';

  return (
    <div
      className="relative group rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      <div className="h-32 flex items-end p-4">
        <div className={`flex justify-between items-center w-full ${textColor}`}>
          <span className="font-mono text-sm">{color}</span>
          <button
            onClick={handleCopy}
            className="p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10"
            title="Copy color code"
          >
            <Copy size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function getBrightness(hex: HexColor): number {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000;
}