import React from 'react';
import { ShirtCustomization, ShirtPattern } from '../types';
import { ShirtVisualizer } from './ShirtVisualizer';
import { Sparkles, Palette } from 'lucide-react';

interface PatternQuestionProps {
  shirt: ShirtCustomization;
  onChange: (shirt: ShirtCustomization) => void;
  questionNumber?: number;
}

const PATTERN_CHOICES: {
  id: ShirtPattern;
  name: string;
  desc: string;
  badge: string;
}[] = [
  {
    id: 'spiral',
    name: 'Spiral',
    desc: 'Center pinch twisted in a circle',
    badge: 'Rotational',
  },
  {
    id: 'accordion',
    name: 'Accordion',
    desc: 'Back-and-forth fan folds for stripes',
    badge: 'Linear',
  },
  {
    id: 'bullseye',
    name: 'Bullseye',
    desc: 'Concentric rings pulled from the center',
    badge: 'Concentric',
  },
  {
    id: 'freeform',
    name: 'Freeform',
    desc: 'Organic crumpled marble diffusion',
    badge: 'Organic',
  },
];

export const PatternQuestion: React.FC<PatternQuestionProps> = ({
  shirt,
  onChange,
  questionNumber = 1,
}) => {
  return (
    <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200/90 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm shrink-0">
            {questionNumber}
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Which Tie-Dye Pattern did you choose?
            </h3>
            <p className="text-xs text-slate-500">
              Select your folding technique and match the dye colors you used.
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-black rounded-lg w-fit">
          Fold & Color Planning
        </span>
      </div>

      {/* Grid: Left is Pattern Selector Cards, Right is Live Shirt Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Pattern Cards (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <label className="text-xs font-semibold text-slate-700 block">
            Choose your pattern:
          </label>

          <div className="grid grid-cols-2 gap-2.5">
            {PATTERN_CHOICES.map((choice) => {
              const isSelected = shirt.pattern === choice.id;
              return (
                <button
                  key={choice.id}
                  type="button"
                  onClick={() => onChange({ ...shirt, pattern: choice.id })}
                  className={`p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer relative ${
                    isSelected
                      ? 'border-black bg-slate-100 shadow-xs ring-2 ring-black'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-sm font-bold text-slate-900">{choice.name}</span>
                    <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 bg-slate-200/70 text-slate-700 rounded">
                      {choice.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">{choice.desc}</p>
                  {isSelected && (
                    <span className="absolute top-2.5 right-2.5 text-black">
                      <Sparkles className="w-3.5 h-3.5 fill-slate-300 text-black" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <p className="text-[11px] text-slate-500 pt-1">
            Tip: You can customize the exact colors of your {shirt.pattern} shirt on the preview panel.
          </p>
        </div>

        {/* Live Shirt Preview (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50/70 rounded-2xl border border-slate-200/80 p-4 flex flex-col items-center">
          <ShirtVisualizer
            shirt={shirt}
            onChange={onChange}
            readOnly={false}
            size="md"
          />
        </div>
      </div>
    </div>
  );
};
