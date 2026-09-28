/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  GradeBand,
  StudentProfile,
  TK2Reflection,
  Grade36Reflection,
  Grade712Reflection,
  ShirtCustomization,
  ReflectionSubmission,
} from './types';
import { INITIAL_SUBMISSIONS } from './data/mockEntries';
import { TopBar, AppView } from './components/TopBar';
import { GradeBandSelector } from './components/GradeBandSelector';
import { TK2Form } from './components/TK2Form';
import { Grade3to6Form } from './components/Grade3to6Form';
import { Grade7to12Form } from './components/Grade7to12Form';
import { PatternQuestion } from './components/PatternQuestion';
import { ShirtVisualizer } from './components/ShirtVisualizer';
import { SubmissionCertificate } from './components/SubmissionCertificate';
import { InstructionsView } from './components/InstructionsView';
import { StylesView } from './components/StylesView';
import { sendToFormspree } from './services/formspree';
import {
  Sparkles,
  Send,
  AlertCircle,
  Palette,
  CheckCircle2,
  Atom,
  HelpCircle,
  Loader2,
} from 'lucide-react';

const STORAGE_KEY = 'steam_kit_reflections_v1';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('reflection');
  const [submissions, setSubmissions] = useState<ReflectionSubmission[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return INITIAL_SUBMISSIONS;
  });

  // Current active reflection state
  const [selectedBand, setSelectedBand] = useState<GradeBand>('3rd-6th');
  const [profile, setProfile] = useState<StudentProfile>({
    schoolName: '',
    teacherName: '',
    gradeLevel: '',
  });

  const [shirt, setShirt] = useState<ShirtCustomization>({
    pattern: 'spiral',
    primaryColor: '#0ea5e9',
    secondaryColor: '#ec4899',
    accentColor: '#eab308',
  });

  // Group-specific state
  const [tk2Data, setTk2Data] = useState<TK2Reflection>({
    appearance: '',
    rating: 5,
    favoriteColorUsed: '',
    extraNotes: '',
  });

  const [grade36Data, setGrade36Data] = useState<Grade36Reflection>({
    shirtAppearance: '',
    mathPlanningExplanation: '',
    rating: 5,
  });

  const [grade712Data, setGrade712Data] = useState<Grade712Reflection>({
    colorRetentionScience: '',
    geometrySymmetryExplanation: '',
    engineeringChange: '',
    rating: 5,
  });

  // Active completed submission to show certificate
  const [activeSubmission, setActiveSubmission] = useState<ReflectionSubmission | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
    } catch {
      // ignore
    }
  }, [submissions]);

  const handleStartNew = () => {
    setActiveSubmission(null);
    setCurrentView('reflection');
    setValidationError(null);
    setProfile({
      schoolName: '',
      teacherName: '',
      gradeLevel: '',
    });
    setTk2Data({
      appearance: '',
      rating: 5,
      favoriteColorUsed: '',
      extraNotes: '',
    });
    setGrade36Data({
      shirtAppearance: '',
      mathPlanningExplanation: '',
      rating: 5,
    });
    setGrade712Data({
      colorRetentionScience: '',
      geometrySymmetryExplanation: '',
      engineeringChange: '',
      rating: 5,
    });
  };

  const validateForm = (): boolean => {
    if (!profile.schoolName.trim()) {
      setValidationError("Please enter what your school name is.");
      return false;
    }
    if (!profile.teacherName.trim()) {
      setValidationError('Please enter who your After-school Teacher is.');
      return false;
    }
    if (!profile.gradeLevel.trim()) {
      setValidationError('Please enter what grade you are in.');
      return false;
    }

    if (selectedBand === 'TK-2nd') {
      if (!tk2Data.appearance) {
        setValidationError('Please select how your shirt looked after it was rinsed.');
        return false;
      }
      if (!tk2Data.rating || tk2Data.rating < 1) {
        setValidationError('Please rate how much you liked the activity (1 to 5 stars).');
        return false;
      }
    } else if (selectedBand === '3rd-6th') {
      if (!grade36Data.shirtAppearance) {
        setValidationError('Please select how your shirt looked after it was rinsed.');
        return false;
      }
      if (!grade36Data.mathPlanningExplanation.trim()) {
        setValidationError('Please describe how math helped you plan your design before adding color.');
        return false;
      }
      if (!grade36Data.rating || grade36Data.rating < 1) {
        setValidationError('Please rate how much you enjoyed this activity (1 to 5 stars).');
        return false;
      }
    } else if (selectedBand === '7th-12th') {
      if (!grade712Data.colorRetentionScience.trim()) {
        setValidationError('Please explain why the color stays in the fabric after rinsing (using absorb, bond, molecule, or reaction).');
        return false;
      }
      if (!grade712Data.geometrySymmetryExplanation.trim()) {
        setValidationError('Please explain how geometry or symmetry shaped your design.');
        return false;
      }
      if (!grade712Data.engineeringChange.trim()) {
        setValidationError("Please share one change you'd make if you made this again.");
        return false;
      }
      if (!grade712Data.rating || grade712Data.rating < 1) {
        setValidationError('Please rate how much you enjoyed this activity (1 to 5 stars).');
        return false;
      }
    }

    setValidationError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    const currentRating =
      selectedBand === 'TK-2nd'
        ? tk2Data.rating
        : selectedBand === '3rd-6th'
        ? grade36Data.rating
        : grade712Data.rating;

    const newSub: ReflectionSubmission = {
      id: `steam-${Date.now()}`,
      timestamp: new Date().toISOString(),
      gradeBand: selectedBand,
      schoolName: profile.schoolName.trim() || 'STEAM School',
      teacherName: profile.teacherName.trim(),
      gradeLevel: profile.gradeLevel.trim(),
      rating: currentRating,
      shirt: { ...shirt },
      tk2Data: selectedBand === 'TK-2nd' ? { ...tk2Data } : undefined,
      grade36Data: selectedBand === '3rd-6th' ? { ...grade36Data } : undefined,
      grade712Data: selectedBand === '7th-12th' ? { ...grade712Data } : undefined,
    };

    // Send the information to Formspree endpoint (https://formspree.io/f/mqpabndl)
    const result = await sendToFormspree(newSub);
    newSub.formspreeStatus = result.ok ? 'sent' : 'failed';

    setSubmissions((prev) => [newSub, ...prev]);
    setActiveSubmission(newSub);
    setIsSubmitting(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Universal Design Top Bar */}
      <TopBar
        currentView={currentView}
        onSelectView={setCurrentView}
        onStartNew={handleStartNew}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 pb-20">
        {/* VIEW 1: Instructions Living Page */}
        {currentView === 'instructions' && (
          <InstructionsView onGoToReflection={() => setCurrentView('reflection')} />
        )}

        {/* VIEW 2: Styles Living Page */}
        {currentView === 'styles' && (
          <StylesView
            onSelectPatternForReflection={(chosenPattern) => {
              setShirt((prev) => ({ ...prev, pattern: chosenPattern }));
            }}
            onGoToReflection={() => setCurrentView('reflection')}
          />
        )}

        {/* VIEW 3: Reflection Activity & Certificate */}
        {currentView === 'reflection' && (
          <>
            {/* Showing Completed Certificate */}
            {activeSubmission && (
              <SubmissionCertificate
                submission={activeSubmission}
                onReset={handleStartNew}
              />
            )}

            {/* Dynamic Student Reflection Form */}
            {!activeSubmission && (
              <div className="space-y-8">
            {/* Header / Hero */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black mb-1">
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>STEAM Kit Hands-On Learning</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                  Tie-Dye Activity Reflection
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Reflect on your STEAM Kit tie-dye project. Questions adapt dynamically to your
                  grade group to explore color chemistry, geometric folding, and scientific predictions.
                </p>
              </div>
            </div>

            {/* Validation Error Alert */}
            {validationError && (
              <div
                role="alert"
                className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3 shadow-xs"
              >
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wide">
                    Please Complete All Required Fields
                  </h3>
                  <p className="text-xs text-rose-700 mt-0.5">{validationError}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1 & 2: Grade Band Selector & Student/Teacher Info */}
              <GradeBandSelector
                selectedBand={selectedBand}
                onSelectBand={(band) => {
                  setSelectedBand(band);
                  setValidationError(null);
                }}
                profile={profile}
                onProfileChange={(newProf) => {
                  setProfile(newProf);
                  if (validationError) setValidationError(null);
                }}
              />

              {/* Step 3: Dynamic Questions for Selected Grade Band */}
              <div className="space-y-6">
                <div className="flex items-center justify-between px-1">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-black">
                      Step 3 · Dynamic Questions
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      Questions for Grade {selectedBand}
                    </h2>
                  </div>
                  <span className="text-xs text-slate-500">All questions required *</span>
                </div>

                {/* Question 1: Which Tie-Dye Pattern did you choose? */}
                <PatternQuestion
                  shirt={shirt}
                  onChange={setShirt}
                  questionNumber={1}
                />

                {selectedBand === 'TK-2nd' && (
                  <TK2Form
                    data={tk2Data}
                    onChange={setTk2Data}
                    startQuestionNumber={2}
                  />
                )}

                {selectedBand === '3rd-6th' && (
                  <Grade3to6Form
                    data={grade36Data}
                    onChange={setGrade36Data}
                    startQuestionNumber={2}
                  />
                )}

                {selectedBand === '7th-12th' && (
                  <Grade7to12Form
                    data={grade712Data}
                    onChange={setGrade712Data}
                    startQuestionNumber={2}
                  />
                )}
              </div>

              {/* Submit Button Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500">
                  <span>Ready to finalize? </span>
                  <strong className="text-slate-800">
                    Your reflection will be saved to the teacher roster and generate a printable certificate.
                  </strong>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-3.5 bg-black hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed active:scale-95"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending to Formspree...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit My STEAM Reflection</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </>
    )}
  </main>

  {/* Floating Watermark */}
  <div
    aria-hidden="true"
    className="fixed bottom-3 right-4 z-30 print:hidden pointer-events-none select-none text-[11px] sm:text-xs font-medium text-slate-400/50 tracking-wide"
  >
    Powered by Faroush Development Group
  </div>
</div>
  );
}
