import React from 'react';
import { Palette, LogOut, Shuffle } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  onRandomize: () => void;
}

export function Header({ user, onLogout, onRandomize }: HeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <Palette className="h-8 w-8 text-indigo-600" />
        <h1 className="text-3xl font-bold text-gray-900">Color Palette Generator</h1>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={onRandomize}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Shuffle size={18} />
          Randomize
        </button>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{user.email}</span>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}