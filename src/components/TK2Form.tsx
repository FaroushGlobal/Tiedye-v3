import React from 'react';
import { TK2Reflection, TK2Appearance } from '../types';
import { StarRating } from './StarRating';
import { Sparkles, Heart } from 'lucide-react';

interface TK2FormProps {
  data: TK2Reflection;
  onChange: (data: TK2Reflection) => void;
  startQuestionNumber?: number;
}

const APPEARANCE_CHOICES: {
  id: TK2Appearance;
  label: string;
  emoji: string;
  bgClass: string;
  borderClass: string;
  subtext: string;
}[] = [
  {
    id: 'Just like I thought!',
    label: 'Just like I thought!',
    emoji: '🎯',
    bgClass: 'hover:bg-emerald-50 focus:bg-emerald-50',
    borderClass: 'border-emerald-300 ring-emerald-500 bg-emerald-50/70',
    subtext: 'My plan worked right on target!',
  },
  {
    id: 'Different, but I like it!',
    label: 'Different, but I like it!',
    emoji: '🎨',
    bgClass: 'hover:bg-amber-50 focus:bg-amber-50',
    borderClass: 'border-amber-300 ring-amber-500 bg-amber-50/70',
    subtext: 'A happy, colorful surprise!',
  },
  {
    id: 'Super surprising!',
    label: 'Super surprising!',
    emoji: '✨',
    bgClass: 'hover:bg-slate-100 focus:bg-slate-100',
    borderClass: 'border-black ring-black bg-slate-100',
    subtext: 'Whoa! It transformed completely!',
  },
];

export const TK2Form: React.FC<TK2FormProps> = ({
  data,
  onChange,
  startQuestionNumber = 2,
}) => {
  const handleAppearanceSelect = (val: TK2Appearance) => {
    onChange({ ...data, appearance: val });
  };

  const handleRatingChange = (rating: number) => {
    onChange({ ...data, rating });
  };

  const qAppearance = startQuestionNumber;
  const qRating = startQuestionNumber + 1;

  return (
    <div className="space-y-6">
      {/* Question 2: Shirt Appearance (Before rating) */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">
            {qAppearance}
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              After it was rinsed, my shirt looked...
            </h3>
            <p className="text-xs text-slate-500">Pick the sentence that fits your shirt best!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {APPEARANCE_CHOICES.map((choice) => {
            const isSelected = data.appearance === choice.id;
            return (
              <button
                key={choice.id}
                type="button"
                onClick={() => handleAppearanceSelect(choice.id)}
                className={`relative flex flex-col items-center text-center p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  isSelected
                    ? `${choice.borderClass} shadow-sm ring-2`
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/80 hover:border-slate-300'
                }`}
              >
                <span className="text-3xl mb-2 select-none" role="img" aria-label={choice.label}>
                  {choice.emoji}
                </span>
                <span className="text-sm font-bold text-slate-900 leading-snug">
                  {choice.label}
                </span>
                <span className="text-xs text-slate-600 mt-1">{choice.subtext}</span>

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

      {/* Question 3: Star Rating */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
            {qRating}
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              How much did you like doing this activity? ⭐ 1–5
            </h3>
            <p className="text-xs text-slate-500">Tap the stars to tell us how much fun you had!</p>
          </div>
        </div>

        <StarRating
          value={data.rating}
          onChange={handleRatingChange}
          label="My Fun Rating:"
          size="lg"
        />
      </div>

      {/* Optional Kid Note */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center font-bold text-sm">
            <Heart className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Tell your teacher: What was your favorite part? (Optional)
            </h4>
            <p className="text-xs text-slate-500">You can type a word, colors, or your teacher can help you write!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Favorite color you squeezed on:
            </label>
            <input
              type="text"
              value={data.favoriteColorUsed || ''}
              onChange={(e) => onChange({ ...data, favoriteColorUsed: e.target.value })}
              placeholder="e.g., Bright Turquoise & Sun Yellow"
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-black bg-slate-50/50"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              One thing you loved doing:
            </label>
            <input
              type="text"
              value={data.extraNotes || ''}
              onChange={(e) => onChange({ ...data, extraNotes: e.target.value })}
              placeholder="e.g., Putting rubber bands on, washing it, seeing the colors mix!"
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-black bg-slate-50/50"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
