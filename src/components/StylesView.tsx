import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  RotateCw,
  Layers,
  Target,
  Shuffle,
  Compass,
  Palette,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import { ShirtPattern } from '../types';

interface StylesViewProps {
  onSelectPatternForReflection?: (pattern: ShirtPattern) => void;
  onGoToReflection: () => void;
}

export const StylesView: React.FC<StylesViewProps> = ({
  onSelectPatternForReflection,
  onGoToReflection,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | ShirtPattern>('all');

  const handleApplyStyle = (pattern: ShirtPattern) => {
    if (onSelectPatternForReflection) {
      onSelectPatternForReflection(pattern);
    }
    onGoToReflection();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Hero Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black mb-1.5">
              <Sparkles className="w-4 h-4 text-black" />
              <span>STEAM Art & Math Guide</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              Mastering Tie-Dye STEAM Patterns
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Explore the folding mechanics, dye strategies, mathematical principles, and artistic theories behind the four foundational tie-dye styles.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onGoToReflection}
              className="px-5 py-3 bg-black hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Back to Reflection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Style Filter Tabs */}
        <div className="flex items-center gap-2 pt-6 mt-6 border-t border-slate-100 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All 4 Patterns
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('spiral')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeFilter === 'spiral'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/60'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>1. The Spiral</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('accordion')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeFilter === 'accordion'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>2. The Accordion</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('bullseye')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeFilter === 'bullseye'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/60'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>3. The Bullseye</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('freeform')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeFilter === 'freeform'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/60'
            }`}
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>4. The Freeform</span>
          </button>
        </div>
      </div>

      {/* Grid of Styles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ============================================================== */}
        {/* 1. THE SPIRAL */}
        {/* ============================================================== */}
        {(activeFilter === 'all' || activeFilter === 'spiral') && (
          <div className="bg-white rounded-3xl border-2 border-rose-200/90 shadow-sm overflow-hidden flex flex-col">
            {/* Header Banner */}
            <div className="bg-rose-500 text-white px-6 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-black tracking-wide uppercase">
                  1. THE SPIRAL
                </span>
              </div>
              <span className="text-[11px] font-bold bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Rotational Symmetry
              </span>
            </div>

            <div className="p-5 sm:p-7 space-y-6 flex-1 flex flex-col justify-between">
              {/* Top Half: The Action & The Dye Strategy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-6 border-b border-rose-100">
                {/* The Action */}
                <div className="space-y-3">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span>THE ACTION</span>
                  </div>

                  {/* Visual Diagram: Hand pinch -> twist spiral -> bound pie */}
                  <div className="bg-rose-50/50 rounded-2xl p-4 border border-rose-100/80 flex flex-col items-center justify-center space-y-3">
                    <div className="flex items-center justify-center gap-3">
                      {/* Shirt Pinch */}
                      <svg viewBox="0 0 60 60" className="w-12 h-12 text-slate-700">
                        {/* Shirt outline */}
                        <path d="M15,10 L22,18 L38,18 L45,10 L55,20 L48,27 L48,52 L12,52 L12,27 L5,20 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
                        {/* Hand pinch fingers */}
                        <path d="M30,22 C32,26 31,34 30,36" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="30" cy="36" r="3" fill="#e11d48" />
                      </svg>

                      <ArrowRight className="w-4 h-4 text-rose-400 shrink-0" />

                      {/* Swirling circle */}
                      <svg viewBox="0 0 60 60" className="w-12 h-12">
                        <circle cx="30" cy="30" r="24" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                        <path d="M30,30 C35,22 42,28 40,36 C38,44 26,46 20,38 C14,30 20,18 32,16 C44,14 50,26 48,38" fill="none" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" />
                        {/* Rotation arrows */}
                        <path d="M48,22 L52,26 L46,28" fill="none" stroke="#e11d48" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>

                      <ArrowRight className="w-4 h-4 text-rose-400 shrink-0" />

                      {/* Bound Pie with rubber bands */}
                      <svg viewBox="0 0 60 60" className="w-14 h-14">
                        <circle cx="30" cy="30" r="25" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
                        {/* Fabric petals */}
                        <circle cx="30" cy="30" r="23" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 2" />
                        {/* 3 Rubber bands crossing like 6 pie wedges */}
                        <line x1="30" y1="6" x2="30" y2="54" stroke="#eab308" strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="9" y1="18" x2="51" y2="42" stroke="#eab308" strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="9" y1="42" x2="51" y2="18" stroke="#eab308" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="30" cy="30" r="3" fill="#ca8a04" />
                      </svg>
                    </div>

                    <p className="text-[11px] text-slate-600 text-center leading-tight">
                      Pinch shirt center, twist tightly into a flat round disc, and bind with 3 rubber bands crossing like pie wedges.
                    </p>
                  </div>
                </div>

                {/* The Dye Strategy */}
                <div className="space-y-3">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span>THE DYE STRATEGY</span>
                  </div>

                  {/* Dye Strategy Graphic */}
                  <div className="bg-rose-50/50 rounded-2xl p-4 border border-rose-100/80 flex flex-col items-center justify-center space-y-3">
                    <div className="flex items-center justify-center gap-4">
                      {/* 3-color pie */}
                      <svg viewBox="0 0 60 60" className="w-14 h-14 drop-shadow-xs">
                        {/* Wedge 1: Red */}
                        <path d="M30,30 L30,4 A26,26 0 0,1 52.5,43 Z" fill="#ef4444" />
                        {/* Wedge 2: Yellow */}
                        <path d="M30,30 L52.5,43 A26,26 0 0,1 7.5,43 Z" fill="#eab308" />
                        {/* Wedge 3: Blue */}
                        <path d="M30,30 L7.5,43 A26,26 0 0,1 30,4 Z" fill="#3b82f6" />
                        <circle cx="30" cy="30" r="26" fill="none" stroke="#ffffff" strokeWidth="2" />
                      </svg>

                      <ArrowRight className="w-4 h-4 text-rose-400 shrink-0" />

                      {/* Spiral Shirt Result */}
                      <svg viewBox="0 0 60 60" className="w-14 h-14 drop-shadow-xs">
                        <defs>
                          <radialGradient id="spiralGrad" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#ef4444" />
                            <stop offset="40%" stopColor="#eab308" />
                            <stop offset="70%" stopColor="#22c55e" />
                            <stop offset="100%" stopColor="#3b82f6" />
                          </radialGradient>
                        </defs>
                        <path d="M15,10 L22,18 L38,18 L45,10 L55,20 L48,27 L48,52 L12,52 L12,27 L5,20 Z" fill="url(#spiralGrad)" stroke="#cbd5e1" strokeWidth="1" />
                        <path d="M30,34 C35,28 40,32 38,38 C36,44 26,44 22,38 C18,32 24,24 34,22" fill="none" stroke="#ffffff" strokeWidth="2.5" opacity="0.75" />
                      </svg>
                    </div>

                    <p className="text-[11px] text-slate-600 text-center leading-tight">
                      Apply primary colors in opposite pie wedges. Dye penetrates through layers to radiate from the center.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Half: The Math & The Art */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* The Math */}
                <div className="bg-slate-50/90 rounded-2xl p-4 border border-slate-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-rose-700">
                    <Compass className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-bold leading-tight">
                      THE MATH: Line Symmetry & Rotational Geometry
                    </span>
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    {/* Rotational diagram */}
                    <svg viewBox="0 0 50 50" className="w-12 h-12 shrink-0 text-slate-400">
                      <circle cx="25" cy="25" r="22" fill="none" stroke="#94a3b8" strokeWidth="1" />
                      <line x1="25" y1="3" x2="25" y2="47" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1="3" y1="25" x2="47" y2="25" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 2" />
                      <path d="M25,25 C28,18 36,20 34,28 C32,36 20,36 18,28" fill="none" stroke="#e11d48" strokeWidth="1.5" />
                    </svg>
                    <p className="text-xs text-slate-700 leading-snug">
                      Pattern repeats around a central vertex point. Rotational angles create continuous radial symmetry.
                    </p>
                  </div>
                </div>

                {/* The Art */}
                <div className="bg-slate-50/90 rounded-2xl p-4 border border-slate-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-rose-700">
                    <Palette className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-bold leading-tight">
                      THE ART: Color Wheel Dynamics
                    </span>
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    {/* Color wheel graphic */}
                    <div className="w-12 h-12 rounded-full shrink-0 border border-slate-200 shadow-2xs overflow-hidden"
                         style={{
                           background: 'conic-gradient(red, orange, yellow, green, cyan, blue, magenta, red)'
                         }}
                    />
                    <p className="text-xs text-slate-700 leading-snug">
                      Primary colors blend at borders to organically create secondary shades (Green, Orange, Purple).
                    </p>
                  </div>
                </div>
              </div>

              {/* Action: Use in Reflection */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleApplyStyle('spiral')}
                  className="w-full py-2.5 px-4 bg-rose-50 hover:bg-rose-100 text-rose-700 hover:text-rose-800 font-bold text-xs rounded-xl border border-rose-200/80 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-rose-500" />
                  <span>Choose The Spiral for Reflection</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 2. THE ACCORDION */}
        {/* ============================================================== */}
        {(activeFilter === 'all' || activeFilter === 'accordion') && (
          <div className="bg-white rounded-3xl border-2 border-sky-200/90 shadow-sm overflow-hidden flex flex-col">
            {/* Header Banner */}
            <div className="bg-sky-600 text-white px-6 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-black tracking-wide uppercase">
                  2. THE ACCORDION
                </span>
              </div>
              <span className="text-[11px] font-bold bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Linear Transformations
              </span>
            </div>

            <div className="p-5 sm:p-7 space-y-6 flex-1 flex flex-col justify-between">
              {/* Top Half: The Action & The Dye Strategy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-6 border-b border-sky-100">
                {/* The Action */}
                <div className="space-y-3">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-sky-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-sky-600" />
                    <span>THE ACTION</span>
                  </div>

                  {/* Visual Diagram: Fan pleats -> bound linear strip */}
                  <div className="bg-sky-50/50 rounded-2xl p-4 border border-sky-100/80 flex flex-col items-center justify-center space-y-3">
                    <div className="flex items-center justify-center gap-4">
                      {/* Fan fold pleats */}
                      <svg viewBox="0 0 60 60" className="w-14 h-14">
                        <path d="M10,48 L15,14 L20,48 L25,14 L30,48 L35,14 L40,48 L45,14 L50,48" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinejoin="round" />
                        <path d="M12,18 C25,8 35,8 48,18" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" />
                      </svg>

                      <ArrowRight className="w-4 h-4 text-sky-400 shrink-0" />

                      {/* Bound segmented strip */}
                      <svg viewBox="0 0 60 60" className="w-16 h-14">
                        {/* Strip */}
                        <rect x="5" y="22" width="50" height="16" rx="3" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
                        {/* Rubber bands along the strip */}
                        <line x1="16" y1="20" x2="16" y2="40" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
                        <line x1="28" y1="20" x2="28" y2="40" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
                        <line x1="40" y1="20" x2="40" y2="40" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                    </div>

                    <p className="text-[11px] text-slate-600 text-center leading-tight">
                      Fabric folded back and forth into 2-inch pleats like a fan, then bound with rubber bands placed at intervals.
                    </p>
                  </div>
                </div>

                {/* The Dye Strategy */}
                <div className="space-y-3">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-sky-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-sky-600" />
                    <span>THE DYE STRATEGY</span>
                  </div>

                  {/* Dye Strategy Graphic */}
                  <div className="bg-sky-50/50 rounded-2xl p-4 border border-sky-100/80 flex flex-col items-center justify-center space-y-3">
                    <div className="flex items-center justify-center gap-4">
                      {/* Striped dye block */}
                      <div className="flex h-10 w-16 rounded-lg overflow-hidden border border-slate-300 shadow-2xs">
                        <div className="flex-1 bg-emerald-500" />
                        <div className="flex-1 bg-fuchsia-500" />
                        <div className="flex-1 bg-cyan-400" />
                        <div className="flex-1 bg-amber-400" />
                      </div>

                      <ArrowRight className="w-4 h-4 text-sky-400 shrink-0" />

                      {/* Striped Accordion Shirt Result */}
                      <svg viewBox="0 0 60 60" className="w-14 h-14 drop-shadow-xs">
                        <defs>
                          <linearGradient id="accordionGrad" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="25%" stopColor="#ec4899" />
                            <stop offset="50%" stopColor="#06b6d4" />
                            <stop offset="75%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#10b981" />
                          </linearGradient>
                        </defs>
                        <path d="M15,10 L22,18 L38,18 L45,10 L55,20 L48,27 L48,52 L12,52 L12,27 L5,20 Z" fill="url(#accordionGrad)" stroke="#cbd5e1" strokeWidth="1" />
                        {/* Vertical fold lines */}
                        <line x1="22" y1="18" x2="22" y2="52" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
                        <line x1="30" y1="18" x2="30" y2="52" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
                        <line x1="38" y1="18" x2="38" y2="52" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
                      </svg>
                    </div>

                    <p className="text-[11px] text-slate-600 text-center leading-tight">
                      Apply alternating dye colors to each segmented band. Dye saturates through all pleat layers uniformly.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Half: The Math & The Art */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* The Math */}
                <div className="bg-slate-50/90 rounded-2xl p-4 border border-slate-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-sky-700">
                    <Compass className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-bold leading-tight">
                      THE MATH: Parallel Lines & Geometric Transformations
                    </span>
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    {/* Parallel lines diagram */}
                    <svg viewBox="0 0 50 50" className="w-12 h-12 shrink-0 text-slate-400">
                      <line x1="8" y1="10" x2="42" y2="10" stroke="#0284c7" strokeWidth="2.5" />
                      <line x1="8" y1="20" x2="42" y2="20" stroke="#0284c7" strokeWidth="2.5" />
                      <line x1="8" y1="30" x2="42" y2="30" stroke="#0284c7" strokeWidth="2.5" />
                      <line x1="8" y1="40" x2="42" y2="40" stroke="#0284c7" strokeWidth="2.5" />
                    </svg>
                    <p className="text-xs text-slate-700 leading-snug">
                      Folding creates repeated, parallel line segments across a 2-dimensional plane.
                    </p>
                  </div>
                </div>

                {/* The Art */}
                <div className="bg-slate-50/90 rounded-2xl p-4 border border-slate-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-sky-700">
                    <Palette className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-bold leading-tight">
                      THE ART: Visual Balance & Rhythm
                    </span>
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    {/* Rhythm Matrix */}
                    <div className="w-12 h-12 shrink-0 grid grid-cols-3 grid-rows-3 gap-0.5 rounded-lg overflow-hidden border border-slate-200">
                      <div className="bg-indigo-500" /><div className="bg-emerald-400" /><div className="bg-indigo-500" />
                      <div className="bg-emerald-400" /><div className="bg-indigo-500" /><div className="bg-emerald-400" />
                      <div className="bg-indigo-500" /><div className="bg-emerald-400" /><div className="bg-indigo-500" />
                    </div>
                    <p className="text-xs text-slate-700 leading-snug">
                      Creates alternating columns of color that experiment with horizontal and vertical balance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action: Use in Reflection */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleApplyStyle('accordion')}
                  className="w-full py-2.5 px-4 bg-sky-50 hover:bg-sky-100 text-sky-700 hover:text-sky-800 font-bold text-xs rounded-xl border border-sky-200/80 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-sky-500" />
                  <span>Choose The Accordion for Reflection</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 3. THE BULLSEYE */}
        {/* ============================================================== */}
        {(activeFilter === 'all' || activeFilter === 'bullseye') && (
          <div className="bg-white rounded-3xl border-2 border-amber-200/90 shadow-sm overflow-hidden flex flex-col">
            {/* Header Banner */}
            <div className="bg-amber-500 text-white px-6 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-black tracking-wide uppercase">
                  3. THE BULLSEYE
                </span>
              </div>
              <span className="text-[11px] font-bold bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Concentric Rings
              </span>
            </div>

            <div className="p-5 sm:p-7 space-y-6 flex-1 flex flex-col justify-between">
              {/* Top Half: The Action & The Dye Strategy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-6 border-b border-amber-100">
                {/* The Action */}
                <div className="space-y-3">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>THE ACTION</span>
                  </div>

                  {/* Visual Diagram: Lift cone -> banded rubber band rings */}
                  <div className="bg-amber-50/50 rounded-2xl p-4 border border-amber-100/80 flex flex-col items-center justify-center space-y-3">
                    <div className="flex items-center justify-center gap-4">
                      {/* Lifting into a cone */}
                      <svg viewBox="0 0 60 60" className="w-12 h-14">
                        {/* Hand pulling tip */}
                        <path d="M30,8 L30,2" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
                        <path d="M26,12 L30,6 L34,12" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        {/* Tent/Cone fabric shape */}
                        <path d="M30,10 L10,50 C20,53 40,53 50,50 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
                      </svg>

                      <ArrowRight className="w-4 h-4 text-amber-400 shrink-0" />

                      {/* Cone with banded rubber bands */}
                      <svg viewBox="0 0 60 60" className="w-12 h-14">
                        <path d="M30,8 L12,52 C20,55 40,55 48,52 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
                        {/* Rubber bands down the cone */}
                        <ellipse cx="30" cy="20" rx="6" ry="2" fill="none" stroke="#ea580c" strokeWidth="2" />
                        <ellipse cx="30" cy="30" rx="10" ry="2.5" fill="none" stroke="#2563eb" strokeWidth="2" />
                        <ellipse cx="30" cy="42" rx="14" ry="3" fill="none" stroke="#16a34a" strokeWidth="2" />
                      </svg>
                    </div>

                    <p className="text-[11px] text-slate-600 text-center leading-tight">
                      Pinch shirt center, pull upward into a cone, and place rubber bands at measured distances down the cone.
                    </p>
                  </div>
                </div>

                {/* The Dye Strategy */}
                <div className="space-y-3">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>THE DYE STRATEGY</span>
                  </div>

                  {/* Dye Strategy Graphic */}
                  <div className="bg-amber-50/50 rounded-2xl p-4 border border-amber-100/80 flex flex-col items-center justify-center space-y-3">
                    <div className="flex items-center justify-center gap-4">
                      {/* Colored Cone */}
                      <svg viewBox="0 0 60 60" className="w-12 h-14">
                        <polygon points="30,8 24,20 36,20" fill="#dc2626" />
                        <polygon points="24,20 18,32 42,32 36,20" fill="#f59e0b" />
                        <polygon points="18,32 14,42 46,42 42,32" fill="#10b981" />
                        <polygon points="14,42 10,52 50,52 46,42" fill="#2563eb" />
                      </svg>

                      <ArrowRight className="w-4 h-4 text-amber-400 shrink-0" />

                      {/* Bullseye Shirt Result */}
                      <svg viewBox="0 0 60 60" className="w-14 h-14 drop-shadow-xs">
                        <path d="M15,10 L22,18 L38,18 L45,10 L55,20 L48,27 L48,52 L12,52 L12,27 L5,20 Z" fill="#2563eb" stroke="#cbd5e1" strokeWidth="1" />
                        <circle cx="30" cy="35" r="14" fill="#10b981" />
                        <circle cx="30" cy="35" r="9" fill="#f59e0b" />
                        <circle cx="30" cy="35" r="4" fill="#dc2626" />
                      </svg>
                    </div>

                    <p className="text-[11px] text-slate-600 text-center leading-tight">
                      Dye each ring section with a different high-contrast color from the tip down to create target rings.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Half: The Math & The Art */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* The Math */}
                <div className="bg-slate-50/90 rounded-2xl p-4 border border-slate-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-amber-800">
                    <Compass className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-bold leading-tight">
                      THE MATH: Concentric Circles & Spatial Measurement
                    </span>
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    {/* Concentric circles diagram */}
                    <svg viewBox="0 0 50 50" className="w-12 h-12 shrink-0 text-slate-400">
                      <circle cx="25" cy="25" r="22" fill="none" stroke="#d97706" strokeWidth="1.5" />
                      <circle cx="25" cy="25" r="15" fill="none" stroke="#d97706" strokeWidth="1.5" />
                      <circle cx="25" cy="25" r="8" fill="none" stroke="#d97706" strokeWidth="1.5" />
                      <circle cx="25" cy="25" r="2" fill="#d97706" />
                      {/* Radius vector line */}
                      <line x1="25" y1="25" x2="47" y2="25" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 1" />
                    </svg>
                    <p className="text-xs text-slate-700 leading-snug">
                      Explores nested geometric figures that share the exact same center point but have different radii.
                    </p>
                  </div>
                </div>

                {/* The Art */}
                <div className="bg-slate-50/90 rounded-2xl p-4 border border-slate-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-amber-800">
                    <Eye className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-bold leading-tight">
                      THE ART: Contrast & Focal Points
                    </span>
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    {/* High contrast target graphic */}
                    <svg viewBox="0 0 50 50" className="w-12 h-12 shrink-0">
                      <circle cx="25" cy="25" r="22" fill="#0f172a" />
                      <circle cx="25" cy="25" r="16" fill="#ffffff" />
                      <circle cx="25" cy="25" r="11" fill="#0f172a" />
                      <circle cx="25" cy="25" r="6" fill="#ffffff" />
                      <circle cx="25" cy="25" r="2.5" fill="#ef4444" />
                    </svg>
                    <p className="text-xs text-slate-700 leading-snug">
                      High-contrast colors placed side-by-side draw the viewer's eye directly to the center of the garment.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action: Use in Reflection */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleApplyStyle('bullseye')}
                  className="w-full py-2.5 px-4 bg-amber-50 hover:bg-amber-100 text-amber-800 hover:text-amber-900 font-bold text-xs rounded-xl border border-amber-200/80 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span>Choose The Bullseye for Reflection</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 4. THE FREEFORM */}
        {/* ============================================================== */}
        {(activeFilter === 'all' || activeFilter === 'freeform') && (
          <div className="bg-white rounded-3xl border-2 border-emerald-200/90 shadow-sm overflow-hidden flex flex-col">
            {/* Header Banner */}
            <div className="bg-emerald-600 text-white px-6 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-black tracking-wide uppercase">
                  4. THE FREEFORM
                </span>
              </div>
              <span className="text-[11px] font-bold bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Organic Fractals
              </span>
            </div>

            <div className="p-5 sm:p-7 space-y-6 flex-1 flex flex-col justify-between">
              {/* Top Half: The Action & The Dye Strategy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-6 border-b border-emerald-100">
                {/* The Action */}
                <div className="space-y-3">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    <span>THE ACTION</span>
                  </div>

                  {/* Visual Diagram: Hands crumpling -> organic scrunched ball */}
                  <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100/80 flex flex-col items-center justify-center space-y-3">
                    <div className="flex items-center justify-center gap-4">
                      {/* Hands crumpling */}
                      <svg viewBox="0 0 60 60" className="w-14 h-14">
                        <circle cx="30" cy="30" r="18" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                        {/* Hands scrunch arrows */}
                        <path d="M12,24 C16,28 22,28 26,30" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
                        <path d="M48,24 C44,28 38,28 34,30" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
                        <path d="M30,46 L30,36" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
                      </svg>

                      <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0" />

                      {/* Scrunched ball with criss-cross rubber bands */}
                      <svg viewBox="0 0 60 60" className="w-14 h-14">
                        {/* Organic crumpled cloud */}
                        <path d="M22,14 C28,10 36,12 40,16 C46,18 48,26 46,32 C48,38 42,46 36,46 C30,48 24,46 18,42 C12,38 12,30 14,24 C14,18 18,14 22,14 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
                        {/* Criss-crossing rubber bands */}
                        <path d="M16,18 L44,42" stroke="#e11d48" strokeWidth="2" />
                        <path d="M42,16 L18,44" stroke="#eab308" strokeWidth="2" />
                        <path d="M30,12 L30,46" stroke="#2563eb" strokeWidth="2" />
                        <path d="M14,30 L46,30" stroke="#10b981" strokeWidth="2" />
                      </svg>
                    </div>

                    <p className="text-[11px] text-slate-600 text-center leading-tight">
                      Crumple the fabric randomly with both hands into a ball, then secure with rubber bands wrapped in all directions.
                    </p>
                  </div>
                </div>

                {/* The Dye Strategy */}
                <div className="space-y-3">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    <span>THE DYE STRATEGY</span>
                  </div>

                  {/* Dye Strategy Graphic */}
                  <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100/80 flex flex-col items-center justify-center space-y-3">
                    <div className="flex items-center justify-center gap-4">
                      {/* Multi-colored bundle */}
                      <svg viewBox="0 0 60 60" className="w-14 h-14">
                        <circle cx="24" cy="24" r="10" fill="#ec4899" />
                        <circle cx="36" cy="22" r="11" fill="#06b6d4" />
                        <circle cx="28" cy="36" r="12" fill="#eab308" />
                        <circle cx="38" cy="36" r="9" fill="#10b981" />
                        <path d="M18,18 L42,42 M42,18 L18,42" stroke="#ffffff" strokeWidth="2" />
                      </svg>

                      <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0" />

                      {/* Freeform Marble Shirt Result */}
                      <svg viewBox="0 0 60 60" className="w-14 h-14 drop-shadow-xs">
                        <defs>
                          <radialGradient id="freeformGrad" cx="40%" cy="40%" r="60%">
                            <stop offset="0%" stopColor="#ec4899" />
                            <stop offset="30%" stopColor="#8b5cf6" />
                            <stop offset="60%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#10b981" />
                          </radialGradient>
                        </defs>
                        <path d="M15,10 L22,18 L38,18 L45,10 L55,20 L48,27 L48,52 L12,52 L12,27 L5,20 Z" fill="url(#freeformGrad)" stroke="#cbd5e1" strokeWidth="1" />
                        <circle cx="28" cy="28" r="5" fill="#facc15" opacity="0.8" />
                        <circle cx="36" cy="38" r="6" fill="#f43f5e" opacity="0.7" />
                      </svg>
                    </div>

                    <p className="text-[11px] text-slate-600 text-center leading-tight">
                      Squirt different colors randomly into various folds and crevices. Dye diffuses into natural marble veining.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Half: The Math & The Art */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* The Math */}
                <div className="bg-slate-50/90 rounded-2xl p-4 border border-slate-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800">
                    <Compass className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-bold leading-tight">
                      THE MATH: Fractal Geometry & Chaos Theory
                    </span>
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    {/* Fractal noise diagram */}
                    <div className="w-12 h-12 shrink-0 rounded-lg overflow-hidden border border-slate-200 bg-emerald-950 p-1 flex flex-wrap gap-1">
                      <div className="w-2 h-2 bg-emerald-400 rounded-xs" /><div className="w-3 h-1 bg-emerald-200" /><div className="w-2 h-3 bg-emerald-500" />
                      <div className="w-3 h-3 bg-emerald-300" /><div className="w-1 h-2 bg-emerald-100" /><div className="w-2 h-2 bg-emerald-400" />
                    </div>
                    <p className="text-xs text-slate-700 leading-snug">
                      While it looks random, the patterns mimic structural forms found in nature (like clouds or marble stone).
                    </p>
                  </div>
                </div>

                {/* The Art */}
                <div className="bg-slate-50/90 rounded-2xl p-4 border border-slate-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800">
                    <Palette className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-bold leading-tight">
                      THE ART: Texture & Organic Shapes
                    </span>
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    {/* Organic texture swatch */}
                    <div className="w-12 h-12 shrink-0 rounded-lg overflow-hidden border border-slate-200"
                         style={{
                           background: 'radial-gradient(circle at 30% 30%, #f472b6, #38bdf8 50%, #4ade80 80%)'
                         }}
                    />
                    <p className="text-xs text-slate-700 leading-snug">
                      Moves away from rigid geometric structure to explore abstract expressionism and visual texture.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action: Use in Reflection */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleApplyStyle('freeform')}
                  className="w-full py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 hover:text-emerald-800 font-bold text-xs rounded-xl border border-emerald-200/80 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Choose The Freeform for Reflection</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="bg-black rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight">
            Ready to Analyze Your Design Choices?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Head to the Reflection form to document your folding patterns, mathematical predictions, and color chemistry.
          </p>
        </div>
        <button
          type="button"
          onClick={onGoToReflection}
          className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-100 text-black font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95 shrink-0"
        >
          <span>Go to Reflection</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
