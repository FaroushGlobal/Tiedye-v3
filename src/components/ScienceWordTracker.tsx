import React from 'react';
import { CheckCircle2, Circle, Info } from 'lucide-react';

interface ScienceWordTrackerProps {
  text: string;
}

interface TargetWord {
  word: string;
  regex: RegExp;
  definition: string;
  chemicalContext: string;
}

const SCIENCE_WORDS: TargetWord[] = [
  {
    word: 'absorb',
    regex: /\b(absorb|absorbs|absorbing|absorbed|absorption)\b/i,
    definition: 'To take in or soak up liquid, heat, or moisture.',
    chemicalContext: 'Cotton fibers have porous hollow lumens that capillary action pulls dye solution into.',
  },
  {
    word: 'bond',
    regex: /\b(bond|bonds|bonded|bonding|covalent|hydrogen bond)\b/i,
    definition: 'An attraction between atoms or molecules creating chemical links.',
    chemicalContext: 'Fiber-reactive dyes form permanent covalent bonds directly with cellulose molecules.',
  },
  {
    word: 'molecule',
    regex: /\b(molecule|molecules|molecular)\b/i,
    definition: 'A group of atoms bonded together, the smallest unit of a chemical compound.',
    chemicalContext: 'Chromophore dye molecules lock into the polymeric chains of cotton cellulose.',
  },
  {
    word: 'reaction',
    regex: /\b(reaction|reactions|react|reacts|reacting|reactant)\b/i,
    definition: 'A process where substances undergo chemical transformation into new substances.',
    chemicalContext: 'Alkaline fixative (soda ash, Na2CO3) raises pH to activate the reaction between dye and fiber.',
  },
];

export const ScienceWordTracker: React.FC<ScienceWordTrackerProps> = ({ text }) => {
  const matchedWords = SCIENCE_WORDS.filter((item) => item.regex.test(text));
  const hasAtLeastOne = matchedWords.length > 0;

  return (
    <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
          <span>Science Vocabulary Tracker:</span>
          <span className="text-[11px] font-normal text-slate-500">
            (Use at least 1 keyword: absorb, bond, molecule, reaction)
          </span>
        </div>
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded ${
            hasAtLeastOne
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-amber-100 text-amber-800'
          }`}
        >
          {matchedWords.length} of 4 used {hasAtLeastOne && '✓'}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {SCIENCE_WORDS.map((item) => {
          const isMatched = item.regex.test(text);

          return (
            <div
              key={item.word}
              className={`p-2 rounded-lg border transition-all ${
                isMatched
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-xs capitalize tracking-wide">{item.word}</span>
                {isMatched ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                )}
              </div>
              <p className="text-[10px] leading-tight text-slate-600 line-clamp-2">
                {item.definition}
              </p>
            </div>
          );
        })}
      </div>

      {hasAtLeastOne && (
        <div className="mt-2 text-[11px] text-emerald-800 flex items-start gap-1.5 pt-2 border-t border-slate-200/80">
          <Info className="w-3.5 h-3.5 mt-0.5 text-emerald-600 shrink-0" />
          <span>
            <strong>STEAM Insight:</strong>{' '}
            {matchedWords.map((w) => w.chemicalContext).join(' ')}
          </span>
        </div>
      )}
    </div>
  );
};
