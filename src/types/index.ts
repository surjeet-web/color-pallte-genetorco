export type HexColor = `#${string}`;

export interface SavedPalette {
  id: string;
  baseColor: HexColor;
  schemeType: string;
  colors: HexColor[];
  timestamp: number;
}

export interface User {
  id: string;
  email: string;
  hasEarlyAccess: boolean;
  createdAt: number;
}

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'loading';