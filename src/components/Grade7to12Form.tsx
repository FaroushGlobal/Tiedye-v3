import React from 'react';
import { Grade712Reflection } from '../types';
import { StarRating } from './StarRating';
import { ScienceWordTracker } from './ScienceWordTracker';
import { Compass, RefreshCw } from 'lucide-react';

interface Grade7to12FormProps {
  data: Grade712Reflection;
  onChange: (data: Grade712Reflection) => void;
  startQuestionNumber?: number;
}

const GEOMETRY_PROMPTS = [
  'Radial symmetry around a central vortex point (360° / n folds)',
  'Bilateral mirror symmetry along the vertical chest axis',
  'Accordion linear stripes with repeating wave periods',
  'Concentric circular rings with equal radial intervals (dr)',
];

const REITERATION_PROMPTS = [
  'Adjust saturation and dwell time before cold water rinse',
  'Pre-soak in sodium carbonate (soda ash) for higher pH bonding',
  'Increase rubber band tension for sharper white resist borders',
  'Experiment with complementary color theory to prevent muddy blends',
];

export const Grade7to12Form: React.FC<Grade7to12FormProps> = ({
  data,
  onChange,
  startQuestionNumber = 2,
}) => {
  const handleFieldChange = (field: keyof Grade712Reflection, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleAppendPrompt = (field: 'geometrySymmetryExplanation' | 'engineeringChange', text: string) => {
    if (!data[field]) {
      onChange({ ...data, [field]: text });
    } else {
      onChange({ ...data, [field]: `${data[field]} ${text}` });
    }
  };

  const qScience = startQuestionNumber;
  const qGeometry = startQuestionNumber + 1;
  const qIteration = startQuestionNumber + 2;
  const qRating = startQuestionNumber + 3;

  return (
    <div className="space-y-6">
      {/* Question 2: Chemical & Molecular Bonding */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
            {qScience}
          </div>
          <div className="flex-1">
            <label htmlFor="chemistry-input" className="text-base sm:text-lg font-bold text-slate-900 block">
              Why does the color stay in the fabric after rinsing?
            </label>
            <p className="text-xs text-slate-600 mt-0.5">
              Explain the scientific mechanism. Remember to use at least one science word:{' '}
              <span className="font-semibold text-emerald-800">absorb</span>,{' '}
              <span className="font-semibold text-emerald-800">bond</span>,{' '}
              <span className="font-semibold text-emerald-800">molecule</span>, or{' '}
              <span className="font-semibold text-emerald-800">reaction</span>.
            </p>
          </div>
        </div>

        <textarea
          id="chemistry-input"
          rows={3}
          value={data.colorRetentionScience}
          onChange={(e) => handleFieldChange('colorRetentionScience', e.target.value)}
          placeholder="e.g., The fiber-reactive dye molecules undergo an alkaline reaction with the cotton cellulose, forming permanent covalent bonds so the pigment cannot simply be washed away..."
          className="w-full text-sm p-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50 resize-y"
        />

        {/* Live Science Word Tracker */}
        <ScienceWordTracker text={data.colorRetentionScience} />
      </div>

      {/* Question 3: Geometry or Symmetry */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
            {qGeometry}
          </div>
          <div className="flex-1">
            <label htmlFor="geometry-input" className="text-base sm:text-lg font-bold text-slate-900 block">
              How did geometry or symmetry shape your design?
            </label>
            <p className="text-xs text-slate-600 mt-0.5">
              Discuss radial symmetry, rotational angles, folding axes, or geometric shapes used.
            </p>
          </div>
        </div>

        <textarea
          id="geometry-input"
          rows={3}
          value={data.geometrySymmetryExplanation}
          onChange={(e) => handleFieldChange('geometrySymmetryExplanation', e.target.value)}
          placeholder="Describe how geometric folds, radial planes, or symmetry rules determined the final pattern..."
          className="w-full text-sm p-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-black bg-slate-50/50 resize-y"
        />

        {/* Geometry Starter Concepts */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
          <span className="text-slate-500 flex items-center gap-1 font-medium">
            <Compass className="w-3.5 h-3.5 text-black" /> Geometry concepts:
          </span>
          {GEOMETRY_PROMPTS.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleAppendPrompt('geometrySymmetryExplanation', p)}
              className="text-[11px] text-black bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-md px-2 py-1 transition-colors cursor-pointer text-left"
            >
              + {p.slice(0, 36)}...
            </button>
          ))}
        </div>
      </div>

      {/* Question 4: Engineering Design Cycle - Iteration */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-800 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
            {qIteration}
          </div>
          <div className="flex-1">
            <label htmlFor="engineering-input" className="text-base sm:text-lg font-bold text-slate-900 block">
              If you made this again, what's one change you'd make?
            </label>
            <p className="text-xs text-slate-600 mt-0.5">
              Reflect on the design process: fold tension, dye quantity, color placement, or chemical soak time.
            </p>
          </div>
        </div>

        <textarea
          id="engineering-input"
          rows={3}
          value={data.engineeringChange}
          onChange={(e) => handleFieldChange('engineeringChange', e.target.value)}
          placeholder="Describe an optimization or refinement you would test in your next iteration..."
          className="w-full text-sm p-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 bg-slate-50/50 resize-y"
        />

        {/* Engineering iteration ideas */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
          <span className="text-slate-500 flex items-center gap-1 font-medium">
            <RefreshCw className="w-3.5 h-3.5 text-violet-600" /> Iteration factors:
          </span>
          {REITERATION_PROMPTS.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleAppendPrompt('engineeringChange', p)}
              className="text-[11px] text-violet-800 bg-violet-50 hover:bg-violet-100 border border-violet-200 rounded-md px-2 py-1 transition-colors cursor-pointer text-left"
            >
              + {p.slice(0, 36)}...
            </button>
          ))}
        </div>
      </div>

      {/* Question 5: Star Rating */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm shrink-0">
            {qRating}
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              How much did you enjoy this activity? ⭐ 1–5
            </h3>
            <p className="text-xs text-slate-500">Rate the overall STEAM challenge and discovery process.</p>
          </div>
        </div>

        <StarRating
          value={data.rating}
          onChange={(rating) => onChange({ ...data, rating })}
          label="Activity Satisfaction:"
          size="lg"
        />
      </div>
    </div>
  );
};
