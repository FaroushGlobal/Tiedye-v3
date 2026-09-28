import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  value: number;
  onChange: (rating: number) => void;
  size?: 'md' | 'lg';
  label?: string;
  required?: boolean;
}

const RATING_DESCRIPTIONS: Record<number, { text: string; mood: string; color: string }> = {
  1: { text: 'Needs some tweaks', mood: '🤔 A bit tricky', color: 'text-amber-700' },
  2: { text: 'It was okay', mood: '🙂 Pretty fun', color: 'text-amber-700' },
  3: { text: 'Good activity', mood: '😊 Enjoyed it!', color: 'text-emerald-700' },
  4: { text: 'Great project', mood: '😄 Loved it!', color: 'text-emerald-700' },
  5: { text: 'Outstanding STEAM!', mood: '🎉 Super Awesome!', color: 'text-black font-bold' },
};

export const StarRating: React.FC<StarRatingProps> = ({
  value,
  onChange,
  size = 'lg',
  label = 'How much did you enjoy this activity? ⭐ 1–5',
  required = true,
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const activeRating = hoverValue !== null ? hoverValue : value;
  const currentInfo = activeRating > 0 ? RATING_DESCRIPTIONS[activeRating] : null;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
          <span>{label}</span>
          {required && <span className="text-rose-500 text-xs" title="Required">*</span>}
        </label>
        {activeRating > 0 && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 ${currentInfo?.color || 'text-slate-700'}`}>
            {activeRating} of 5 · {currentInfo?.mood}
          </span>
        )}
      </div>

      <div
        className="flex items-center gap-2 p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 hover:border-slate-300 transition-colors"
        onMouseLeave={() => setHoverValue(null)}
        role="radiogroup"
        aria-label="Star rating out of 5"
      >
        <div className="flex items-center gap-1.5 sm:gap-2">
          {[1, 2, 3, 4, 5].map((starNumber) => {
            const isFilled = starNumber <= activeRating;
            const isSelected = starNumber === value;

            return (
              <button
                key={starNumber}
                type="button"
                onClick={() => onChange(starNumber)}
                onMouseEnter={() => setHoverValue(starNumber)}
                onFocus={() => setHoverValue(starNumber)}
                onBlur={() => setHoverValue(null)}
                className={`group relative p-1.5 sm:p-2 rounded-lg transition-all duration-150 transform focus:outline-none focus-visible:ring-2 focus-visible:ring-black ${
                  isFilled ? 'scale-105' : 'hover:scale-105 opacity-60 hover:opacity-100'
                }`}
                aria-label={`${starNumber} star${starNumber > 1 ? 's' : ''}`}
                aria-checked={isSelected}
                role="radio"
              >
                <Star
                  className={`${
                    size === 'lg' ? 'w-8 h-8 sm:w-9 sm:h-9' : 'w-6 h-6 sm:w-7 sm:h-7'
                  } transition-colors duration-150 ${
                    isFilled
                      ? 'fill-amber-400 text-amber-500 drop-shadow-[0_2px_6px_rgba(251,191,36,0.35)]'
                      : 'text-slate-300 fill-slate-100 group-hover:text-amber-300'
                  }`}
                />
                <span className="sr-only">{starNumber} star</span>
              </button>
            );
          })}
        </div>

        <div className="ml-auto pl-3 border-l border-slate-200 hidden sm:block text-right">
          <p className="text-xs font-semibold text-slate-700">
            {activeRating > 0 ? currentInfo?.text : 'Select 1 to 5 stars'}
          </p>
          <p className="text-[11px] text-slate-500">
            {activeRating > 0 ? `${activeRating}/5 rating chosen` : 'Tap a star to rate'}
          </p>
        </div>
      </div>
    </div>
  );
};
