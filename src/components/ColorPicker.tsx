import React from 'react';
import { SchemeType } from '../utils/colorSchemes';

interface ColorPickerProps {
  color: string;
  schemeType: SchemeType;
  onColorChange: (color: string) => void;
  onSchemeTypeChange: (type: SchemeType) => void;
}

export function ColorPicker({
  color,
  schemeType,
  onColorChange,
  onSchemeTypeChange,
}: ColorPickerProps) {
  const schemeTypes: SchemeType[] = [
    'analogous',
    'monochromatic',
    'triadic',
    'complementary',
    'split-complementary',
  ];

  return (
    <div className="flex gap-4 items-end">
      <div className="flex-1">
        <label htmlFor="baseColor" className="block text-sm font-medium text-gray-700 mb-2">
          Base Color
        </label>
        <div className="flex gap-2">
          <input
            type="color"
            id="baseColor"
            value={color}
            onChange={(e) => onColorChange(e.target.value)}
            className="h-10 w-20 rounded border border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={color}
            onChange={(e) => onColorChange(e.target.value)}
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            placeholder="#000000"
            pattern="^#[0-9A-Fa-f]{6}$"
          />
        </div>
      </div>
      <div className="flex-1">
        <label htmlFor="schemeType" className="block text-sm font-medium text-gray-700 mb-2">
          Color Scheme
        </label>
        <select
          id="schemeType"
          value={schemeType}
          onChange={(e) => onSchemeTypeChange(e.target.value as SchemeType)}
          className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          {schemeTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}