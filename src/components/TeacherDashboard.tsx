import React, { useState } from 'react';
import { ReflectionSubmission, GradeBand } from '../types';
import { ShirtVisualizer } from './ShirtVisualizer';
import {
  Download,
  Filter,
  Search,
  Star,
  Eye,
  School,
  Sparkles,
  Users,
  CheckCircle2,
  TrendingUp,
  Building2,
} from 'lucide-react';

interface TeacherDashboardProps {
  submissions: ReflectionSubmission[];
  onSelectSubmission: (submission: ReflectionSubmission) => void;
  onNewReflection: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  submissions,
  onSelectSubmission,
  onNewReflection,
}) => {
  const [bandFilter, setBandFilter] = useState<'ALL' | GradeBand>('ALL');
  const [teacherFilter, setTeacherFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique teacher names
  const uniqueTeachers = Array.from(new Set(submissions.map((s) => s.teacherName))).filter(Boolean);

  // Filtered submissions
  const filtered = submissions.filter((item) => {
    const matchesBand = bandFilter === 'ALL' || item.gradeBand === bandFilter;
    const matchesTeacher = teacherFilter === 'ALL' || item.teacherName === teacherFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.gradeLevel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBand && matchesTeacher && matchesSearch;
  });

  // Calculate statistics
  const totalCount = submissions.length;
  const avgRating =
    totalCount > 0
      ? (submissions.reduce((acc, curr) => acc + curr.rating, 0) / totalCount).toFixed(1)
      : '0.0';

  const fiveStarCount = submissions.filter((s) => s.rating === 5).length;
  const percentFiveStar = totalCount > 0 ? Math.round((fiveStarCount / totalCount) * 100) : 0;

  // Pattern tally
  const patternCounts: Record<string, number> = {};
  submissions.forEach((s) => {
    patternCounts[s.shirt.pattern] = (patternCounts[s.shirt.pattern] || 0) + 1;
  });
  const topPattern =
    Object.entries(patternCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'spiral';

  const handleExportCSV = () => {
    const headers = [
      'ID',
      'Timestamp',
      'School Name',
      'Teacher Name',
      'Grade Level',
      'Grade Band',
      'Rating (out of 5)',
      'Shirt Pattern',
      'Key Responses / Summary',
    ];

    const rows = filtered.map((s) => {
      let keyResponses = '';
      if (s.gradeBand === 'TK-2nd' && s.tk2Data) {
        keyResponses = `Appearance: ${s.tk2Data.appearance}. Note: ${s.tk2Data.extraNotes || 'N/A'}`;
      } else if (s.gradeBand === '3rd-6th' && s.grade36Data) {
        keyResponses = `Math: ${s.grade36Data.mathPlanningExplanation} | Appearance: ${s.grade36Data.shirtAppearance}`;
      } else if (s.gradeBand === '7th-12th' && s.grade712Data) {
        keyResponses = `Science: ${s.grade712Data.colorRetentionScience} | Geometry: ${s.grade712Data.geometrySymmetryExplanation} | Next: ${s.grade712Data.engineeringChange}`;
      }

      return [
        `"${s.id}"`,
        `"${new Date(s.timestamp).toLocaleDateString()}"`,
        `"${(s.schoolName || '').replace(/"/g, '""')}"`,
        `"${(s.teacherName || '').replace(/"/g, '""')}"`,
        `"${(s.gradeLevel || '').replace(/"/g, '""')}"`,
        `"${s.gradeBand}"`,
        `"${s.rating}"`,
        `"${s.shirt.pattern}"`,
        `"${keyResponses.replace(/"/g, '""')}"`,
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Tie_Dye_Reflections_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Stats */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
              <School className="w-4 h-4" />
              <span>After-School Program Insights</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Tie-Dye Activity Reflection Roster
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Review reflection entries, download reports, and track engagement across schools and grade groups.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              type="button"
              onClick={onNewReflection}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>New Reflection</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 pt-5">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
              <span>Total Reflections</span>
              <Users className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
              {totalCount}
            </div>
            <p className="text-[11px] text-slate-600 mt-0.5">Across TK-2nd, 3rd-6th & 7th-12th</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
              <span>Average Rating</span>
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 tabular-nums flex items-baseline gap-1">
              <span>{avgRating}</span>
              <span className="text-xs font-semibold text-slate-500">/ 5.0</span>
            </div>
            <p className="text-[11px] text-emerald-700 mt-0.5 font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3 inline" /> High Student Engagement
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
              <span>5-Star Joy Rate</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
              {percentFiveStar}%
            </div>
            <p className="text-[11px] text-slate-600 mt-0.5">{fiveStarCount} perfect scores</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
              <span>Favorite Technique</span>
              <Sparkles className="w-4 h-4 text-pink-500" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 capitalize truncate">
              {topPattern}
            </div>
            <p className="text-[11px] text-slate-600 mt-0.5">Most common kit fold</p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Grade band segmented tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg w-full md:w-auto">
          {(['ALL', 'TK-2nd', '3rd-6th', '7th-12th'] as const).map((band) => (
            <button
              key={band}
              type="button"
              onClick={() => setBandFilter(band)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                bandFilter === band
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {band === 'ALL' ? 'All Groups' : band}
            </button>
          ))}
        </div>

        {/* Teacher filter and text search */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={teacherFilter}
              onChange={(e) => setTeacherFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="ALL">All After-school Teachers</option>
              {uniqueTeachers.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="relative flex-1 md:w-56">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search school, teacher, grade..."
              className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-slate-50"
            />
          </div>
        </div>
      </div>

      {/* Roster Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">School</th>
                <th className="py-3 px-4">After-school Teacher</th>
                <th className="py-3 px-4">Grade & Band</th>
                <th className="py-3 px-4">Rating (1-5)</th>
                <th className="py-3 px-4">Shirt Style</th>
                <th className="py-3 px-4">Key Insight / Answer</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    No reflections found matching your criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((sub) => {
                  let keySummary = '';
                  if (sub.gradeBand === 'TK-2nd') {
                    keySummary = `Looks: "${sub.tk2Data?.appearance || 'Completed'}"`;
                  } else if (sub.gradeBand === '3rd-6th') {
                    keySummary = sub.grade36Data?.shirtAppearance
                      ? `Looks: "${sub.grade36Data.shirtAppearance}"`
                      : 'Completed';
                  } else {
                    keySummary = sub.grade712Data?.colorRetentionScience
                      ? `Science: ${sub.grade712Data.colorRetentionScience.slice(0, 60)}...`
                      : 'Completed';
                  }

                  return (
                    <tr key={sub.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-indigo-500 inline shrink-0" />
                        <span>{sub.schoolName || 'School'}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-700">{sub.teacherName}</td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-slate-900">{sub.gradeLevel}</span>
                        <span className="text-slate-600 block text-[11px] font-semibold">{sub.gradeBand}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                          <span className="font-bold text-slate-900 tabular-nums">
                            {sub.rating}
                          </span>
                          <span className="text-slate-500 text-[10px]">/ 5</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 capitalize text-slate-700">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-3 h-3 rounded-full border border-slate-300 shrink-0"
                            style={{ backgroundColor: sub.shirt.primaryColor }}
                          />
                          <span>{sub.shirt.pattern}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600 max-w-xs truncate" title={keySummary}>
                        {keySummary}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => onSelectSubmission(sub)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Certificate</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
