import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Legend,
} from 'recharts';
import type { SavedSymptomEntry } from '../services/historyService.ts';
import {
  calculateChakraDistribution,
  calculateChakraTimeline,
  calculatePolarityBreakdown,
  getDominantChakraInsight,
  DEMO_SAMPLE_ENTRIES,
  ChakraDistributionItem,
} from '../utils/chakraAnalytics.ts';
import {
  PieChart as PieIcon,
  TrendingUp,
  Sparkles,
  Info,
  Calendar,
  Layers,
  Compass,
  ArrowRight,
} from 'lucide-react';

interface ChakraAnalyticsProps {
  entries: SavedSymptomEntry[];
  onExploreChakra?: (chakraName: string) => void;
}

export const ChakraAnalytics: React.FC<ChakraAnalyticsProps> = ({
  entries,
  onExploreChakra,
}) => {
  const [useSampleData, setUseSampleData] = useState(false);
  const [activeTab, setActiveTab] = useState<'distribution' | 'timeline' | 'polarity'>('distribution');

  // If user has no entries, default to sample data so charts are immediately visible
  const activeEntries = useMemo(() => {
    if (entries.length > 0 && !useSampleData) {
      return entries;
    }
    return DEMO_SAMPLE_ENTRIES;
  }, [entries, useSampleData]);

  const distribution = useMemo(() => calculateChakraDistribution(activeEntries), [activeEntries]);
  const timelineData = useMemo(() => calculateChakraTimeline(activeEntries), [activeEntries]);
  const polarityData = useMemo(() => calculatePolarityBreakdown(activeEntries), [activeEntries]);
  const { dominantChakra, insight } = useMemo(() => getDominantChakraInsight(distribution), [distribution]);

  // Filter distribution for pie chart (only include chakras with at least 1 count for clean rendering)
  const nonZeroDistribution = useMemo(() => {
    const active = distribution.filter((d) => d.count > 0);
    return active.length > 0 ? active : distribution;
  }, [distribution]);

  // Custom Tooltip for Recharts
  const CustomDistributionTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data: ChakraDistributionItem = payload[0].payload;
      return (
        <div className="bg-slate-950/95 border border-slate-700 p-3 rounded-xl shadow-2xl text-xs space-y-1 z-50 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: data.color }} />
            <span className="font-bold text-white">{data.name}</span>
            <span className="text-[10px] text-slate-400">({data.sanskrit})</span>
          </div>
          <p className="text-slate-300">
            <strong>Entries:</strong> {data.count} ({data.percentage}%)
          </p>
          <p className="text-slate-400 text-[11px]">
            <strong>Element:</strong> {data.element}
          </p>
          <p className="text-purple-300 text-[11px] max-w-[220px] leading-tight">
            {data.theme}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomTimelineTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-950/95 border border-slate-700 p-3 rounded-xl shadow-2xl text-xs space-y-1.5 z-50 backdrop-blur-md">
          <p className="font-bold text-white pb-1 border-b border-slate-800 flex items-center gap-1.5">
            <Calendar className="w-3 h-3 text-purple-400" />
            {label}
          </p>
          <div className="space-y-1">
            {payload
              .filter((p: any) => p.value > 0)
              .map((p: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between gap-3 text-[11px]">
                  <span className="flex items-center gap-1.5 capitalize text-slate-300">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                    {p.name.replace('_', ' ')}:
                  </span>
                  <span className="font-semibold text-white">{p.value} reading(s)</span>
                </div>
              ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-2xl backdrop-blur-md space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Chakra &amp; Somatic Analytics
            </h3>
            {entries.length === 0 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-950/60 border border-amber-800/80 text-amber-300">
                Sample Preview Mode
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Visualize the distribution of bodily energy centers and lateral polarity over time.
          </p>
        </div>

        {/* View Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 self-stretch sm:self-auto justify-between sm:justify-start">
          <button
            type="button"
            onClick={() => setActiveTab('distribution')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'distribution'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <PieIcon className="w-3.5 h-3.5" />
            Distribution
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('timeline')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'timeline'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Over Time
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('polarity')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'polarity'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Yin / Yang
          </button>
        </div>
      </div>

      {/* Dominant Pattern Insight Card */}
      <div
        className="p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{
          backgroundColor: `${dominantChakra.color}12`,
          borderColor: `${dominantChakra.color}40`,
        }}
      >
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 mt-0.5 shadow-md"
            style={{ backgroundColor: dominantChakra.color }}
          >
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                Primary Somatic Focus
              </span>
              <span
                className="text-xs font-extrabold px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: `${dominantChakra.color}30`,
                  color: dominantChakra.color,
                }}
              >
                {dominantChakra.name} ({dominantChakra.sanskrit})
              </span>
            </div>
            <p className="text-xs text-slate-200 mt-1 leading-relaxed">{insight}</p>
          </div>
        </div>

        {onExploreChakra && (
          <button
            type="button"
            onClick={() => onExploreChakra(dominantChakra.name)}
            className="text-xs px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 flex items-center gap-1 shrink-0 transition-colors"
          >
            Explore {dominantChakra.name} in Dictionary
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Visualizations Section */}
      <div className="min-h-[300px]">
        {/* TAB 1: Chakra Distribution (Donut & Horizontal Bar) */}
        {activeTab === 'distribution' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Donut Chart */}
            <div className="lg:col-span-5 h-64 flex flex-col items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<CustomDistributionTooltip />} />
                  <Pie
                    data={nonZeroDistribution}
                    dataKey="count"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                  >
                    {nonZeroDistribution.map((entry) => (
                      <Cell key={entry.id} fill={entry.color} stroke="#0f172a" strokeWidth={2} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-black text-slate-100">{activeEntries.length}</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                  Readings
                </span>
              </div>
            </div>

            {/* Bar List */}
            <div className="lg:col-span-7 space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Frequency Breakdown by Energy Center:
              </span>
              <div className="space-y-2">
                {distribution.map((item) => (
                  <div key={item.id} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="font-semibold text-slate-200">{item.name}</span>
                        <span className="text-[10px] text-slate-400">({item.element})</span>
                      </div>
                      <span className="font-mono text-xs text-slate-300">
                        {item.count} {item.count === 1 ? 'reading' : 'readings'} ({item.percentage}%)
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full rounded-full transition-all duration-500 ease-out"
                        style={{
                          width: `${item.percentage}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Chakra Activity Over Time (Timeline Area Chart) */}
        {activeTab === 'timeline' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Somatic activity grouped by recording date</span>
              <span className="text-[11px] text-purple-300">Total dates tracked: {timelineData.length}</span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRoot" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorSacral" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorSolar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#eab308" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorHeart" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorThroat" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorThirdEye" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorCrown" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 11 }} allowDecimals={false} />
                  <Tooltip content={<CustomTimelineTooltip />} />
                  <Area type="monotone" dataKey="root" stackId="1" stroke="#ef4444" fill="url(#colorRoot)" />
                  <Area type="monotone" dataKey="sacral" stackId="1" stroke="#f97316" fill="url(#colorSacral)" />
                  <Area type="monotone" dataKey="solar_plexus" stackId="1" stroke="#eab308" fill="url(#colorSolar)" />
                  <Area type="monotone" dataKey="heart" stackId="1" stroke="#10b981" fill="url(#colorHeart)" />
                  <Area type="monotone" dataKey="throat" stackId="1" stroke="#06b6d4" fill="url(#colorThroat)" />
                  <Area type="monotone" dataKey="third_eye" stackId="1" stroke="#6366f1" fill="url(#colorThirdEye)" />
                  <Area type="monotone" dataKey="crown" stackId="1" stroke="#a855f7" fill="url(#colorCrown)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {distribution.map((c) => (
                <div key={c.id} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                  <span>{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Lateral Polarity (Yin vs Yang Balance) */}
        {activeTab === 'polarity' && (
          <div className="space-y-6 max-w-xl mx-auto py-3">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-purple-300">
                Lateral Body Polarity
              </span>
              <h4 className="text-base font-bold text-slate-100">
                Sacred Feminine (Left) vs. Sacred Masculine (Right) Balance
              </h4>
              <p className="text-xs text-slate-400">
                Psychosomatic symmetry: Left side manifests receptive, intuitive, and maternal lessons. Right side reflects active, career, and paternal dynamics.
              </p>
            </div>

            {/* Stacked Balance Bar */}
            <div className="space-y-2">
              <div className="h-6 w-full bg-slate-950 rounded-xl overflow-hidden flex border border-slate-800 shadow-inner">
                {polarityData.map((pol) => (
                  <div
                    key={pol.key}
                    style={{
                      width: `${pol.percentage || 33}%`,
                      backgroundColor: pol.color,
                    }}
                    className="h-full flex items-center justify-center text-[10px] font-bold text-slate-950 transition-all duration-500 overflow-hidden"
                    title={`${pol.name}: ${pol.count} (${pol.percentage}%)`}
                  >
                    {pol.percentage > 12 && `${pol.percentage}%`}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2 text-center pt-2">
                {polarityData.map((pol) => (
                  <div key={pol.key} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: pol.color }} />
                      <span className="text-xs font-semibold text-slate-200">{pol.name}</span>
                    </div>
                    <p className="text-lg font-black text-white">{pol.count}</p>
                    <p className="text-[10px] text-slate-400">{pol.percentage}% of symptoms</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Toggle Sample Data Button when user has low count */}
      {entries.length > 0 && (
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
          <span>Viewing {activeEntries.length} logged symptom entries</span>
          <button
            type="button"
            onClick={() => setUseSampleData(!useSampleData)}
            className="text-[11px] text-purple-400 hover:text-purple-300 underline"
          >
            {useSampleData ? 'Show My Real Entries' : 'Preview Multi-Week Sample History'}
          </button>
        </div>
      )}
    </div>
  );
};
