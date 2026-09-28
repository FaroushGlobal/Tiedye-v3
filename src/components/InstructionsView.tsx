import React from 'react';
import {
  BookOpen,
  Clock,
  Sparkles,
  School,
  Home,
  CheckCircle2,
  PackageCheck,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

interface InstructionsViewProps {
  onGoToReflection: () => void;
}

export const InstructionsView: React.FC<InstructionsViewProps> = ({ onGoToReflection }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Hero Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black mb-1.5">
              <Sparkles className="w-4 h-4 text-black" />
              <span>STEAM Kit Activity Guide</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Tie-Dye Instructions & Materials
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Step-by-step guidance for students and teachers. Follow these steps in order.
              Steps 1–3 happen during class. Steps 4–5 happen after class or at home.
            </p>
          </div>

          <button
            type="button"
            onClick={onGoToReflection}
            className="self-start md:self-center px-5 py-3 bg-black hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer active:scale-95 shrink-0"
          >
            <span>Go to Reflection Form</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* MATERIALS NEEDED (PER STUDENT) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-300 flex items-center justify-center text-black">
            <PackageCheck className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-black">
              MATERIALS NEEDED (PER STUDENT)
            </h2>
            <p className="text-xs text-slate-500">
              Each student should receive these kit components before beginning
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Materials Column 1 */}
          <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 space-y-3">
            <div className="flex items-center gap-3 text-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-black shrink-0" />
              <span className="text-sm font-medium">1 white shirt or tote bag</span>
            </div>
            <div className="flex items-center gap-3 text-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-black shrink-0" />
              <span className="text-sm font-medium">3 bottles of fabric dye (primary colors)</span>
            </div>
            <div className="flex items-center gap-3 text-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-black shrink-0" />
              <span className="text-sm font-medium">4–6 rubber bands</span>
            </div>
            <div className="flex items-center gap-3 text-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-black shrink-0" />
              <span className="text-sm font-medium">1 pair of gloves</span>
            </div>
          </div>

          {/* Materials Column 2 */}
          <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 space-y-3">
            <div className="flex items-center gap-3 text-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-black shrink-0" />
              <span className="text-sm font-medium">1 zip-top bag</span>
            </div>
            <div className="flex items-center gap-3 text-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-black shrink-0" />
              <span className="text-sm font-medium">1 disposable tray</span>
            </div>
            <div className="flex items-center gap-3 text-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-black shrink-0" />
              <span className="text-sm font-medium">1 apron</span>
            </div>
            <div className="flex items-center gap-3 text-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-black shrink-0" />
              <span className="text-sm font-medium">1 squirt bottle of water</span>
            </div>
          </div>
        </div>
      </div>

      {/* STEP-BY-STEP TIE-DYE INSTRUCTIONS */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-display">
              Step-by-Step Tie-Dye Instructions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Follow these steps in order. Steps 1–3 happen during class. Steps 4–5 happen after class or at home.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <School className="w-3.5 h-3.5" />
              Steps 1–3: In Class
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
              <Home className="w-3.5 h-3.5" />
              Steps 4–5: After Class / Home
            </span>
          </div>
        </div>

        {/* Step 1 */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3.5">
              <span className="w-8 h-8 rounded-xl bg-black text-white font-black text-sm flex items-center justify-center shrink-0 shadow-2xs">
                1
              </span>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                  Protect & Prep
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                2 min
              </span>
              <span className="text-[11px] uppercase font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-1 rounded-lg">
                During Class
              </span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed sm:pl-11.5">
            Put the tray on the table. Put on your apron. Put on your gloves. Wet the entire shirt with water — front and back — until it’s lightly damp, no dry spots.
          </p>

          <div className="sm:ml-11.5 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-xs sm:text-sm text-amber-900 leading-relaxed">
            <strong className="font-bold text-amber-950">Tip: </strong>
            A dry spot won’t take the dye evenly once it’s folded, so damp the whole shirt, not just the middle. Everything you need is in the kit — no sink required. Dye can stain, so wear gloves and old clothes.
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3.5">
              <span className="w-8 h-8 rounded-xl bg-black text-white font-black text-sm flex items-center justify-center shrink-0 shadow-2xs">
                2
              </span>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                  Fold & Bind
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                10 min
              </span>
              <span className="text-[11px] uppercase font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-1 rounded-lg">
                During Class
              </span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed sm:pl-11.5">
            Pick a pattern (spiral, accordion, bullseye, or freeform), fold the T-shirt, and wrap it tightly with 4–6 rubber bands.
          </p>

          <div className="sm:ml-11.5 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-xs sm:text-sm text-amber-900 leading-relaxed">
            <strong className="font-bold text-amber-950">Tip: </strong>
            Tighter rubber bands make cleaner white lines between colors.
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3.5">
              <span className="w-8 h-8 rounded-xl bg-black text-white font-black text-sm flex items-center justify-center shrink-0 shadow-2xs">
                3
              </span>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                  Apply the Dye
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                15–20 min
              </span>
              <span className="text-[11px] uppercase font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-1 rounded-lg">
                During Class
              </span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed sm:pl-11.5">
            Squirt one color onto each section of the entire T-shirt. Use a little dye at a time — it goes a long way.
          </p>

          <div className="sm:ml-11.5 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-xs sm:text-sm text-amber-900 leading-relaxed">
            <strong className="font-bold text-amber-950">Tip: </strong>
            Fewer colors touching each other means cleaner color, not muddy mixing.
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3.5">
              <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-2xs">
                4
              </span>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                  Bag & Cure
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                6–24 hours
              </span>
              <span className="text-[11px] uppercase font-bold text-sky-700 bg-sky-50 border border-sky-200/70 px-2.5 py-1 rounded-lg">
                After Class
              </span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed sm:pl-11.5">
            Leave the rubber bands on the T-shirt. Put the wet T-shirt in the bag and seal it. Let it sit for 6–24 hours — overnight is best.
          </p>

          <div className="sm:ml-11.5 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-xs sm:text-sm text-amber-900 leading-relaxed">
            <strong className="font-bold text-amber-950">Tip: </strong>
            This step happens after class. Send the bagged shirt home with the note below.
          </div>
        </div>

        {/* Step 5 */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3.5">
              <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-2xs">
                5
              </span>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                  Rinse & Reveal
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                5–10 min
              </span>
              <span className="text-[11px] uppercase font-bold text-sky-700 bg-sky-50 border border-sky-200/70 px-2.5 py-1 rounded-lg">
                At Home
              </span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed sm:pl-11.5">
            Take off the rubber bands over a sink. Rinse with cool water until it runs clear. Wash alone in cold water for the first 1–2 washes, then wash as normal. Air dry or tumble dry low.
          </p>

          <div className="sm:ml-11.5 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-xs sm:text-sm text-amber-900 leading-relaxed">
            <strong className="font-bold text-amber-950">Tip: </strong>
            Rinsing outside or over a dark sink helps if you’re worried about staining.
          </div>
        </div>
      </div>

      {/* Ready to Reflect Banner */}
      <div className="bg-black rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight">
            Ready to Complete Your STEAM Reflection?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Answer questions tailored to your grade level and earn your printable completion certificate.
          </p>
        </div>
        <button
          type="button"
          onClick={onGoToReflection}
          className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-100 text-black font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95 shrink-0"
        >
          <span>Fill Out Reflection Form</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
