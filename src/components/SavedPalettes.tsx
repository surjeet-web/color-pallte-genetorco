import React from 'react';
import { Trash2 } from 'lucide-react';
import { SavedPalette } from '../types';
import { ColorCard } from './ColorCard';

interface SavedPalettesProps {
  palettes: SavedPalette[];
  onDelete: (id: string) => void;
}

export function SavedPalettes({ palettes, onDelete }: SavedPalettesProps) {
  if (palettes.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No saved palettes yet. Generate and save some palettes to see them here!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {palettes.map((palette) => (
        <div key={palette.id} className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold">
                {palette.schemeType.charAt(0).toUpperCase() + palette.schemeType.slice(1)} Palette
              </h3>
              <p className="text-sm text-gray-500">
                {new Date(palette.timestamp).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => onDelete(palette.id)}
              className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
              title="Delete palette"
            >
              <Trash2 size={20} />
            </button>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {palette.colors.map((color, index) => (
              <ColorCard key={index} color={color} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}