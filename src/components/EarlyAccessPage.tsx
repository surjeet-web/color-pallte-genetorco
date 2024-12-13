import React, { useState } from 'react';
import { Palette, ArrowRight } from 'lucide-react';

interface EarlyAccessPageProps {
  onLogin: (email: string) => void;
}

export function EarlyAccessPage({ onLogin }: EarlyAccessPageProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onLogin(email);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 shadow-xl max-w-md w-full">
        <div className="flex items-center gap-3 mb-6">
          <Palette className="h-8 w-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900">Color Palette Generator</h1>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Early Access</h2>
          <p className="text-gray-600">
            Get exclusive early access to our advanced color palette generator. Create stunning color combinations with ease.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white rounded-md px-4 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Get Early Access
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}