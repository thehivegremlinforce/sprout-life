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
}

const Card: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; className?: string; colorClass?: string }> = ({ title, icon, children, className = "", colorClass = "text-emerald-600 bg-emerald-50 border-emerald-100" }) => (
  <div className={`bg-white rounded-3xl shadow-lg shadow-emerald-900/5 border border-emerald-100/50 overflow-hidden hover:shadow-xl transition-shadow duration-300 ${className}`}>
    <div className={`px-6 py-4 border-b border-stone-50 flex items-center gap-3`}>
      <div className={`p-2 rounded-xl ${colorClass.split(' ').filter(c => c.includes('bg-') || c.includes('text-')).join(' ')}`}>
        {icon}
      </div>
      <h3 className="font-bold text-lg text-emerald-950">{title}</h3>
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

const SpacingVisualizer: React.FC<{ between: string; row: string; depth: string }> = ({ between, row, depth }) => {
  return (
    <div className="bg-indigo-50/50 rounded-xl p-6 relative overflow-hidden h-48 flex items-center justify-center border border-indigo-100/50">
      {/* 2x2 Grid Visualization */}
      <div className="relative w-64 h-32">
        {/* Plant Nodes */}
        <div className="absolute top-0 left-0 w-8 h-8 bg-emerald-500 rounded-full shadow-md flex items-center justify-center z-10">
           <Leaf className="w-4 h-4 text-emerald-100" />
        </div>
        <div className="absolute top-0 right-0 w-8 h-8 bg-emerald-500 rounded-full shadow-md flex items-center justify-center z-10">
           <Leaf className="w-4 h-4 text-emerald-100" />
        </div>
        <div className="absolute bottom-0 left-0 w-8 h-8 bg-emerald-500 rounded-full shadow-md flex items-center justify-center z-10">
           <Leaf className="w-4 h-4 text-emerald-100" />
        </div>
        <div className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-500 rounded-full shadow-md flex items-center justify-center z-10">
           <Leaf className="w-4 h-4 text-emerald-100" />
        </div>

        {/* Horizontal Spacing Arrow */}
        <div className="absolute top-4 left-8 right-8 h-px bg-indigo-300 flex items-center justify-center">
           <div className="absolute left-0 w-1 h-1 bg-indigo-300 rounded-full"></div>
           <div className="absolute right-0 w-1 h-1 bg-indigo-300 rounded-full"></div>
           <div className="bg-white px-2 py-0.5 rounded-full border border-indigo-100 text-xs font-bold text-indigo-600 shadow-sm whitespace-nowrap z-20">
              {between}
           </div>
        </div>

        {/* Vertical Spacing Arrow */}
        <div className="absolute top-8 bottom-8 left-4 w-px bg-indigo-300 flex items-center justify-center">
           <div className="absolute top-0 w-1 h-1 bg-indigo-300 rounded-full"></div>
           <div className="absolute bottom-0 w-1 h-1 bg-indigo-300 rounded-full"></div>
           <div className="bg-white px-2 py-0.5 rounded-full border border-indigo-100 text-xs font-bold text-indigo-600 shadow-sm whitespace-nowrap rotate-90 z-20">
              {row}
           </div>
        </div>
        
        {/* Labels */}
        <div className="absolute -bottom-6 w-full text-center text-[10px] font-bold text-indigo-300 uppercase tracking-widest">
           Plan View
        </div>
      </div>
    </div>
  );
};

const extractSpacingValue = (value: string, preferredUnit: 'metric' | 'imperial') => {
  const match = value.replace(',', '.').match(/([\d.]+)\s*(cm|in|"|')?/i);
  if (match) {
    const numeric = match[1];
    return `${numeric}${preferredUnit === 'metric' ? 'cm' : 'in'}`;
  }

  // Fallback to the first chunk of text to avoid rendering empty strings
  const firstToken = value.split(/\s+/)[0];
  return `${firstToken}${preferredUnit === 'metric' ? 'cm' : 'in'}`;
};

const PestCard: React.FC<{ name: string }> = ({ name }) => (
  <div className="flex items-center justify-between bg-rose-50 p-3 rounded-xl border border-rose-100 group hover:bg-rose-100 transition-colors">
    <span className="text-sm font-bold text-rose-800">{name}</span>
    <a 
      href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(name + ' garden pest')}`}
      target="_blank" 
      rel="noopener noreferrer"
      className="text-xs bg-white text-rose-600 px-2 py-1 rounded-md border border-rose-200 hover:bg-rose-50 flex items-center gap-1 transition-colors"
    >
      <Search className="w-3 h-3" /> Identify
    </a>
  </div>
);

export const PlanDisplay: React.FC<PlanDisplayProps> = ({ plan, units, reset }) => {
  // Logic to prevent "Southern Hemisphere Hemisphere" if the AI returns the full text
  const hemisphereText = plan.hemisphere.toLowerCase().includes('hemisphere') 
    ? plan.hemisphere 
    : `${plan.hemisphere} Hemisphere`;

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 pb-12">
      
      {/* Printable Area Wrapper */}
      <div className="space-y-10 pb-6 bg-white p-4 sm:p-0">
        {/* Hero Header */}
        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-gradient-to-r from-emerald-50 via-white to-emerald-50 text-emerald-900 border border-emerald-100">
          <img
            src="https://picsum.photos/1200/400?grayscale"
            alt={plan.cropName}
            className="absolute inset-0 w-full h-full object-cover opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-emerald-50/80" />
          <div className="relative z-20 p-8 md:p-14">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="space-y-6 w-full min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                   {plan.locationName && (
                    <div className="inline-flex items-center justify-center gap-2 bg-white px-4 py-1.5 rounded-full text-sm font-semibold border border-emerald-100 text-emerald-800 text-center shadow-sm">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-emerald-600" />
                      <span>{plan.locationName}</span>
                    </div>
                   )}
                   <div className="inline-flex items-center justify-center gap-2 bg-emerald-50 px-4 py-1.5 rounded-full text-sm font-semibold border border-emerald-100 text-emerald-800 text-center shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(52,211,153,0.8)] flex-shrink-0"></span>
                      <span>{hemisphereText}</span>
                    </div>
                    <div className="inline-flex items-center justify-center gap-2 bg-white px-4 py-1.5 rounded-full text-sm font-semibold border border-emerald-100 text-emerald-700 text-center shadow-sm">
                      <Calendar className="w-3.5 h-3.5 flex-shrink-0 text-emerald-600" />
                      <span>Best Season: {plan.overview.bestSeason}</span>
                    </div>
                </div>

                <div className="space-y-2">
                  <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight capitalize text-transparent bg-clip-text bg-gradient-to-br from-emerald-700 via-emerald-500 to-emerald-400 drop-shadow-sm leading-tight break-words">
                    {plan.cropName}
                  </h1>
                  <p className="text-emerald-800 text-lg md:text-xl max-w-2xl leading-relaxed font-medium whitespace-pre-line">
                    {plan.overview.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-4 flex-shrink-0 w-full md:w-auto">
                <div className="bg-white p-4 rounded-2xl border border-emerald-100 text-center min-w-[180px] max-w-xs w-full md:w-auto shadow-sm">
                  <span className="text-xs uppercase tracking-widest text-emerald-500 font-bold block mb-1">Difficulty</span>
                  <span className="text-2xl font-bold leading-snug break-words text-emerald-800" aria-label="Difficulty level">
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
          >
            <div className="space-y-5">
               <div className="flex flex-col gap-2 p-4 bg-lime-50/50 border border-lime-100 rounded-2xl">
                  <span className="text-sm font-semibold text-lime-800">Optimal Sowing</span>
                  <span className="font-bold text-lime-900 bg-white px-3 py-2 rounded-lg shadow-sm whitespace-pre-line text-sm leading-relaxed">{plan.planting.window}</span>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-wide">Germination</span>
                    <div className="flex items-start gap-2">
                      <Thermometer className="w-4 h-4 text-orange-400 mt-0.5" />
                      <span className="font-semibold text-stone-700 text-sm whitespace-pre-line">{plan.planting.germinationTemp}</span>
                    </div>
                    <p className="text-xs text-stone-500 whitespace-pre-line">{plan.planting.germinationDays} days</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-wide">Harvest</span>
                    <p className="font-semibold text-stone-700 text-sm leading-snug whitespace-pre-line">{plan.planting.harvestRange}</p>
                  </div>
               </div>

               {plan.planting.indoorStart && (
                 <div className="flex gap-3 text-sm bg-blue-50/80 text-blue-800 p-3 rounded-xl border border-blue-100">
                   <Info className="w-5 h-5 shrink-0 text-blue-600" />
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
          >
             <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <span className="text-stone-600 text-sm font-medium">Requirement</span>
                  <span className="font-bold text-amber-700 whitespace-pre-line">{plan.sun.required}</span>
                </div>
                
                <div className={`p-4 rounded-2xl border ${plan.sun.orientationSuitability.toLowerCase().includes('ideal') || plan.sun.orientationSuitability.toLowerCase().includes('good') ? 'bg-green-50 border-green-200 text-green-800' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
                  <p className="font-medium leading-relaxed whitespace-pre-line text-sm">{plan.sun.orientationSuitability}</p>
                </div>

                {plan.sun.fixes.length > 0 && (
                  <div className="bg-stone-50 rounded-xl p-3">
                    <p className="text-xs font-bold text-stone-400 uppercase mb-2">Optimizations</p>
                    <ul className="space-y-2">
                      {plan.sun.fixes.map((fix, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
                           <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
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
          >
             <div className="space-y-4">
               <p className="text-sm text-stone-600 leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-100 whitespace-pre-line">
                 {plan.soil.prepInstructions}
               </p>
               
               <div>
                 <h4 className="text-xs font-bold text-stone-400 uppercase mb-2">Recommended Amendments</h4>
                 <div className="flex flex-wrap gap-2">
                   {plan.soil.amendments.map((item, i) => (
                     <span key={i} className="bg-orange-50 text-orange-800 px-3 py-1 rounded-full text-xs font-medium border border-orange-100">{item}</span>
                   ))}
                 </div>
               </div>

               <div>
                 <h4 className="text-xs font-bold text-stone-400 uppercase mb-2">Feeding Schedule</h4>
                 <ul className="space-y-3">
                   {plan.soil.fertilizerTimeline.map((item, i) => (
                     <li key={i} className="text-sm flex flex-col gap-1">
                       <span className="font-bold text-orange-700 text-xs py-1 px-2 bg-orange-100 rounded-lg break-words whitespace-normal w-fit max-w-full text-left">{item.stage}</span>
                       <span className="text-stone-600 leading-snug whitespace-pre-line pl-1">{item.action}</span>
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
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-5">
                <div className="flex flex-col items-center justify-center p-4 bg-sky-50 rounded-2xl border border-sky-100">
                  <span className="text-sky-600/70 text-xs font-bold uppercase tracking-wider mb-1">Daily Water Need</span>
                  <span className="text-xl md:text-2xl font-extrabold text-sky-700 whitespace-pre-line text-center">{plan.water.dailyRequirement}</span>
                </div>
                
                <div className="h-32 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={plan.water.monthlyWaterNeeds}>
                      <XAxis dataKey="month" tick={{fontSize: 10, fill: '#78716c'}} axisLine={false} tickLine={false} />
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
                   <div key={i} className="flex gap-3 items-start text-sm text-stone-600 bg-stone-50 p-2.5 rounded-lg">
                     <CheckCircle className="w-4 h-4 text-sky-500 mt-0.5 shrink-0" />
                     <span className="whitespace-pre-line">{item}</span>
                   </div>
                 ))}
                 
                 {plan.water.manualWateringNeeded && (
                  <div className="flex items-center gap-2 text-amber-600 text-xs font-bold bg-amber-50 px-3 py-2 rounded-lg border border-amber-100">
                    <AlertTriangle className="w-4 h-4" />
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
          >
             <div className="grid grid-cols-2 gap-3 text-center mb-4">
                <div className="bg-stone-50 p-3 rounded-2xl border border-stone-100">
                   <div className="text-[10px] text-stone-400 font-bold uppercase mb-1">Seed Depth</div>
                   <div className="font-bold text-stone-800 text-sm whitespace-pre-line">{plan.spacing.seedDepth}</div>
                </div>
                <div className="bg-stone-50 p-3 rounded-2xl border border-stone-100">
                   <div className="text-[10px] text-stone-400 font-bold uppercase mb-1">Thin To</div>
                   <div className="font-bold text-stone-800 text-sm whitespace-pre-line">{plan.spacing.thinning}</div>
                </div>
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100 col-span-2 text-left space-y-2">
                   <div className="text-[10px] text-stone-400 font-bold uppercase">Distance</div>
                   <div className="space-y-1 text-stone-700 leading-relaxed">
                     <p className="font-semibold text-sm">Between plants</p>
                     <p className="text-sm whitespace-pre-line">{plan.spacing.plantSpacing}</p>
                     <p className="font-semibold text-sm pt-2">Between rows</p>
                     <p className="text-sm whitespace-pre-line">{plan.spacing.rowSpacing}</p>
                   </div>
                </div>
             </div>

             <SpacingVisualizer
               between={extractSpacingValue(plan.spacing.plantSpacing, units === UnitSystem.METRIC ? 'metric' : 'imperial')}
               row={extractSpacingValue(plan.spacing.rowSpacing, units === UnitSystem.METRIC ? 'metric' : 'imperial')}
               depth={plan.spacing.seedDepth}
             />
          </Card>

          {/* Companions */}
          <Card 
            title="Companion Planting" 
            icon={<Users className="w-6 h-6"/>} 
            className="md:col-span-2"
            colorClass="bg-purple-50 text-purple-600"
          >
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                <div className="space-y-3">
                   <div className="flex items-center gap-2 mb-1 text-emerald-700">
                     <CheckCircle className="w-4 h-4" />
                     <h4 className="font-bold text-sm uppercase tracking-wide">Beneficial Matches</h4>
                   </div>
                   <div className="flex flex-wrap gap-2">
                     {plan.companions.good.map((c, i) => (
                       <span key={i} className="bg-emerald-50 px-3 py-1.5 rounded-lg text-sm font-medium text-emerald-800 border border-emerald-100">{c}</span>
                     ))}
                   </div>
                   <div className="bg-purple-50 p-3 rounded-xl border border-purple-100 mt-4">
                      <p className="text-xs text-purple-800 font-medium leading-relaxed whitespace-pre-line">
                        <span className="font-bold block mb-1">Synergy Effects:</span>
                        {plan.companions.benefits}
                      </p>
                   </div>
                </div>
                
                <div className="space-y-3">
                   <div className="flex items-center gap-2 mb-1 text-rose-700">
                     <AlertTriangle className="w-4 h-4" />
                     <h4 className="font-bold text-sm uppercase tracking-wide">Incompatible</h4>
                   </div>
                   <div className="flex flex-wrap gap-2">
                     {plan.companions.bad.map((c, i) => (
                       <span key={i} className="bg-rose-50 px-3 py-1.5 rounded-lg text-sm font-medium text-rose-800 border border-rose-100">{c}</span>
                     ))}
                   </div>
                   <p className="text-xs text-stone-400 mt-2">
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
          >
             <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-wide block mb-2">Common Threats</span>
                  <div className="flex flex-col gap-2">
                    {plan.pests.likelyPests.map((p, i) => (
                      <PestCard key={i} name={p} />
                    ))}
                  </div>
                </div>
                
                <div className="bg-stone-50 p-3 rounded-xl">
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-wide">Early Signs</span>
                  <ul className="list-disc pl-4 text-sm text-stone-600 mt-1 space-y-1">
                    {plan.pests.signs.map((s, i) => <li key={i} className="whitespace-pre-line">{s}</li>)}
                  </ul>
                </div>

                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide block mb-1">Organic Prevention</span>
                  <p className="text-sm text-emerald-900 leading-snug whitespace-pre-line">{plan.pests.prevention}</p>
                </div>
             </div>
          </Card>

          {/* Yield Tips */}
          <Card 
            title="Expert Tips for Yield" 
            icon={<Leaf className="w-6 h-6"/>} 
            className="md:col-span-2 lg:col-span-3"
            colorClass="bg-teal-50 text-teal-600"
          >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 bg-teal-50/50 rounded-2xl border border-teal-100/50 hover:bg-teal-50 transition-colors">
                  <h4 className="font-bold text-teal-900 mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-teal-500" />
                    Hardening Off
                  </h4>
                  <p className="text-sm text-teal-800/80 leading-relaxed whitespace-pre-line">{plan.yield.hardening}</p>
                </div>
                <div className="p-5 bg-teal-50/50 rounded-2xl border border-teal-100/50 hover:bg-teal-50 transition-colors">
                  <h4 className="font-bold text-teal-900 mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-teal-500" />
                    Pruning & Care
                  </h4>
                  <p className="text-sm text-teal-800/80 leading-relaxed whitespace-pre-line">{plan.yield.pruning}</p>
                </div>
                <div className="p-5 bg-teal-50/50 rounded-2xl border border-teal-100/50 hover:bg-teal-50 transition-colors">
                  <h4 className="font-bold text-teal-900 mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-teal-500" />
                    Common Mistakes
                  </h4>
                  <p className="text-sm text-teal-800/80 leading-relaxed whitespace-pre-line">{plan.yield.commonMistakes}</p>
                </div>
              </div>
          </Card>

        </div>

        {/* Motivational Footer */}
        <div className="bg-gradient-to-r from-emerald-100/50 to-lime-100/50 rounded-3xl p-8 text-center border border-emerald-100">
           <p className="text-xl md:text-2xl font-serif italic text-emerald-800">
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