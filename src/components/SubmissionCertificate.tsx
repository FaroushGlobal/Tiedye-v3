import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ReflectionSubmission } from '../types';
import { ShirtVisualizer } from './ShirtVisualizer';
import { Award, Printer, Copy, Check, ArrowLeft, Star, School, GraduationCap, Calendar, Building2 } from 'lucide-react';

interface SubmissionCertificateProps {
  submission: ReflectionSubmission;
  onReset: () => void;
  onViewRoster?: () => void;
}

export const SubmissionCertificate: React.FC<SubmissionCertificateProps> = ({
  submission,
  onReset,
}) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0ea5e9', '#ec4899', '#eab308', '#8b5cf6', '#10b981'],
      });
    } catch {
      // ignore
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    let summaryText = `Tie-Dye Activity Reflection\n`;
    summaryText += `School: ${submission.schoolName || 'STEAM School'}\n`;
    summaryText += `Teacher: ${submission.teacherName}\n`;
    summaryText += `Grade: ${submission.gradeLevel} (${submission.gradeBand})\n`;
    summaryText += `Rating: ${submission.rating} / 5 Stars\n`;
    summaryText += `Shirt Pattern: ${submission.shirt.pattern}\n\n`;

    if (submission.gradeBand === 'TK-2nd' && submission.tk2Data) {
      summaryText += `After it was rinsed, my shirt looked: ${submission.tk2Data.appearance}\n`;
      if (submission.tk2Data.favoriteColorUsed) {
        summaryText += `Favorite color used: ${submission.tk2Data.favoriteColorUsed}\n`;
      }
      if (submission.tk2Data.extraNotes) {
        summaryText += `Note: ${submission.tk2Data.extraNotes}\n`;
      }
    } else if (submission.gradeBand === '3rd-6th' && submission.grade36Data) {
      summaryText += `How math helped plan design: ${submission.grade36Data.mathPlanningExplanation}\n`;
      summaryText += `After it was rinsed, my shirt looked: ${submission.grade36Data.shirtAppearance}\n`;
    } else if (submission.gradeBand === '7th-12th' && submission.grade712Data) {
      summaryText += `Color retention science: ${submission.grade712Data.colorRetentionScience}\n`;
      summaryText += `Geometry & symmetry: ${submission.grade712Data.geometrySymmetryExplanation}\n`;
      summaryText += `Next iteration change: ${submission.grade712Data.engineeringChange}\n`;
    }

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const formattedDate = new Date(submission.timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top action toolbar (hidden during print) */}
      <div className="print:hidden flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Fill Another Reflection
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Summary</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-black hover:bg-slate-800 px-3.5 py-2 rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Print Certificate</span>
          </button>
        </div>
      </div>

      {/* Formspree submission status notice */}
      {submission.formspreeStatus === 'sent' && (
        <div className="print:hidden flex items-center justify-center gap-2 py-2 px-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium rounded-xl shadow-xs">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Information was sent directly to Formspree and recorded in your teacher roster.</span>
        </div>
      )}

      {/* The Printable Certificate Container */}
      <div className="bg-white rounded-3xl border-4 border-slate-300 p-6 sm:p-10 shadow-lg relative overflow-hidden print:border-2 print:shadow-none print:m-0 print:p-6">
        {/* Certificate Decorative Border */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-black" />

        {/* Certificate Header */}
        <div className="text-center pb-6 border-b border-slate-200">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-black text-white mb-3 shadow-xs">
            <Award className="w-7 h-7" />
          </div>
          <span className="block text-xs font-bold uppercase tracking-widest text-black mb-1">
            Official STEAM Reflection
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Tie-Dye Activity Reflection Certificate
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Awarded for thoughtful scientific reflection, design engineering, and hands-on discovery.
          </p>
        </div>

        {/* School & Class Attribution */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-b border-slate-100 text-xs">
          <div>
            <span className="text-slate-500 font-medium block text-[11px]">SCHOOL NAME</span>
            <span className="font-bold text-slate-900 text-sm flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-black inline shrink-0" />
              <span className="truncate">{submission.schoolName || 'STEAM School'}</span>
            </span>
          </div>

          <div>
            <span className="text-slate-500 font-medium block text-[11px]">AFTER-SCHOOL TEACHER</span>
            <span className="font-bold text-slate-900 text-sm flex items-center gap-1">
              <School className="w-3.5 h-3.5 text-black inline shrink-0" />
              <span className="truncate">{submission.teacherName}</span>
            </span>
          </div>

          <div>
            <span className="text-slate-500 font-medium block text-[11px]">GRADE LEVEL</span>
            <span className="font-bold text-slate-900 text-sm flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-black inline shrink-0" />
              <span>{submission.gradeLevel} ({submission.gradeBand})</span>
            </span>
          </div>

          <div>
            <span className="text-slate-500 font-medium block text-[11px]">COMPLETION DATE</span>
            <span className="font-bold text-slate-900 text-sm flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-black inline shrink-0" />
              <span>{formattedDate}</span>
            </span>
          </div>
        </div>

        {/* Main Content Split: Questions & Shirt Visual */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-b border-slate-100">
          {/* Answers Column (2/3) */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Reflection Observations & Scientific Inquiry
            </h3>

            {/* TK-2nd Answers */}
            {submission.gradeBand === 'TK-2nd' && submission.tk2Data && (
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-xs font-semibold text-slate-600 mb-1">
                    After it was rinsed, my shirt looked:
                  </p>
                  <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    {submission.tk2Data.appearance}
                  </p>
                </div>

                {submission.tk2Data.favoriteColorUsed && (
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-xs font-semibold text-slate-600 mb-1">Favorite colors used:</p>
                    <p className="text-sm font-medium text-slate-900">
                      {submission.tk2Data.favoriteColorUsed}
                    </p>
                  </div>
                )}

                {submission.tk2Data.extraNotes && (
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-xs font-semibold text-slate-600 mb-1">Favorite moment:</p>
                    <p className="text-sm text-slate-800 italic">"{submission.tk2Data.extraNotes}"</p>
                  </div>
                )}
              </div>
            )}

            {/* Grade 3rd-6th Answers */}
            {submission.gradeBand === '3rd-6th' && submission.grade36Data && (
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-xs font-semibold text-slate-600 mb-1">
                    How math helped plan the design:
                  </p>
                  <p className="text-xs sm:text-sm text-slate-900 leading-relaxed">
                    {submission.grade36Data.mathPlanningExplanation}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-xs font-semibold text-slate-600 mb-1">
                    After it was rinsed, my shirt looked:
                  </p>
                  <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-500" />
                    {submission.grade36Data.shirtAppearance}
                  </p>
                </div>
              </div>
            )}

            {/* Grade 7th-12th Answers */}
            {submission.gradeBand === '7th-12th' && submission.grade712Data && (
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-xs font-semibold text-slate-600 mb-1">
                    Why the color stays in the fabric after rinsing:
                  </p>
                  <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-medium">
                    {submission.grade712Data.colorRetentionScience}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-xs font-semibold text-slate-600 mb-1">
                    Geometry & symmetry in design:
                  </p>
                  <p className="text-xs sm:text-sm text-slate-900 leading-relaxed">
                    {submission.grade712Data.geometrySymmetryExplanation}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-xs font-semibold text-slate-600 mb-1">
                    Engineering iteration / Next time change:
                  </p>
                  <p className="text-xs sm:text-sm text-slate-900 leading-relaxed italic">
                    "{submission.grade712Data.engineeringChange}"
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Shirt Visual Column (1/3) */}
          <div className="flex flex-col items-center justify-center p-4 bg-slate-50/80 rounded-2xl border border-slate-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              Virtual Shirt Record
            </span>
            <ShirtVisualizer shirt={submission.shirt} readOnly={true} size="md" />
            <p className="text-xs font-medium text-slate-700 mt-2 text-center capitalize">
              {submission.shirt.pattern} Technique
            </p>
          </div>
        </div>

        {/* Certificate Footer with Overall Enjoyment Rating */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-700">Overall Activity Rating:</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-5 h-5 ${
                    s <= submission.rating
                      ? 'fill-amber-400 text-amber-500'
                      : 'text-slate-200 fill-slate-100'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-900 ml-1">
              {submission.rating} / 5 Stars
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-500 print:text-black">
            <div>
              <span className="block font-semibold text-slate-800">Verified By Teacher</span>
              <span className="border-t border-slate-300 block w-28 mt-2" />
            </div>
            <div>
              <span className="block font-semibold text-slate-800">Student Signature</span>
              <span className="border-t border-slate-300 block w-28 mt-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
