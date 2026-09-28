import React from 'react';
import { Sparkles, BookOpen, ClipboardList, Palette } from 'lucide-react';
import { DacLogo } from './BrandLogos';

export type AppView = 'reflection' | 'instructions' | 'styles';

interface TopBarProps {
  currentView: AppView;
  onSelectView: (view: AppView) => void;
  onStartNew: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentView,
  onSelectView,
  onStartNew,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand title */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 font-display whitespace-nowrap">
            Tie-Dye Reflection
          </span>
        </div>

        {/* Navigation tabs flanked by logos */}
        <div className="flex items-center gap-1 sm:gap-2.5 overflow-x-auto py-1">
          {/* Left side of REFLECTION tab: DAC Logo */}
          <div className="flex items-center pr-1 sm:pr-2 shrink-0">
            <DacLogo className="h-6 sm:h-7.5 w-auto" />
          </div>

          <nav className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => onSelectView('reflection')}
              className={`px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                currentView === 'reflection'
                  ? 'bg-black text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-black hover:bg-slate-100'
              }`}
            >
              <ClipboardList className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${currentView === 'reflection' ? 'text-white' : 'text-slate-600'}`} />
              <span>Reflection</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectView('instructions')}
              className={`px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                currentView === 'instructions'
                  ? 'bg-black text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-black hover:bg-slate-100'
              }`}
            >
              <BookOpen className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${currentView === 'instructions' ? 'text-white' : 'text-slate-600'}`} />
              <span>Instructions</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectView('styles')}
              className={`px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                currentView === 'styles'
                  ? 'bg-black text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-black hover:bg-slate-100'
              }`}
            >
              <Palette className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${currentView === 'styles' ? 'text-white' : 'text-slate-600'}`} />
              <span>Styles</span>
            </button>
          </nav>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onStartNew}
            className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-semibold text-white bg-black hover:bg-slate-800 rounded-xl transition-colors cursor-pointer shadow-xs whitespace-nowrap flex items-center gap-1.5 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span className="hidden sm:inline">New Reflection</span>
            <span className="sm:hidden">New</span>
          </button>
        </div>
      </div>
    </header>
  );
};
