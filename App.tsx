import React, { useMemo, useState } from 'react';
import { UserInput, SoilType, Orientation, UnitSystem, GardenPlanResponse } from './types';
import { InputForm } from './components/InputForm';
import { PlanDisplay } from './components/PlanDisplay';
import { generatePlan } from './services/geminiService';
import { Sprout } from 'lucide-react';

const App: React.FC = () => {
  const [formData, setFormData] = useState<UserInput>({
    postcode: '',
    bedOrientation: Orientation.NORTH,
    currentDate: new Date().toISOString().split('T')[0],
    targetDateType: 'planting',
    targetDate: new Date().toISOString().split('T')[0], // Default to today
    soilType: SoilType.VEGGIE_MIX,
    crop: '',
    units: UnitSystem.METRIC,
    sprinklers: [
      { id: 1, enabled: false, flowRate: 0, startTime: '06:00', endTime: '06:15' },
      { id: 2, enabled: false, flowRate: 0, startTime: '06:00', endTime: '06:15' },
    ],
    wateringCan: {
      enabled: false,
      capacity: 5,
      frequency: 1,
      period: 'day'
    },
    sunlightHours: 6,
  });

  const [plan, setPlan] = useState<GardenPlanResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const themeClasses = useMemo(() => ({
    page:
      isDarkMode
        ? 'bg-[#050d08] text-emerald-50 selection:bg-emerald-700'
        : 'bg-stone-50/50 text-stone-800 selection:bg-emerald-200',
    nav:
      isDarkMode
        ? 'bg-[#0b1a12]/80 border-emerald-900/50 text-emerald-50'
        : 'bg-white/80 border-emerald-100/50 text-emerald-950',
    cardShadow: isDarkMode ? 'shadow-emerald-950/40' : 'shadow-emerald-500/20',
    footerText: isDarkMode ? 'text-emerald-200/80' : 'text-emerald-800/60',
    footerSubtle: isDarkMode ? 'text-emerald-300/80' : 'text-emerald-600/90',
  }), [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const generatedPlan = await generatePlan(formData);
      setPlan(generatedPlan);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred while generating the plan.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPlan(null);
    setError(null);
  };

  return (
    <div className={`min-h-screen pb-6 font-sans flex flex-col transition-colors duration-300 ${themeClasses.page}`}>
      {/* Background Gradient Mesh */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className={`${isDarkMode ? 'bg-emerald-900/30' : 'bg-emerald-200/20'} absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full blur-[100px]`} />
        <div className={`${isDarkMode ? 'bg-emerald-800/25' : 'bg-lime-200/20'} absolute top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full blur-[100px]`} />
        <div className={`${isDarkMode ? 'bg-emerald-800/25' : 'bg-green-100/30'} absolute bottom-[0%] left-[20%] w-[60%] h-[40%] rounded-full blur-[120px]`} />
      </div>

      {/* Header */}
      <nav className={`${themeClasses.nav} backdrop-blur-md px-6 py-4 sticky top-0 z-50 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={handleReset}>
            <div className={`bg-gradient-to-br from-emerald-500 to-green-600 p-2 rounded-xl text-white shadow-lg ${themeClasses.cardShadow}`}>
              <Sprout className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className={isDarkMode ? 'text-emerald-100' : 'text-emerald-950'}>SproutLife</span>
            </span>
          </div>

          {/* Ko-fi Button - Top Right */}
          <a href='https://ko-fi.com/J3J51P5FP4' target='_blank' rel="noopener noreferrer" className="hover:opacity-90 transition-opacity">
            <img 
              src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' 
              alt='Buy Me a Coffee at ko-fi.com' 
              style={{ border: '0px', height: '36px' }}
            />
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 flex-grow w-full">
        
        {error && (
          <div className="bg-rose-50 text-rose-700 p-4 rounded-2xl border border-rose-200 mb-8 max-w-2xl mx-auto text-center shadow-sm">
            <p className="font-bold mb-1">Unable to generate plan</p>
            <p className="text-sm opacity-90">{error}</p>
          </div>
        )}

        {!plan ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <InputForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              isLoading={loading}
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />
          </div>
        ) : (
          <PlanDisplay plan={plan} units={formData.units} reset={handleReset} isDarkMode={isDarkMode} />
        )}
      </main>

      {/* Footer */}
      <footer className={`mt-6 py-6 text-center text-sm flex flex-col items-center gap-4 transition-colors duration-300 ${themeClasses.footerText}`}>
        {/* Ko-fi Button - Bottom */}
        <a href='https://ko-fi.com/J3J51P5FP4' target='_blank' rel="noopener noreferrer" className="hover:opacity-90 transition-opacity">
          <img
            src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' 
            alt='Buy Me a Coffee at ko-fi.com' 
            style={{ border: '0px', height: '36px' }}
          />
        </a>
        
        <div>
          <p className="font-semibold">&copy; Brian & Nikki D'Souza 2025</p>
          <p className="text-xs mt-1 opacity-80">All Advice is general in nature</p>
          <p className={`text-xs mt-3 font-medium italic ${themeClasses.footerSubtle}`}>This is an example of a AI used to benefit humanity :)</p>
        </div>

        <div className="w-full overflow-hidden rounded-xl shadow-lg shadow-emerald-950/20 border border-white/5">
          <div className="bg-gradient-to-r from-[#0a1a33] via-[#0b2144] to-[#0f2f5d] text-white py-4 px-8">
            <p className="text-sm font-semibold tracking-wide text-center">🇦🇺 Proudly made in Australia 🦘</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;