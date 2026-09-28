import React from 'react';
import { Grade36Reflection, ShirtAppearance } from '../types';
import { StarRating } from './StarRating';
import { Calculator, Sparkles } from 'lucide-react';

interface Grade3to6FormProps {
  data: Grade36Reflection;
  onChange: (data: Grade36Reflection) => void;
  startQuestionNumber?: number;
}

const SHIRT_APPEARANCE_OPTIONS: {
  id: ShirtAppearance;
  label: string;
  emoji: string;
  desc: string;
  borderClass: string;
}[] = [
  {
    id: 'Just like I thought!',
    label: 'Just like I thought!',
    emoji: '🎯',
    desc: 'Matched my prediction!',
    borderClass: 'border-emerald-400 bg-emerald-50/70 ring-emerald-400',
  },
  {
    id: 'Different, but I like it!',
    label: 'Different, but I like it!',
    emoji: '🎨',
    desc: 'Unexpected cool pattern!',
    borderClass: 'border-amber-400 bg-amber-50/70 ring-amber-400',
  },
  {
    id: 'Super surprising!',
    label: 'Super surprising!',
    emoji: '✨',
    desc: 'Total color transformation!',
    borderClass: 'border-black bg-slate-100 ring-black',
  },
];

const MATH_SUGGESTIONS = [
  'I counted the number of rubber bands to make equal sections.',
  'I divided the circle into halves and quarters (fractions).',
  'I measured the distance between folds so my stripes were symmetrical.',
];

export const Grade3to6Form: React.FC<Grade3to6FormProps> = ({
  data,
  onChange,
  startQuestionNumber = 2,
}) => {
  const handleTextChange = (field: keyof Grade36Reflection, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleApplySuggestion = (text: string) => {
    if (!data.mathPlanningExplanation) {
      onChange({ ...data, mathPlanningExplanation: text });
    } else {
      onChange({ ...data, mathPlanningExplanation: `${data.mathPlanningExplanation} ${text}` });
    }
  };

  const qMath = startQuestionNumber;
  const qAppearance = startQuestionNumber + 1;
  const qRating = startQuestionNumber + 2;

  return (
    <div className="space-y-6">
      {/* Question 2: Math in Planning */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
            {qMath}
          </div>
          <div className="flex-1">
            <label htmlFor="math-planning-input" className="text-base sm:text-lg font-bold text-slate-900 block">
              How did math help you plan your design before you added any color?
            </label>
            <p className="text-xs text-slate-500 mt-0.5">
              Did you use counting, equal spacing, symmetry, fractions, or measuring?
            </p>
          </div>
        </div>

        <textarea
          id="math-planning-input"
          rows={3}
          value={data.mathPlanningExplanation}
          onChange={(e) => handleTextChange('mathPlanningExplanation', e.target.value)}
          placeholder="Explain how math, geometry, or numbers helped your design..."
          className="w-full text-sm p-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-black bg-slate-50/50 resize-y"
        />

        {/* Math thought starters */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
          <span className="text-slate-500 flex items-center gap-1 font-medium">
            <Calculator className="w-3.5 h-3.5 text-black" /> Math prompts:
          </span>
          {MATH_SUGGESTIONS.map((sug, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleApplySuggestion(sug)}
              className="text-[11px] text-black bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-md px-2 py-1 transition-colors cursor-pointer text-left"
            >
              + {sug.slice(0, 36)}...
            </button>
          ))}
        </div>
      </div>

      {/* Question 3: Shirt Appearance after rinsing (Question before "how much did you enjoy this activity?") */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm shrink-0">
            {qAppearance}
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              After it was rinsed, my shirt looked...
            </h3>
            <p className="text-xs text-slate-500">
              Pick the outcome that best describes your rinsed shirt.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {SHIRT_APPEARANCE_OPTIONS.map((item) => {
            const isSelected = data.shirtAppearance === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange({ ...data, shirtAppearance: item.id })}
                className={`relative flex flex-col items-center text-center p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  isSelected
                    ? `${item.borderClass} shadow-sm ring-2`
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <span className="text-2xl mb-1.5 select-none" role="img" aria-label={item.label}>
                  {item.emoji}
                </span>
                <span className="text-sm font-bold text-slate-900">{item.label}</span>
                <span className="text-xs text-slate-600 mt-1">{item.desc}</span>

                {isSelected && (
                  <span className="absolute top-2 right-2 text-black">
                    <Sparkles className="w-4 h-4 fill-slate-300 text-black" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question 4: Star Rating */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm shrink-0">
            {qRating}
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              How much did you enjoy this activity? ⭐ 1–5
            </h3>
            <p className="text-xs text-slate-500">Rate your STEAM kit hands-on experience!</p>
          </div>
        </div>

        <StarRating
          value={data.rating}
          onChange={(rating) => onChange({ ...data, rating })}
          label="Your Rating:"
          size="lg"
        />
      </div>
    </div>
  );
};
