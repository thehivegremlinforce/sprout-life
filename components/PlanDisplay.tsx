import React from 'react';
import { GardenPlanResponse, UnitSystem } from '../types';
import { 
  Sun, CloudRain, Sprout, Bug, Shovel, Users, Ruler, 
  AlertTriangle, CheckCircle, Info, Thermometer, Leaf, Calendar, MapPin, Search
} from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface PlanDisplayProps {
  plan: GardenPlanResponse;
  units: UnitSystem;
  reset: () => void;
  isDarkMode: boolean;
}

const Card: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; className?: string; colorClass?: string; darkColorClass?: string; isDarkMode: boolean; }> = ({ title, icon, children, className = "", colorClass = "text-emerald-600 bg-emerald-50 border-emerald-100", darkColorClass, isDarkMode }) => {
  const iconClasses = (isDarkMode ? darkColorClass || "bg-emerald-900 text-emerald-100 border-emerald-800" : colorClass)
    .split(' ')
    .filter(c => c.includes('bg-') || c.includes('text-') || c.includes('border-'))
    .join(' ');

  return (
    <div className={`${isDarkMode ? 'bg-[#0c1510]/95 text-emerald-50 border border-emerald-900 shadow-emerald-950/40' : 'bg-white text-emerald-950 border border-emerald-100/50 shadow-emerald-900/5'} rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${className}`}>
      <div className={`px-6 py-4 flex items-center gap-3 ${isDarkMode ? 'border-b border-emerald-900/60' : 'border-b border-stone-50'}`}>
        <div className={`p-2 rounded-xl ${iconClasses}`}>
          {icon}
        </div>
        <h3 className={`font-bold text-lg ${isDarkMode ? 'text-emerald-50' : 'text-emerald-950'}`}>{title}</h3>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

const SpacingVisualizer: React.FC<{ between: string; row: string; depth: string; isDarkMode: boolean }> = ({ between, row, depth, isDarkMode }) => {
  return (
    <div className={`${isDarkMode ? 'bg-emerald-950/40 border border-emerald-900' : 'bg-indigo-50/50 border border-indigo-100/50'} rounded-xl p-6 relative overflow-hidden h-48 flex items-center justify-center`}>
      {/* 2x2 Grid Visualization */}
      <div className="relative w-64 h-32">
        {/* Plant Nodes */}
        <div className={`absolute top-0 left-0 w-8 h-8 rounded-full shadow-md flex items-center justify-center z-10 ${isDarkMode ? 'bg-emerald-400' : 'bg-emerald-500'}`}>
           <Leaf className="w-4 h-4 text-emerald-100" />
        </div>
        <div className={`absolute top-0 right-0 w-8 h-8 rounded-full shadow-md flex items-center justify-center z-10 ${isDarkMode ? 'bg-emerald-400' : 'bg-emerald-500'}`}>
           <Leaf className="w-4 h-4 text-emerald-100" />
        </div>
        <div className={`absolute bottom-0 left-0 w-8 h-8 rounded-full shadow-md flex items-center justify-center z-10 ${isDarkMode ? 'bg-emerald-400' : 'bg-emerald-500'}`}>
           <Leaf className="w-4 h-4 text-emerald-100" />
        </div>
        <div className={`absolute bottom-0 right-0 w-8 h-8 rounded-full shadow-md flex items-center justify-center z-10 ${isDarkMode ? 'bg-emerald-400' : 'bg-emerald-500'}`}>
           <Leaf className="w-4 h-4 text-emerald-100" />
        </div>

        {/* Horizontal Spacing Arrow */}
        <div className={`absolute top-4 left-8 right-8 h-px flex items-center justify-center ${isDarkMode ? 'bg-emerald-700' : 'bg-indigo-300'}`}>
           <div className={`absolute left-0 w-1 h-1 rounded-full ${isDarkMode ? 'bg-emerald-700' : 'bg-indigo-300'}`}></div>
           <div className={`absolute right-0 w-1 h-1 rounded-full ${isDarkMode ? 'bg-emerald-700' : 'bg-indigo-300'}`}></div>
           <div className={`px-2 py-0.5 rounded-full border text-xs font-bold shadow-sm whitespace-nowrap z-20 ${isDarkMode ? 'bg-emerald-950/80 border-emerald-800 text-emerald-100' : 'bg-white border border-indigo-100 text-indigo-600'}`}>
              {between}
           </div>
        </div>

        {/* Vertical Spacing Arrow */}
        <div className={`absolute top-8 bottom-8 left-4 w-px flex items-center justify-center ${isDarkMode ? 'bg-emerald-700' : 'bg-indigo-300'}`}>
           <div className={`absolute top-0 w-1 h-1 rounded-full ${isDarkMode ? 'bg-emerald-700' : 'bg-indigo-300'}`}></div>
           <div className={`absolute bottom-0 w-1 h-1 rounded-full ${isDarkMode ? 'bg-emerald-700' : 'bg-indigo-300'}`}></div>
           <div className={`px-2 py-0.5 rounded-full border text-xs font-bold shadow-sm whitespace-nowrap rotate-90 z-20 ${isDarkMode ? 'bg-emerald-950/80 border-emerald-800 text-emerald-100' : 'bg-white border border-indigo-100 text-indigo-600'}`}>
              {row}
           </div>
        </div>
        
        {/* Labels */}
        <div className={`absolute -bottom-6 w-full text-center text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-emerald-300/80' : 'text-indigo-300'}`}>
           Plan View
        </div>
      </div>
    </div>
  );
};

const PestCard: React.FC<{ name: string; isDarkMode: boolean }> = ({ name, isDarkMode }) => (
  <div className={`flex items-center justify-between p-3 rounded-xl border group transition-colors ${isDarkMode ? 'bg-emerald-950/50 border-emerald-900 text-emerald-50 hover:bg-emerald-900/60' : 'bg-rose-50 border border-rose-100 hover:bg-rose-100'}`}>
    <span className={`text-sm font-bold ${isDarkMode ? 'text-emerald-50' : 'text-rose-800'}`}>{name}</span>
    <a
      href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(name + ' garden pest')}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-xs px-2 py-1 rounded-md border flex items-center gap-1 transition-colors ${isDarkMode ? 'bg-emerald-900 text-emerald-100 border-emerald-800 hover:bg-emerald-800/80' : 'bg-white text-rose-600 border border-rose-200 hover:bg-rose-50'}`}
    >
      <Search className="w-3 h-3" /> Identify
    </a>
  </div>
);

export const PlanDisplay: React.FC<PlanDisplayProps> = ({ plan, units, reset, isDarkMode }) => {
  // Logic to prevent "Southern Hemisphere Hemisphere" if the AI returns the full text
  const hemisphereText = plan.hemisphere.toLowerCase().includes('hemisphere')
    ? plan.hemisphere
    : `${plan.hemisphere} Hemisphere`;

  const subtleText = isDarkMode ? 'text-emerald-200/80' : 'text-stone-600';
  const subtleCaps = isDarkMode ? 'text-emerald-400/80' : 'text-stone-400';
  const softSurface = isDarkMode ? 'bg-emerald-950/40 border border-emerald-900 text-emerald-100' : 'bg-stone-50 border border-stone-100 text-stone-600';
  const pillSurface = isDarkMode ? 'bg-emerald-900/60 text-emerald-100 border border-emerald-800' : 'bg-white text-emerald-800 border border-emerald-100';

  const parseSpacingValue = (value: string) => {
    const match = value.match(/\d+(?:\.\d+)?(?:\s*(?:-|to)\s*\d+(?:\.\d+)?)/i);
    return match ? match[0].replace(/\s+/g, ' ') : value;
  };

  const plantSpacingValue = parseSpacingValue(plan.spacing.plantSpacing);
  const rowSpacingValue = parseSpacingValue(plan.spacing.rowSpacing);

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 pb-12">

      {/* Printable Area Wrapper */}
      <div className={`space-y-10 pb-6 p-4 sm:p-0 ${isDarkMode ? 'bg-transparent text-emerald-50' : 'bg-white'}`}>
        {/* Hero Header */}
        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-emerald-950 text-white">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-950/85 to-emerald-900/80 z-10" />
          <img
            src="https://picsum.photos/1200/400?grayscale"
            alt={plan.cropName}
            className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105 mix-blend-multiply"
          />
          <div className="relative z-20 p-8 md:p-14">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="space-y-6 w-full min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                   {plan.locationName && (
                    <div className="inline-flex items-center justify-center gap-2 bg-emerald-800/80 px-4 py-1.5 rounded-full text-sm font-semibold border border-emerald-500/30 text-emerald-100 text-center">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{plan.locationName}</span>
                    </div>
                   )}
                   <div className="inline-flex items-center justify-center gap-2 bg-emerald-800/80 px-4 py-1.5 rounded-full text-sm font-semibold border border-emerald-500/30 text-emerald-100 text-center">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] flex-shrink-0"></span>
                      <span>{hemisphereText}</span>
                    </div>
                    <div className="inline-flex items-center justify-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-sm font-semibold border border-white/10 text-emerald-50 text-center">
                      <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Best Season: {plan.overview.bestSeason}</span>
                    </div>
                </div>
                
                <div className="space-y-2">
                  <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight capitalize text-transparent bg-clip-text bg-gradient-to-br from-white to-emerald-200 drop-shadow-sm leading-tight break-words">
                    {plan.cropName}
                  </h1>
                  <p className="text-emerald-100/90 text-lg md:text-xl max-w-2xl leading-relaxed font-light whitespace-pre-line">
                    {plan.overview.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-4 flex-shrink-0 w-full md:w-auto">
                <div className="bg-emerald-950/80 p-4 rounded-2xl border border-emerald-500/30 text-center min-w-[180px] max-w-xs w-full md:w-auto">
                  <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold block mb-1">Difficulty</span>
                  <span className="text-2xl font-bold leading-snug break-words" aria-label="Difficulty level">
                    {plan.overview.difficulty}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Planting Dates */}
          <Card
            title="Planting Window"
            icon={<Sprout className="w-6 h-6"/>}
            colorClass="bg-lime-50 text-lime-700"
            darkColorClass="bg-emerald-900 text-emerald-100 border-emerald-800"
            isDarkMode={isDarkMode}
          >
            <div className="space-y-5">
               <div className={`flex flex-col gap-2 p-4 rounded-2xl ${isDarkMode ? 'bg-emerald-950/50 border border-emerald-900 text-emerald-50' : 'bg-lime-50/50 border border-lime-100'}`}>
                  <span className={`text-sm font-semibold ${isDarkMode ? 'text-emerald-100' : 'text-lime-800'}`}>Optimal Sowing</span>
                  <span className={`font-bold px-3 py-2 rounded-lg shadow-sm whitespace-pre-line text-sm leading-relaxed ${isDarkMode ? 'bg-emerald-950/60 text-emerald-50 border border-emerald-900' : 'text-lime-900 bg-white'}`}>{plan.planting.window}</span>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className={`text-xs font-bold uppercase tracking-wide ${subtleCaps}`}>Germination</span>
                    <div className="flex items-start gap-2">
                      <Thermometer className={`w-4 h-4 ${isDarkMode ? 'text-amber-200' : 'text-orange-400'} mt-0.5`} />
                      <span className={`font-semibold text-sm whitespace-pre-line ${isDarkMode ? 'text-emerald-100' : 'text-stone-700'}`}>{plan.planting.germinationTemp}</span>
                    </div>
                    <p className={`text-xs whitespace-pre-line ${subtleText}`}>{plan.planting.germinationDays} days</p>
                  </div>
                  <div className="space-y-1">
                    <span className={`text-xs font-bold uppercase tracking-wide ${subtleCaps}`}>Harvest</span>
                    <p className={`font-semibold text-sm leading-snug whitespace-pre-line ${isDarkMode ? 'text-emerald-100' : 'text-stone-700'}`}>{plan.planting.harvestRange}</p>
                  </div>
               </div>

               {plan.planting.indoorStart && (
                 <div className={`flex gap-3 text-sm p-3 rounded-xl border ${isDarkMode ? 'bg-emerald-950/60 text-emerald-50 border-emerald-900' : 'bg-blue-50/80 text-blue-800 border-blue-100'}`}>
                   <Info className={`w-5 h-5 shrink-0 ${isDarkMode ? 'text-emerald-200' : 'text-blue-600'}`} />
                   Start indoors for best results in your climate.
                 </div>
               )}
            </div>
          </Card>

          {/* Sunlight */}
          <Card
            title="Sun & Location"
            icon={<Sun className="w-6 h-6"/>}
            colorClass="bg-amber-50 text-amber-600"
            darkColorClass="bg-emerald-900 text-emerald-100 border-emerald-800"
            isDarkMode={isDarkMode}
          >
             <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <span className={`text-sm font-medium ${subtleText}`}>Requirement</span>
                  <span className={`font-bold whitespace-pre-line ${isDarkMode ? 'text-emerald-50' : 'text-amber-700'}`}>{plan.sun.required}</span>
                </div>

                <div className={`p-4 rounded-2xl border ${plan.sun.orientationSuitability.toLowerCase().includes('ideal') || plan.sun.orientationSuitability.toLowerCase().includes('good') ? (isDarkMode ? 'bg-emerald-950/60 border-emerald-900 text-emerald-50' : 'bg-green-50 border-green-200 text-green-800') : (isDarkMode ? 'bg-emerald-950/40 border-emerald-900 text-emerald-100' : 'bg-amber-50 border-amber-200 text-amber-800')}`}>
                  <p className={`font-medium leading-relaxed whitespace-pre-line text-sm ${isDarkMode ? 'text-emerald-100' : ''}`}>{plan.sun.orientationSuitability}</p>
                </div>

                {plan.sun.fixes.length > 0 && (
                  <div className={`rounded-xl p-3 ${isDarkMode ? 'bg-emerald-950/50 border border-emerald-900' : 'bg-stone-50'}`}>
                    <p className={`text-xs font-bold uppercase mb-2 ${subtleCaps}`}>Optimizations</p>
                    <ul className="space-y-2">
                      {plan.sun.fixes.map((fix, i) => (
                        <li key={i} className={`flex items-start gap-2 text-sm ${subtleText}`}>
                           <div className={`w-1.5 h-1.5 rounded-full ${isDarkMode ? 'bg-emerald-300' : 'bg-amber-400'} mt-1.5 shrink-0`} />
                           {fix}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
             </div>
          </Card>

          {/* Soil Prep */}
          <Card
            title="Soil Health"
            icon={<Shovel className="w-6 h-6"/>}
            colorClass="bg-orange-50 text-orange-700"
            darkColorClass="bg-emerald-900 text-emerald-100 border-emerald-800"
            isDarkMode={isDarkMode}
          >
             <div className="space-y-4">
              <p className={`text-sm leading-relaxed p-3 rounded-xl whitespace-pre-line ${isDarkMode ? 'bg-emerald-950/50 border border-emerald-900 text-emerald-100' : 'text-stone-600 bg-stone-50 border border-stone-100'}`}>
                 {plan.soil.prepInstructions}
              </p>

               <div>
                <h4 className={`text-xs font-bold uppercase mb-2 ${subtleCaps}`}>Recommended Amendments</h4>
                 <div className="flex flex-wrap gap-2">
                   {plan.soil.amendments.map((item, i) => (
                     <span key={i} className={`px-3 py-1 rounded-full text-xs font-medium border ${isDarkMode ? 'bg-emerald-950/50 text-emerald-50 border-emerald-800' : 'bg-orange-50 text-orange-800 border border-orange-100'}`}>{item}</span>
                   ))}
                 </div>
               </div>

               <div>
                 <h4 className={`text-xs font-bold uppercase mb-2 ${subtleCaps}`}>Feeding Schedule</h4>
                 <ul className="space-y-3">
                   {plan.soil.fertilizerTimeline.map((item, i) => (
                     <li key={i} className="text-sm flex flex-col gap-1">
                       <span className={`font-bold text-xs py-1 px-2 rounded-lg whitespace-nowrap w-fit ${isDarkMode ? 'bg-emerald-900/70 text-emerald-50 border border-emerald-800' : 'text-orange-700 bg-orange-100'}`}>{item.stage}</span>
                       <span className={`leading-snug whitespace-pre-line pl-1 ${subtleText}`}>{item.action}</span>
                    </li>
                  ))}
                </ul>
               </div>
            </div>
         </Card>

          {/* Water & Irrigation */}
          <Card
            title="Irrigation Plan"
            icon={<CloudRain className="w-6 h-6"/>}
            className="md:col-span-2"
            colorClass="bg-sky-50 text-sky-600"
            darkColorClass="bg-emerald-900 text-emerald-100 border-emerald-800"
            isDarkMode={isDarkMode}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-5">
                <div className={`flex flex-col items-center justify-center p-4 rounded-2xl border ${isDarkMode ? 'bg-emerald-950/50 border-emerald-900 text-emerald-50' : 'bg-sky-50 border border-sky-100'}`}>
                  <span className={`text-xs font-bold uppercase tracking-wider mb-1 ${isDarkMode ? 'text-emerald-200/80' : 'text-sky-600/70'}`}>Daily Water Need</span>
                  <span className={`text-xl md:text-2xl font-extrabold whitespace-pre-line text-center ${isDarkMode ? 'text-emerald-50' : 'text-sky-700'}`}>{plan.water.dailyRequirement}</span>
                </div>
                
                <div className="h-32 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={plan.water.monthlyWaterNeeds}>
                      <XAxis dataKey="month" tick={{fontSize: 10, fill: isDarkMode ? '#c5e6cf' : '#78716c'}} axisLine={false} tickLine={false} />
                      <Tooltip 
                        cursor={{fill: 'transparent'}} 
                        contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                      />
                      <Bar dataKey="amount" radius={[4, 4, 4, 4]}>
                        {plan.water.monthlyWaterNeeds.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#38bdf8' : '#0ea5e9'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-4">
                {plan.water.sprinklerAnalysis.map((item, i) => (
                  <div key={i} className={`flex gap-3 items-start text-sm p-2.5 rounded-lg ${isDarkMode ? 'bg-emerald-950/50 text-emerald-100 border border-emerald-900' : 'text-stone-600 bg-stone-50'}`}>
                    <CheckCircle className={`w-4 h-4 ${isDarkMode ? 'text-emerald-200' : 'text-sky-500'} mt-0.5 shrink-0`} />
                    <span className="whitespace-pre-line">{item}</span>
                  </div>
                ))}

                {plan.water.manualWateringNeeded && (
                 <div className={`flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-lg border ${isDarkMode ? 'bg-emerald-950/50 text-emerald-100 border-emerald-900' : 'text-amber-600 bg-amber-50 border border-amber-100'}`}>
                   <AlertTriangle className={`w-4 h-4 ${isDarkMode ? 'text-emerald-200' : ''}`} />
                   Hand watering required to meet targets.
                 </div>
               )}
              </div>
            </div>
          </Card>

          {/* Spacing */}
          <Card
            title="Space & Layout"
            icon={<Ruler className="w-6 h-6"/>}
            colorClass="bg-indigo-50 text-indigo-600"
            darkColorClass="bg-emerald-900 text-emerald-100 border-emerald-800"
            isDarkMode={isDarkMode}
          >
             <div className="grid grid-cols-2 gap-3 text-center mb-4">
               <div className={`p-3 rounded-2xl border ${isDarkMode ? 'bg-emerald-950/50 border-emerald-900 text-emerald-100' : 'bg-stone-50 border border-stone-100'}`}>
                  <div className={`text-[10px] font-bold uppercase mb-1 ${subtleCaps}`}>Seed Depth</div>
                  <div className={`font-bold text-sm whitespace-pre-line break-words ${isDarkMode ? 'text-emerald-50' : 'text-stone-800'}`}>{plan.spacing.seedDepth}</div>
               </div>
               <div className={`p-3 rounded-2xl border ${isDarkMode ? 'bg-emerald-950/50 border-emerald-900 text-emerald-100' : 'bg-stone-50 border border-stone-100'}`}>
                  <div className={`text-[10px] font-bold uppercase mb-1 ${subtleCaps}`}>Thin To</div>
                  <div className={`font-bold text-sm whitespace-pre-line break-words ${isDarkMode ? 'text-emerald-50' : 'text-stone-800'}`}>{plan.spacing.thinning}</div>
               </div>
               <div className={`p-3 rounded-2xl border col-span-2 ${isDarkMode ? 'bg-emerald-950/50 border-emerald-900 text-emerald-100' : 'bg-stone-50 border border-stone-100'}`}>
                  <div className={`text-[10px] font-bold uppercase mb-2 ${subtleCaps}`}>Distance</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                    <div className={`rounded-xl px-3 py-2 border flex flex-col gap-1 ${isDarkMode ? 'bg-emerald-950/70 border-emerald-900/80' : 'bg-white border-emerald-50'}`}>
                      <span className={`text-[10px] uppercase font-bold tracking-wide ${subtleCaps}`}>Between Plants</span>
                      <span className={`font-semibold text-sm leading-snug whitespace-pre-line break-words ${isDarkMode ? 'text-emerald-50' : 'text-stone-800'}`}>{plan.spacing.plantSpacing}</span>
                    </div>
                    <div className={`rounded-xl px-3 py-2 border flex flex-col gap-1 ${isDarkMode ? 'bg-emerald-950/70 border-emerald-900/80' : 'bg-white border-emerald-50'}`}>
                      <span className={`text-[10px] uppercase font-bold tracking-wide ${subtleCaps}`}>Between Rows</span>
                      <span className={`font-semibold text-sm leading-snug whitespace-pre-line break-words ${isDarkMode ? 'text-emerald-50' : 'text-stone-800'}`}>{plan.spacing.rowSpacing}</span>
                    </div>
                  </div>
               </div>
             </div>
             
             <SpacingVisualizer
                between={plantSpacingValue + (units === UnitSystem.METRIC ? ' cm' : ' in')}
                row={rowSpacingValue + (units === UnitSystem.METRIC ? ' cm' : ' in')}
                depth={plan.spacing.seedDepth}
                isDarkMode={isDarkMode}
             />
          </Card>

          {/* Companions */}
          <Card
            title="Companion Planting"
            icon={<Users className="w-6 h-6"/>}
            className="md:col-span-2"
            colorClass="bg-purple-50 text-purple-600"
            darkColorClass="bg-emerald-900 text-emerald-100 border-emerald-800"
            isDarkMode={isDarkMode}
          >
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                <div className="space-y-3">
                  <div className={`flex items-center gap-2 mb-1 ${isDarkMode ? 'text-emerald-100' : 'text-emerald-700'}`}>
                    <CheckCircle className="w-4 h-4" />
                    <h4 className="font-bold text-sm uppercase tracking-wide">Beneficial Matches</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {plan.companions.good.map((c, i) => (
                      <span key={i} className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${isDarkMode ? 'bg-emerald-950/50 text-emerald-100 border-emerald-800' : 'bg-emerald-50 text-emerald-800 border border-emerald-100'}`}>{c}</span>
                    ))}
                  </div>
                  <div className={`p-3 rounded-xl border mt-4 ${isDarkMode ? 'bg-emerald-950/50 text-emerald-100 border-emerald-900' : 'bg-purple-50 border border-purple-100'}`}>
                     <p className={`text-xs font-medium leading-relaxed whitespace-pre-line ${isDarkMode ? 'text-emerald-100' : 'text-purple-800'}`}>
                       <span className="font-bold block mb-1">Synergy Effects:</span>
                       {plan.companions.benefits}
                     </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className={`flex items-center gap-2 mb-1 ${isDarkMode ? 'text-emerald-100' : 'text-rose-700'}`}>
                    <AlertTriangle className="w-4 h-4" />
                    <h4 className="font-bold text-sm uppercase tracking-wide">Incompatible</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {plan.companions.bad.map((c, i) => (
                      <span key={i} className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${isDarkMode ? 'bg-emerald-950/50 text-emerald-100 border-emerald-800' : 'bg-rose-50 text-rose-800 border border-rose-100'}`}>{c}</span>
                    ))}
                  </div>
                  <p className={`text-xs mt-2 ${subtleCaps}`}>
                    Avoid planting these nearby to prevent competition for nutrients or pests.
                  </p>
                </div>
             </div>
          </Card>

          {/* Pests */}
          <Card
            title="Pest Management"
            icon={<Bug className="w-6 h-6"/>}
            colorClass="bg-rose-50 text-rose-600"
            darkColorClass="bg-emerald-900 text-emerald-100 border-emerald-800"
            isDarkMode={isDarkMode}
          >
             <div className="space-y-4">
                <div>
                  <span className={`text-xs font-bold uppercase tracking-wide block mb-2 ${subtleCaps}`}>Common Threats</span>
                  <div className="flex flex-col gap-2">
                    {plan.pests.likelyPests.map((p, i) => (
                      <PestCard key={i} name={p} isDarkMode={isDarkMode} />
                    ))}
                  </div>
                </div>

                <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-emerald-950/50 border border-emerald-900' : 'bg-stone-50'}`}>
                  <span className={`text-xs font-bold uppercase tracking-wide ${subtleCaps}`}>Early Signs</span>
                  <ul className={`list-disc pl-4 text-sm mt-1 space-y-1 ${subtleText}`}>
                    {plan.pests.signs.map((s, i) => <li key={i} className="whitespace-pre-line">{s}</li>)}
                  </ul>
                </div>

                <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-emerald-950/50 border-emerald-900' : 'bg-emerald-50 border border-emerald-100'}`}>
                  <span className={`text-xs font-bold uppercase tracking-wide block mb-1 ${isDarkMode ? 'text-emerald-200' : 'text-emerald-700'}`}>Organic Prevention</span>
                  <p className={`text-sm leading-snug whitespace-pre-line ${isDarkMode ? 'text-emerald-50' : 'text-emerald-900'}`}>{plan.pests.prevention}</p>
                </div>
             </div>
          </Card>

          {/* Yield Tips */}
          <Card
            title="Expert Tips for Yield"
            icon={<Leaf className="w-6 h-6"/>}
            className="md:col-span-2 lg:col-span-3"
            colorClass="bg-teal-50 text-teal-600"
            darkColorClass="bg-emerald-900 text-emerald-100 border-emerald-800"
            isDarkMode={isDarkMode}
          >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`p-5 rounded-2xl border transition-colors ${isDarkMode ? 'bg-emerald-950/50 border-emerald-900 hover:bg-emerald-900/50' : 'bg-teal-50/50 border border-teal-100/50 hover:bg-teal-50'}`}>
                  <h4 className={`font-bold mb-2 flex items-center gap-2 ${isDarkMode ? 'text-emerald-50' : 'text-teal-900'}`}>
                    <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-emerald-300' : 'bg-teal-500'}`} />
                    Hardening Off
                  </h4>
                  <p className={`text-sm leading-relaxed whitespace-pre-line ${subtleText}`}>{plan.yield.hardening}</p>
                </div>
                <div className={`p-5 rounded-2xl border transition-colors ${isDarkMode ? 'bg-emerald-950/50 border-emerald-900 hover:bg-emerald-900/50' : 'bg-teal-50/50 border border-teal-100/50 hover:bg-teal-50'}`}>
                  <h4 className={`font-bold mb-2 flex items-center gap-2 ${isDarkMode ? 'text-emerald-50' : 'text-teal-900'}`}>
                    <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-emerald-300' : 'bg-teal-500'}`} />
                    Pruning & Care
                  </h4>
                  <p className={`text-sm leading-relaxed whitespace-pre-line ${subtleText}`}>{plan.yield.pruning}</p>
                </div>
                <div className={`p-5 rounded-2xl border transition-colors ${isDarkMode ? 'bg-emerald-950/50 border-emerald-900 hover:bg-emerald-900/50' : 'bg-teal-50/50 border border-teal-100/50 hover:bg-teal-50'}`}>
                  <h4 className={`font-bold mb-2 flex items-center gap-2 ${isDarkMode ? 'text-emerald-50' : 'text-teal-900'}`}>
                    <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-emerald-300' : 'bg-teal-500'}`} />
                    Common Mistakes
                  </h4>
                  <p className={`text-sm leading-relaxed whitespace-pre-line ${subtleText}`}>{plan.yield.commonMistakes}</p>
                </div>
              </div>
          </Card>

        </div>

        {/* Motivational Footer */}
        <div className={`rounded-3xl p-8 text-center border ${isDarkMode ? 'bg-gradient-to-r from-emerald-950/70 via-emerald-900/70 to-emerald-950/70 border-emerald-900 text-emerald-50' : 'bg-gradient-to-r from-emerald-100/50 to-lime-100/50 border border-emerald-100'}`}>
           <p className={`text-xl md:text-2xl font-serif italic ${isDarkMode ? 'text-emerald-50' : 'text-emerald-800'}`}>
             "{plan.motivationalMessage}"
           </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4 mt-8">
        <button 
          onClick={reset}
          className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-5 rounded-2xl shadow-xl transform transition hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 text-lg"
        >
          <Sprout className="w-6 h-6" />
          Create Another Plan
        </button>
      </div>

    </div>
  );
};