import { HexColor, SchemeType } from '../types';

export function generateRandomHexColor(): HexColor {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color as HexColor;
}

export function getRandomSchemeType(): SchemeType {
  const schemes: SchemeType[] = [
    'analogous',
    'monochromatic',
    'triadic',
    'complementary',
    'split-complementary',
  ];
  return schemes[Math.floor(Math.random() * schemes.length)];
}