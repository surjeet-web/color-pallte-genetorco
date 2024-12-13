import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { ColorPicker } from './components/ColorPicker';
import { ColorCard } from './components/ColorCard';
import { SavedPalettes } from './components/SavedPalettes';
import { EarlyAccessPage } from './components/EarlyAccessPage';
import { Header } from './components/Header';
import { generateColorScheme, SchemeType } from './utils/colorSchemes';
import { generateRandomHexColor, getRandomSchemeType } from './utils/randomPalette';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useAuth } from './hooks/useAuth';
import { HexColor, SavedPalette } from './types';

function App() {
  const { user, status, login, logout } = useAuth();
  const [baseColor, setBaseColor] = useState<HexColor>('#6366f1');
  const [schemeType, setSchemeType] = useState<SchemeType>('analogous');
  const [savedPalettes, setSavedPalettes] = useLocalStorage<SavedPalette[]>('savedPalettes', []);

  const colors = generateColorScheme(baseColor, schemeType);

  const handleSave = () => {
    const newPalette: SavedPalette = {
      id: Date.now().toString(),
      baseColor,
      schemeType,
      colors,
      timestamp: Date.now(),
    };
    setSavedPalettes([newPalette, ...savedPalettes]);
  };

  const handleDelete = (id: string) => {
    setSavedPalettes(savedPalettes.filter((palette) => palette.id !== id));
  };

  const handleRandomize = () => {
    setBaseColor(generateRandomHexColor());
    setSchemeType(getRandomSchemeType());
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user || status === 'unauthenticated') {
    return <EarlyAccessPage onLogin={login} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Header user={user} onLogout={logout} onRandomize={handleRandomize} />

        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          <ColorPicker
            color={baseColor}
            schemeType={schemeType}
            onColorChange={(color) => setBaseColor(color as HexColor)}
            onSchemeTypeChange={setSchemeType}
          />

          <div className="mt-6 grid grid-cols-5 gap-4">
            {colors.map((color, index) => (
              <ColorCard key={index} color={color} />
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Save size={20} />
              Save Palette
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Saved Palettes</h2>
          <SavedPalettes palettes={savedPalettes} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}

export default App;