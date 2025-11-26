import React, { useState, useEffect } from 'react';
import { UserInput, SoilType, Orientation, UnitSystem, SprinklerConfig, WateringCanConfig } from '../types';
import { Leaf, Droplets, MapPin, Calendar, Sun, Clock, GlassWater, Moon, SunMedium } from 'lucide-react';

interface InputFormProps {
  formData: UserInput;
  setFormData: React.Dispatch<React.SetStateAction<UserInput>>;
  onSubmit: () => void;
  isLoading: boolean;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const GARDEN_JOKES = [
  "Negotiating with slugs...",
  "Photosynthesizing data...",
  "Teaching tomatoes to be red...",
  "Measuring sunbeams...",
  "Asking the worms for advice...",
  "Composting bad ideas...",
  "Watering the servers...",
  "Pruning the code...",
  "Planting digital seeds...",
  "Checking for bugs (the crawling kind)...",
  "Calibrating the chlorophyll...",
  "Untangling the garden hose...",
  "Consulting the garden gnome...",
  "Calculating root depth...",
  "Searching for the green thumb...",
  "Polishing the peppers...",
  "Distracting the birds...",
  "Waiting for the rain dance to work...",
  "Analyzing soil texture...",
  "Herding aphids...",
  "Convincing the seedlings to wake up...",
  "Optimizing harvest algorithms...",
  "Removing weeds from the database...",
  "Sharpening the virtual shears...",
  "Harvesting logic...",
  "Applying digital fertilizer...",
  "Checking the moon phase...",
  "Waking up the scarecrow...",
  "Bribing the bees...",
  "Measuring the morning dew...",
  "Running away from wasps...",
  "Planting a pixel tree...",
  "Downloading more sunlight...",
  "Debugging the ladybugs...",
  "Listening to the carrots grow...",
  "Organizing the seed packet drawer...",
  "Testing leaf aerodynamics...",
  "Simulating seasonal shifts...",
  "Generating mulch...",
  "Predicting the first frost...",
  "Asking the flowers to bloom...",
  "Checking hydration levels...",
  "Sweeping the patio...",
  "Inventing a new vegetable...",
  "Painting the grass green...",
  "Looking for the trowel...",
  "Translating bee dance...",
  "Estimating pumpkin circumference...",
  "Gathering virtual compost..."
];

export const InputForm: React.FC<InputFormProps> = ({ formData, setFormData, onSubmit, isLoading, isDarkMode, toggleDarkMode }) => {
  const [loadingText, setLoadingText] = useState(GARDEN_JOKES[0]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      // Pick a random start message
      setLoadingText(GARDEN_JOKES[Math.floor(Math.random() * GARDEN_JOKES.length)]);

      const interval = setInterval(() => {
        setLoadingText(GARDEN_JOKES[Math.floor(Math.random() * GARDEN_JOKES.length)]);
      }, 2000);

      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) return prev;
          return prev + Math.random() * 5;
        });
      }, 500);

      return () => {
        clearInterval(interval);
        clearInterval(progressInterval);
      };
    } else {
      setProgress(0);
    }
  }, [isLoading]);

  const handleChange = (field: keyof UserInput, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateSprinkler = (id: number, field: keyof SprinklerConfig, value: any) => {
    setFormData(prev => ({
      ...prev,
      sprinklers: prev.sprinklers.map(s => s.id === id ? { ...s, [field]: value } : s)
    }));
  };

  const updateWateringCan = (field: keyof WateringCanConfig, value: any) => {
    setFormData(prev => ({
      ...prev,
      wateringCan: { ...prev.wateringCan, [field]: value }
    }));
  };

  const isMetric = formData.units === UnitSystem.METRIC;
  // Flow rate slider constants
  const flowMax = isMetric ? 60 : 15;
  const flowAvg = isMetric ? 20 : 5.3;
  const flowAvgLabel = isMetric ? "20 L/min" : "~5.3 gal/min";

  const containerClasses = isDarkMode
    ? "bg-[#0f1a14]/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-emerald-900 p-6 md:p-10 max-w-3xl w-full mx-auto space-y-10 relative text-emerald-50"
    : "bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-emerald-100 p-6 md:p-10 max-w-3xl w-full mx-auto space-y-10 relative";
  const headerTitleClass = isDarkMode ? "text-emerald-50" : "text-emerald-900";
  const headerSubtitleClass = isDarkMode ? "text-emerald-200/80" : "text-emerald-700/80";
  const unitToggleContainer = isDarkMode
    ? "bg-emerald-950/50 p-1 rounded-xl flex gap-1 shadow-inner border border-emerald-900"
    : "bg-emerald-100/50 p-1 rounded-xl flex gap-1 shadow-inner";
  const inputBaseClass = isDarkMode
    ? "w-full px-4 py-3 rounded-xl bg-emerald-950/50 border border-emerald-800 focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-500 outline-none transition placeholder-emerald-600 text-emerald-50 shadow-sm"
    : "w-full px-4 py-3 rounded-xl bg-white border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition placeholder-emerald-300 text-emerald-900 shadow-sm";
  const subtleLabel = isDarkMode ? "text-emerald-200/90" : "text-emerald-600";
  const sectionHeading = isDarkMode ? "text-emerald-50" : "text-emerald-800";
  const sectionBorder = isDarkMode ? "border-emerald-900" : "border-emerald-200";
  const pillContainer = isDarkMode
    ? "bg-emerald-950/60 text-emerald-100 border-emerald-800"
    : "bg-white text-emerald-700 border-emerald-100";
  const sliderTrack = isDarkMode ? "bg-emerald-900 accent-emerald-400" : "bg-emerald-200 accent-emerald-600";
  const compactInputClass = isDarkMode
    ? "w-full px-3 py-2 rounded-lg bg-emerald-950/70 border border-emerald-800 text-emerald-50 focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500 outline-none placeholder-emerald-600"
    : "w-full px-3 py-2 rounded-lg bg-white border border-emerald-200 text-emerald-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none placeholder-emerald-400";

  return (
    <div className={containerClasses}>
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b pb-6" style={{ borderColor: isDarkMode ? '#0f2b1b' : undefined }}>
         <div className="text-center md:text-left space-y-2">
           <h2 className={`text-4xl font-extrabold tracking-tight ${headerTitleClass}`}>Garden Planner</h2>
           <p className={`text-lg ${headerSubtitleClass}`}>Design your perfect growing season.</p>
         </div>

         {/* Toggles - Units + Dark Mode */}
         <div className="flex flex-col sm:flex-row items-center gap-3">
           <div className={unitToggleContainer}>
              <button
                onClick={() => handleChange('units', UnitSystem.METRIC)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${formData.units === UnitSystem.METRIC ? (isDarkMode ? 'bg-emerald-800 text-emerald-50 shadow-lg shadow-emerald-950/50' : 'bg-white shadow text-emerald-700') : (isDarkMode ? 'text-emerald-200 hover:text-emerald-50' : 'text-emerald-600/70 hover:text-emerald-700')}`}
              >
                Metric
              </button>
              <button
                onClick={() => handleChange('units', UnitSystem.IMPERIAL)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${formData.units === UnitSystem.IMPERIAL ? (isDarkMode ? 'bg-emerald-800 text-emerald-50 shadow-lg shadow-emerald-950/50' : 'bg-white shadow text-emerald-700') : (isDarkMode ? 'text-emerald-200 hover:text-emerald-50' : 'text-emerald-600/70 hover:text-emerald-700')}`}
              >
                Imperial
              </button>
           </div>

           <button
             onClick={toggleDarkMode}
             className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all border ${isDarkMode ? 'bg-emerald-800 text-emerald-100 border-emerald-700 shadow-lg shadow-emerald-950/40 hover:bg-emerald-700' : 'bg-emerald-950 text-white border-emerald-900 shadow-lg shadow-emerald-500/30 hover:bg-emerald-900'}`}
             aria-pressed={isDarkMode}
           >
             {isDarkMode ? <SunMedium className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
             {isDarkMode ? 'Light Mode' : 'Dark Mode'}
           </button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          
          {/* Location & Crop */}
          <section className="space-y-4">
            <div className={`flex items-center gap-2 ${sectionHeading} border-b ${sectionBorder} pb-2`}>
              <div className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-emerald-900/60 text-emerald-100' : 'bg-emerald-100'}`}>
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg">Location & Crop</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-semibold mb-1.5 ${sectionHeading}`}>Postcode / Zip</label>
                <input
                  type="text"
                  className={inputBaseClass}
                  placeholder="e.g. 90210"
                  value={formData.postcode}
                  onChange={(e) => handleChange('postcode', e.target.value)}
                />
                <p className={`text-xs mt-1 pl-1 ${subtleLabel}`}>Used to predict local season & climate.</p>
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-1.5 ${sectionHeading}`}>Crops to Grow</label>
                <input
                  type="text"
                  className={inputBaseClass}
                  placeholder="e.g. Tomatoes, Garlic, Basil (separate with commas)"
                  value={formData.crop}
                  onChange={(e) => handleChange('crop', e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Planter Details */}
            <section className="space-y-4">
            <div className={`flex items-center gap-2 ${sectionHeading} border-b ${sectionBorder} pb-2`}>
              <div className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-emerald-900/60 text-emerald-100' : 'bg-emerald-100'}`}>
                <Sun className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg">Conditions</h3>
            </div>

            <div className="space-y-5">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${sectionHeading}`}>Soil Type</label>
                <div className="relative">
                  <select
                    className={`${inputBaseClass} appearance-none`}
                    value={formData.soilType}
                    onChange={(e) => handleChange('soilType', e.target.value as SoilType)}
                  >
                    {Object.values(SoilType).map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${sectionHeading}`}>Planter Orientation</label>
                <div className="grid grid-cols-4 gap-2">
                  {Object.values(Orientation).map((o) => (
                    <button
                      key={o}
                      onClick={() => handleChange('bedOrientation', o)}
                      className={`py-2 rounded-lg font-medium text-sm transition-all border ${
                        formData.bedOrientation === o
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-200'
                        : isDarkMode
                          ? 'bg-emerald-950/50 border-emerald-800 text-emerald-100 hover:bg-emerald-900/60'
                          : 'bg-white border-emerald-100 text-emerald-700 hover:bg-emerald-50'
                      }`}
                    >
                      {o.charAt(0)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                 <div className="flex justify-between items-center mb-2">
                    <label className={`text-sm font-semibold ${sectionHeading}`}>Daylight Access</label>
                    <span className={`text-sm font-bold ${isDarkMode ? 'text-emerald-300' : 'text-emerald-600'}`}>{formData.sunlightHours} hrs</span>
                 </div>
                 <input
                    type="range"
                    min="0"
                    max="16"
                    step="0.5"
                    value={formData.sunlightHours}
                    onChange={(e) => handleChange('sunlightHours', parseFloat(e.target.value))}
                    className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${sliderTrack}`}
                 />
                 <div className={`flex justify-between text-xs mt-1 ${isDarkMode ? 'text-emerald-300/70' : 'text-emerald-500'}`}>
                   <span>Full Shade</span>
                   <span>Partial</span>
                   <span>Full Sun</span>
                 </div>
              </div>
            </div>
          </section>

        </div>

        {/* Right Column */}
        <div className="space-y-8">

            {/* Timing */}
            <section className="space-y-4">
               <div className={`flex items-center gap-2 ${sectionHeading} border-b ${sectionBorder} pb-2`}>
                  <div className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-emerald-900/60 text-emerald-100' : 'bg-emerald-100'}`}>
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg">Timing</h3>
               </div>
             
             <div className="space-y-4">
                <div>
                     <label className={`block text-sm font-semibold mb-1.5 ${sectionHeading}`}>Today's Date</label>
                     <input
                       type="date"
                       className={inputBaseClass}
                     value={formData.currentDate}
                     onChange={(e) => handleChange('currentDate', e.target.value)}
                   />
                </div>
                
                  <div className={`${isDarkMode ? 'bg-emerald-950/50 border-emerald-800' : 'bg-emerald-50/50 border-emerald-100'} p-5 rounded-2xl border space-y-3`}>
                    <span className={`text-sm font-bold uppercase tracking-wide ${sectionHeading}`}>Set a Goal</span>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.targetDateType === 'planting' ? 'border-emerald-600 bg-white' : 'border-emerald-300 bg-white'}`}>
                         {formData.targetDateType === 'planting' && <div className="w-3 h-3 bg-emerald-600 rounded-full" />}
                      </div>
                      <input 
                        type="radio" 
                        name="targetType"
                        className="hidden"
                        checked={formData.targetDateType === 'planting'}
                        onChange={() => handleChange('targetDateType', 'planting')}
                      />
                        <span className={`text-sm font-medium ${sectionHeading}`}>Planting Date</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.targetDateType === 'harvest' ? 'border-emerald-600 bg-white' : 'border-emerald-300 bg-white'}`}>
                         {formData.targetDateType === 'harvest' && <div className="w-3 h-3 bg-emerald-600 rounded-full" />}
                      </div>
                      <input 
                        type="radio" 
                        name="targetType"
                        className="hidden"
                        checked={formData.targetDateType === 'harvest'}
                        onChange={() => handleChange('targetDateType', 'harvest')}
                      />
                        <span className={`text-sm font-medium ${sectionHeading}`}>Harvest Date</span>
                    </label>
                  </div>
                    <input
                      type="date"
                      className={`${inputBaseClass} text-sm`}
                      value={formData.targetDate}
                      onChange={(e) => handleChange('targetDate', e.target.value)}
                    />
                </div>
             </div>
          </section>

          {/* Irrigation */}
          <section className="space-y-4">
             <div className={`flex items-center gap-2 ${sectionHeading} border-b ${sectionBorder} pb-2`}>
                <div className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-emerald-900/60 text-emerald-100' : 'bg-emerald-100 text-emerald-700'}`}>
                  <Droplets className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg">Irrigation</h3>
             </div>

             <div className="space-y-3">
              {/* Sprinklers */}
              {formData.sprinklers.map((sprinkler) => (
                <div
                  key={sprinkler.id}
                  className={`border rounded-2xl p-4 transition-all shadow-sm ${
                    sprinkler.enabled
                      ? (isDarkMode
                          ? 'border-emerald-700/70 bg-emerald-900/60 shadow-emerald-950/40'
                          : 'border-emerald-200 bg-emerald-50/70 shadow-emerald-100')
                      : (isDarkMode
                          ? 'border-emerald-900 bg-emerald-950/40 text-emerald-300/80'
                          : 'border-stone-100 bg-stone-50/70 text-stone-500')
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`font-semibold text-sm ${sectionHeading}`}>Sprinkler #{sprinkler.id}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={sprinkler.enabled}
                        onChange={(e) => updateSprinkler(sprinkler.id, 'enabled', e.target.checked)}
                      />
                      <div
                        className={`w-11 h-6 rounded-full transition-colors duration-200 peer-focus:outline-none relative ${
                          isDarkMode ? 'bg-emerald-900 peer-checked:bg-emerald-500/80' : 'bg-emerald-100 peer-checked:bg-emerald-500'
                        }`}
                      >
                        <span
                          className={`absolute top-[2px] left-[2px] h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 border ${
                            isDarkMode ? 'border-emerald-700 peer-checked:border-emerald-100' : 'border-emerald-200'
                          } peer-checked:translate-x-full`}
                        />
                      </div>
                    </label>
                  </div>

                  {sprinkler.enabled && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-emerald-200/80' : 'text-emerald-700'}`}>Flow Rate</label>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded ${isDarkMode ? 'text-emerald-100 bg-emerald-900/80 border border-emerald-800' : 'text-emerald-700 bg-emerald-100 border border-emerald-200'}`}>
                             {sprinkler.flowRate} {isMetric ? 'L/min' : 'gal/min'}
                          </span>
                        </div>

                        <div className="relative pt-1 pb-6">
                           <input
                              type="range"
                              min="0"
                              max={flowMax}
                              step={isMetric ? 1 : 0.1}
                              className={`w-full h-2 rounded-lg appearance-none cursor-pointer relative z-10 ${sliderTrack}`}
                              value={sprinkler.flowRate}
                              onChange={(e) => updateSprinkler(sprinkler.id, 'flowRate', parseFloat(e.target.value))}
                            />

                            {/* Average House Marker */}
                            <div
                              className="absolute top-4 flex flex-col items-center transform -translate-x-1/2 transition-all duration-300"
                              style={{ left: `${(flowAvg / flowMax) * 100}%` }}
                            >
                               <div className={`w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[6px] mb-0.5 ${isDarkMode ? 'border-b-emerald-400' : 'border-b-emerald-500'}`}></div>
                               <span className={`text-[9px] font-bold px-1 rounded whitespace-nowrap ${isDarkMode ? 'text-emerald-100 bg-emerald-950/80 border border-emerald-800' : 'text-emerald-700 bg-white/80 border border-emerald-100'}`}>
                                  Avg House ({flowAvgLabel})
                               </span>
                            </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                           <label className={`block text-[10px] uppercase font-bold mb-1 flex items-center gap-1 ${isDarkMode ? 'text-emerald-200/80' : 'text-emerald-700'}`}><Clock className="w-3 h-3"/> Start</label>
                           <input
                            type="time"
                            className={compactInputClass}
                            value={sprinkler.startTime}
                            onChange={(e) => updateSprinkler(sprinkler.id, 'startTime', e.target.value)}
                           />
                        </div>
                        <div>
                           <label className={`block text-[10px] uppercase font-bold mb-1 flex items-center gap-1 ${isDarkMode ? 'text-emerald-200/80' : 'text-emerald-700'}`}><Clock className="w-3 h-3"/> End</label>
                           <input
                            type="time"
                            className={compactInputClass}
                            value={sprinkler.endTime}
                            onChange={(e) => updateSprinkler(sprinkler.id, 'endTime', e.target.value)}
                           />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Manual Watering Can Section */}
              <div
                className={`border rounded-2xl p-4 transition-all shadow-sm ${
                  formData.wateringCan.enabled
                    ? (isDarkMode
                        ? 'border-emerald-700/70 bg-emerald-900/60 shadow-emerald-950/40'
                        : 'border-emerald-200 bg-emerald-50/70 shadow-emerald-100')
                    : (isDarkMode
                        ? 'border-emerald-900 bg-emerald-950/40 text-emerald-300/80'
                        : 'border-stone-100 bg-stone-50/70 text-stone-500')
                }`}
              >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                       <GlassWater className={`w-4 h-4 ${isDarkMode ? 'text-emerald-200' : 'text-emerald-600'}`} />
                       <span className={`font-semibold text-sm ${sectionHeading}`}>Manual Watering</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={formData.wateringCan.enabled}
                        onChange={(e) => updateWateringCan('enabled', e.target.checked)}
                      />
                      <div
                        className={`w-11 h-6 rounded-full transition-colors duration-200 peer-focus:outline-none relative ${
                          isDarkMode ? 'bg-emerald-900 peer-checked:bg-emerald-500/80' : 'bg-emerald-100 peer-checked:bg-emerald-500'
                        }`}
                      >
                        <span
                          className={`absolute top-[2px] left-[2px] h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 border ${
                            isDarkMode ? 'border-emerald-700 peer-checked:border-emerald-100' : 'border-emerald-200'
                          } peer-checked:translate-x-full`}
                        />
                      </div>
                    </label>
                  </div>

                  {formData.wateringCan.enabled && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-emerald-200/80' : 'text-emerald-700'}`}>Can Size</label>
                          <span className={`text-xs font-bold ${isDarkMode ? 'text-emerald-100' : 'text-emerald-700'}`}>
                             {formData.wateringCan.capacity} {formData.units === UnitSystem.METRIC ? 'L' : 'Gal'}
                          </span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max={formData.units === UnitSystem.METRIC ? 20 : 5}
                          step={0.5}
                          className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer ${sliderTrack}`}
                          value={formData.wateringCan.capacity}
                          onChange={(e) => updateWateringCan('capacity', parseFloat(e.target.value))}
                        />
                      </div>

                      <div>
                         <div className="flex justify-between items-center mb-1">
                          <label className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-emerald-200/80' : 'text-emerald-700'}`}>Frequency</label>
                          <span className={`text-xs font-bold ${isDarkMode ? 'text-emerald-100' : 'text-emerald-700'}`}>
                             {formData.wateringCan.frequency}x / {formData.wateringCan.period}
                          </span>
                        </div>
                         <div className="flex gap-2">
                            <input
                              type="range"
                              min="1"
                              max="14"
                              step="1"
                              className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer mt-2 ${sliderTrack}`}
                              value={formData.wateringCan.frequency}
                              onChange={(e) => updateWateringCan('frequency', parseFloat(e.target.value))}
                            />
                            <select
                               className={`${compactInputClass} w-24 text-xs h-10`}
                               value={formData.wateringCan.period}
                               onChange={(e) => updateWateringCan('period', e.target.value)}
                            >
                               <option value="day">Day</option>
                               <option value="week">Week</option>
                            </select>
                         </div>
                      </div>
                    </div>
                  )}
              </div>

             </div>
          </section>

        </div>
      </div>

      {isLoading ? (
        <div className={`w-full backdrop-blur-sm rounded-2xl p-6 border shadow-inner text-center ${isDarkMode ? 'bg-emerald-950/70 border-emerald-900 shadow-emerald-950/40' : 'bg-white/50 border-emerald-100'}`}>
            <div className="flex flex-col items-center justify-center gap-3">
               <div className="w-12 h-12 relative animate-spin-slow">
                  <div className={`absolute inset-0 border-4 rounded-full ${isDarkMode ? 'border-emerald-900' : 'border-emerald-200'}`}></div>
                  <div className={`absolute inset-0 border-4 rounded-full border-t-transparent animate-spin ${isDarkMode ? 'border-emerald-400' : 'border-emerald-500'}`}></div>
                  <Leaf className={`w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isDarkMode ? 'text-emerald-100' : 'text-emerald-600'}`} />
               </div>
               <h3 className={`text-lg font-bold animate-pulse ${isDarkMode ? 'text-emerald-100' : 'text-emerald-800'}`}>{loadingText}</h3>
               <div className={`w-full max-w-sm rounded-full h-2.5 mt-2 overflow-hidden ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-100'}`}>
                  <div className={`h-2.5 rounded-full transition-all duration-300 ease-out ${isDarkMode ? 'bg-emerald-400' : 'bg-emerald-500'}`} style={{ width: `${progress}%` }}></div>
               </div>
            </div>
        </div>
      ) : (
        <button
          onClick={onSubmit}
          disabled={isLoading || !formData.postcode || !formData.crop}
          className={`w-full font-bold py-5 rounded-2xl transform transition active:scale-[0.99] flex items-center justify-center gap-3 text-lg border ${
            isDarkMode
              ? `${isLoading || !formData.postcode || !formData.crop
                  ? 'bg-emerald-800/70 text-emerald-50/80 border-emerald-700/70 shadow-inner shadow-emerald-950/40 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white border-emerald-700/70 shadow-lg shadow-emerald-900/40'}`
              : `${isLoading || !formData.postcode || !formData.crop
                  ? 'bg-stone-200 text-emerald-600/60 border-stone-200 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white shadow-lg shadow-emerald-200'}`
          }`}
        >
          <Leaf className="w-6 h-6" />
          Generate Garden Plan
        </button>
      )}
    </div>
  );
};