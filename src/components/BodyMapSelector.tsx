import React, { useState } from 'react';
import { BodyZoneType, SideType } from '../types/index.ts';

interface BodyMapSelectorProps {
  selectedZone: BodyZoneType | null;
  onSelectZone: (zone: BodyZoneType) => void;
  selectedSide: SideType;
  onSelectSide: (side: SideType) => void;
}

export const BodyMapSelector: React.FC<BodyMapSelectorProps> = ({
  selectedZone,
  onSelectZone,
  selectedSide,
  onSelectSide,
}) => {
  const [view, setView] = useState<'front' | 'back'>('front');

  const zones: { id: BodyZoneType; label: string; views: ('front' | 'back')[]; chakraColor: string; description: string }[] = [
    { id: 'head', label: 'Head & Brain', views: ['front', 'back'], chakraColor: '#a855f7', description: 'Third eye & crown: Overthinking, control, self-criticism' },
    { id: 'eyes_ears', label: 'Eyes & Ears', views: ['front'], chakraColor: '#6366f1', description: 'Vision & listening: Reluctance to see truth, tuning out' },
    { id: 'throat', label: 'Throat & Thyroid', views: ['front'], chakraColor: '#06b6d4', description: 'Authentic voice: Swallowing anger, speaking truth' },
    { id: 'chest', label: 'Chest, Heart & Lungs', views: ['front'], chakraColor: '#10b981', description: 'Love & grief: Heart space, breathing in life fully' },
    { id: 'solar_plexus', label: 'Solar Plexus & Stomach', views: ['front'], chakraColor: '#eab308', description: 'Digestion of life: Personal power, anxiety, control' },
    { id: 'spine', label: 'Spine & Back', views: ['back'], chakraColor: '#f97316', description: 'Support system: Upper (love), Mid (guilt), Lower (financial/survival)' },
    { id: 'pelvis', label: 'Pelvis, Womb & Hips', views: ['front', 'back'], chakraColor: '#ef4444', description: 'Sacral & root: Creative power, moving forward, boundaries' },
    { id: 'arms_hands', label: 'Shoulders, Arms & Hands', views: ['front', 'back'], chakraColor: '#10b981', description: 'Handling life & burdens: Shouldering others\' weight, gripping' },
    { id: 'legs_feet', label: 'Knees & Feet', views: ['front', 'back'], chakraColor: '#ef4444', description: 'Grounding & ego: Pride (knees), walking your true path (feet)' },
    { id: 'skin', label: 'Skin & Boundaries', views: ['front', 'back'], chakraColor: '#ec4899', description: 'Boundary layer: Separation fear, irritability, protection' },
  ];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 backdrop-blur-md shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse"></span>
            Interactive Body Anatomy
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Click any region to decode its metaphysical root cause</p>
        </div>

        {/* View Switcher: Front vs Back */}
        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setView('front')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              view === 'front'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Front View
          </button>
          <button
            type="button"
            onClick={() => setView('back')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              view === 'back'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Back View
          </button>
        </div>
      </div>

      {/* Side of Body Selector (Crucial for Metaphysical Polarity) */}
      <div className="mb-5 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-300">
            Lateral Polarity (Which Side?)
          </span>
          <span className="text-[11px] text-slate-400">
            {selectedSide === 'left' && 'Left: Feminine, receptive, mother, feeling'}
            {selectedSide === 'right' && 'Right: Masculine, career, father, action'}
            {selectedSide === 'both' && 'Center / Bilateral: Integrated core self'}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {(['left', 'both', 'right'] as SideType[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onSelectSide(s)}
              className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all text-center ${
                selectedSide === s
                  ? 'bg-purple-500/20 border-purple-500 text-purple-200 shadow-sm'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {s === 'left' && 'Left Side (Yin)'}
              {s === 'both' && 'Bilateral / Center'}
              {s === 'right' && 'Right Side (Yang)'}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Body Zones Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {zones
          .filter((z) => z.views.includes(view))
          .map((zone) => {
            const isSelected = selectedZone === zone.id;
            return (
              <button
                key={zone.id}
                type="button"
                onClick={() => onSelectZone(zone.id)}
                className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden group ${
                  isSelected
                    ? 'bg-purple-950/40 border-purple-500 ring-1 ring-purple-500/50 shadow-lg'
                    : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div
                  className="absolute top-0 left-0 w-1 h-full"
                  style={{ backgroundColor: zone.chakraColor }}
                />
                <div className="pl-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-purple-300 transition-colors">
                      {zone.label}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-purple-400 shadow-sm shadow-purple-400"></span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-tight">
                    {zone.description}
                  </p>
                </div>
              </button>
            );
          })}
      </div>
    </div>
  );
};
