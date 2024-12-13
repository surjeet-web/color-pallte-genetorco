import { HexColor } from '../types';

export type SchemeType = 'analogous' | 'monochromatic' | 'triadic' | 'complementary' | 'split-complementary';

function hexToHSL(hex: HexColor): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
}

function HSLToHex(h: number, s: number, l: number): HexColor {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (0 <= h && h < 60) {
    [r, g, b] = [c, x, 0];
  } else if (60 <= h && h < 120) {
    [r, g, b] = [x, c, 0];
  } else if (120 <= h && h < 180) {
    [r, g, b] = [0, c, x];
  } else if (180 <= h && h < 240) {
    [r, g, b] = [0, x, c];
  } else if (240 <= h && h < 300) {
    [r, g, b] = [x, 0, c];
  } else if (300 <= h && h < 360) {
    [r, g, b] = [c, 0, x];
  }

  const toHex = (n: number) => {
    const hex = Math.round((n + m) * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}` as HexColor;
}

export function generateColorScheme(baseColor: HexColor, schemeType: SchemeType): HexColor[] {
  const [h, s, l] = hexToHSL(baseColor);

  switch (schemeType) {
    case 'analogous':
      return [
        HSLToHex((h - 30 + 360) % 360, s, l),
        baseColor,
        HSLToHex((h + 30) % 360, s, l),
        HSLToHex((h + 60) % 360, s, l),
        HSLToHex((h - 60 + 360) % 360, s, l),
      ];
    case 'monochromatic':
      return [
        HSLToHex(h, s, Math.max(0, l - 30)),
        HSLToHex(h, s, Math.max(0, l - 15)),
        baseColor,
        HSLToHex(h, s, Math.min(100, l + 15)),
        HSLToHex(h, s, Math.min(100, l + 30)),
      ];
    case 'triadic':
      return [
        baseColor,
        HSLToHex((h + 120) % 360, s, l),
        HSLToHex((h + 240) % 360, s, l),
        HSLToHex((h + 180) % 360, s, l),
        HSLToHex((h + 300) % 360, s, l),
      ];
    case 'complementary':
      return [
        HSLToHex(h, s, Math.max(0, l - 15)),
        baseColor,
        HSLToHex((h + 180) % 360, s, l),
        HSLToHex((h + 180) % 360, s, Math.max(0, l - 15)),
        HSLToHex((h + 180) % 360, s, Math.min(100, l + 15)),
      ];
    case 'split-complementary':
      return [
        baseColor,
        HSLToHex((h + 150) % 360, s, l),
        HSLToHex((h + 210) % 360, s, l),
        HSLToHex((h + 180) % 360, s, Math.max(0, l - 15)),
        HSLToHex((h + 180) % 360, s, Math.min(100, l + 15)),
      ];
    default:
      return [baseColor];
  }
}