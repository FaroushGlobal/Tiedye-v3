import React from 'react';
import { GradeBand, StudentProfile } from '../types';
import { Sparkles, Compass, Atom, School, GraduationCap, Building2 } from 'lucide-react';

interface GradeBandSelectorProps {
  selectedBand: GradeBand;
  onSelectBand: (band: GradeBand) => void;
  profile: StudentProfile;
  onProfileChange: (profile: StudentProfile) => void;
}

const BANDS: {
  id: GradeBand;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  activeRing: string;
}[] = [
  {
    id: 'TK-2nd',
    label: 'TK-2nd',
    icon: Sparkles,
    activeRing: 'border-black bg-slate-100 ring-2 ring-black text-black',
  },
  {
    id: '3rd-6th',
    label: '3rd-6th',
    icon: Compass,
    activeRing: 'border-black bg-slate-100 ring-2 ring-black text-black',
  },
  {
    id: '7th-12th',
    label: '7th-12th',
    icon: Atom,
    activeRing: 'border-black bg-slate-100 ring-2 ring-black text-black',
  },
];

export const GradeBandSelector: React.FC<GradeBandSelectorProps> = ({
  selectedBand,
  onSelectBand,
  profile,
  onProfileChange,
}) => {
  const handleProfileField = (field: keyof StudentProfile, value: string) => {
    onProfileChange({ ...profile, [field]: value });
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-6">
      {/* Step 1: Grade Level Selection */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-black">
              Step 1 · Grade Level Selection
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
              Select Your Grade Level
            </h2>
          </div>
          <span className="text-xs text-slate-500">Required *</span>
        </div>

        {/* 3 Clean Grade Buttons with NO sub-explanation */}
        <div className="grid grid-cols-3 gap-3">
          {BANDS.map((band) => {
            const isSelected = selectedBand === band.id;
            const IconComponent = band.icon;

            return (
              <button
                key={band.id}
                type="button"
                onClick={() => onSelectBand(band.id)}
                className={`flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl border-2 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 ${
                  isSelected
                    ? `${band.activeRing} shadow-xs font-bold`
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/60 hover:bg-slate-50 text-slate-700 font-semibold'
                }`}
                aria-pressed={isSelected}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-colors ${
                    isSelected
                      ? 'bg-black text-white'
                      : 'bg-white border border-slate-200 text-slate-600'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className="text-base sm:text-lg font-bold">{band.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* Step 2: Classroom Information in requested order */}
      <div>
        <div className="mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-black">
            Step 2 · Classroom Information
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
            Class Details
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Field 1: What's your school name? (Comes first) */}
          <div className="space-y-1.5">
            <label htmlFor="school-input" className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-black" />
              <span>What's your school name?</span>
              <span className="text-rose-500 text-xs">*</span>
            </label>
            <input
              id="school-input"
              type="text"
              value={profile.schoolName}
              onChange={(e) => handleProfileField('schoolName', e.target.value)}
              placeholder="e.g., Lincoln Elementary School"
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-black bg-slate-50/50"
              required
            />
          </div>

          {/* Field 2: Who is your After-school Teacher? (Comes after school name) */}
          <div className="space-y-1.5">
            <label htmlFor="teacher-input" className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
              <School className="w-3.5 h-3.5 text-black" />
              <span>Who is your After-school Teacher?</span>
              <span className="text-rose-500 text-xs">*</span>
            </label>
            <input
              id="teacher-input"
              type="text"
              value={profile.teacherName}
              onChange={(e) => handleProfileField('teacherName', e.target.value)}
              placeholder="e.g., Ms. Rivera"
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-black bg-slate-50/50"
              required
            />
          </div>

          {/* Field 3: What Grade are you in? */}
          <div className="space-y-1.5">
            <label htmlFor="grade-input" className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-black" />
              <span>What Grade are you in?</span>
              <span className="text-rose-500 text-xs">*</span>
            </label>
            <input
              id="grade-input"
              type="text"
              value={profile.gradeLevel}
              onChange={(e) => handleProfileField('gradeLevel', e.target.value)}
              placeholder="e.g., 4th Grade"
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-black bg-slate-50/50"
              required
            />
          </div>
        </div>
      </div>
    </section>
  );
};
