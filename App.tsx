import React, { useState } from 'react';
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
    <div className="min-h-screen bg-stone-50/50 text-stone-800 pb-6 font-sans selection:bg-emerald-200 flex flex-col">
      {/* Background Gradient Mesh */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-emerald-200/20 blur-[100px]" />
        <div className="absolute top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-lime-200/20 blur-[100px]" />
        <div className="absolute bottom-[0%] left-[20%] w-[60%] h-[40%] rounded-full bg-green-100/30 blur-[120px]" />
      </div>

      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-emerald-100/50 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={handleReset}>
            <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-2 rounded-xl text-white shadow-lg shadow-emerald-500/20">
              <Sprout className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-emerald-950 tracking-tight">SproutLife</span>
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
            />
          </div>
        ) : (
          <PlanDisplay plan={plan} units={formData.units} reset={handleReset} />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-6 py-6 text-center text-emerald-800/60 text-sm flex flex-col items-center gap-4">
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
          <p className="text-xs mt-3 font-medium text-emerald-600/90 italic">This is an example of a AI used to benefit humanity :)</p>
        </div>
      </footer>
    </div>
  );
};

export default App;