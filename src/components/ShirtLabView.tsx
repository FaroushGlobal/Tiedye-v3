import React, { useState } from 'react';
import { ShirtCustomization, ShirtPattern } from '../types';
import { ShirtVisualizer } from './ShirtVisualizer';
import { Atom, Compass, Layers, Droplets, Sparkles, ArrowRight } from 'lucide-react';

interface ShirtLabViewProps {
  shirt: ShirtCustomization;
  onShirtChange: (shirt: ShirtCustomization) => void;
  onApplyToReflection: () => void;
}

const TECHNIQUE_SCIENCE: Record<
  ShirtPattern,
  {
    title: string;
    mathPrinciple: string;
    sciencePrinciple: string;
    instructions: string;
  }
> = {
  spiral: {
    title: 'Archimedean Vortex Spiral',
    mathPrinciple: 'Rotational symmetry with polar coordinates (r = a + bθ). Folds radiate in 360° arcs.',
    sciencePrinciple: 'Capillary absorption wicks liquid dye inward through dense cotton spiral folds.',
    instructions: 'Pinch center of damp shirt with clothes pin or fingers. Twist continuously into a tight flat disc, then bind with 3 rubber bands crossing like pizza slices (6 equal wedge angles).',
  },
  accordion: {
    title: 'Accordion Pleated Stripes',
    mathPrinciple: 'Parallel linear translation (y = mx + b) and repeating periodic wave intervals.',
    sciencePrinciple: 'Directional capillary wicking along warp and weft weave threads creates clean stripe bands.',
    instructions: 'Fold the entire shirt back and forth like a paper fan (accordion pleats 1 to 2 inches wide). Wrap rubber bands along the length and apply dye in alternating stripe sections.',
  },
  bullseye: {
    title: 'Concentric Radial Bullseye',
    mathPrinciple: 'Concentric circles with radial distance (dr) creating periodic boundary rings.',
    sciencePrinciple: 'Rubber band compression restricts dye flow, forming sharp un-dyed white resistance boundaries.',
    instructions: 'Pull up shirt from the exact center point into a cone/tube shape. Place rubber bands at 1.5-inch to 2-inch intervals down the tube. Dye each ring a different color.',
  },
  freeform: {
    title: 'Freeform Marbled Diffusion',
    mathPrinciple: 'Fractal clustering and stochastic non-uniform spatial distribution across planar fabric.',
    sciencePrinciple: 'Turbulent capillary diffusion where dye pigments collide and blend into new color gradients.',
    instructions: 'Scrunch shirt into a loose, organic crumpled mound. Apply dye drops freely across hills and crevices, allowing colors to blend naturally on the cotton fibers.',
  },
};

export const ShirtLabView: React.FC<ShirtLabViewProps> = ({
  shirt,
  onShirtChange,
  onApplyToReflection,
}) => {
  const currentTechnique = TECHNIQUE_SCIENCE[shirt.pattern];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Hero Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-1">
            STEAM Kit Interactive Exploration
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display">
            Virtual Tie-Dye & Fiber Science Lab
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Test how different folding geometry and dye chemistry interact on cotton cellulose.
            Customize your shirt design below and connect it to your dynamic reflection.
          </p>
        </div>
      </div>

      {/* Main Two-Zone Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Visualizer Zone (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Interactive Shirt Preview
          </span>

          <ShirtVisualizer
            shirt={shirt}
            onChange={onShirtChange}
            readOnly={false}
            size="lg"
          />

          <button
            type="button"
            onClick={onApplyToReflection}
            className="w-full mt-6 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Use This Design in My Reflection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Science & Math Concept Deck (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                <span>Technique Focus</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {currentTechnique.title}
              </h2>
            </div>

            {/* Math Connection */}
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-start gap-3">
              <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl shrink-0 mt-0.5">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-900">
                  Math & Geometry Connection
                </h3>
                <p className="text-xs text-indigo-950 mt-1 leading-relaxed">
                  {currentTechnique.mathPrinciple}
                </p>
              </div>
            </div>

            {/* Science & Chemistry Connection */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-start gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl shrink-0 mt-0.5">
                <Atom className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                  Chemical Reaction & Fiber Physics
                </h3>
                <p className="text-xs text-emerald-950 mt-1 leading-relaxed">
                  {currentTechnique.sciencePrinciple}
                </p>
              </div>
            </div>

            {/* Hands-On Kit Instructions */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <div className="p-2 bg-slate-200 text-slate-700 rounded-xl shrink-0 mt-0.5">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  How To Fold With Your Kit
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {currentTechnique.instructions}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
