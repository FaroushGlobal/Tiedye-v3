export type GradeBand = 'TK-2nd' | '3rd-6th' | '7th-12th';

export type ShirtAppearance = 'Just like I thought!' | 'Different, but I like it!' | 'Super surprising!';
export type TK2Appearance = ShirtAppearance;

export type ShirtPattern = 'spiral' | 'accordion' | 'bullseye' | 'freeform';

export interface StudentProfile {
  schoolName: string;
  teacherName: string;
  gradeLevel: string;
}

export interface TK2Reflection {
  appearance: ShirtAppearance | '';
  rating: number; // 1-5
  favoriteColorUsed?: string;
  extraNotes?: string;
}

export interface Grade36Reflection {
  shirtAppearance: ShirtAppearance | '';
  mathPlanningExplanation: string;
  rating: number; // 1-5
}

export interface Grade712Reflection {
  colorRetentionScience: string;
  geometrySymmetryExplanation: string;
  engineeringChange: string;
  rating: number; // 1-5
}

export interface ShirtCustomization {
  pattern: ShirtPattern;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export interface ReflectionSubmission {
  id: string;
  timestamp: string;
  gradeBand: GradeBand;
  schoolName: string;
  teacherName: string;
  gradeLevel: string;
  rating: number;
  shirt: ShirtCustomization;
  formspreeStatus?: 'sent' | 'failed' | 'offline';
  tk2Data?: TK2Reflection;
  grade36Data?: Grade36Reflection;
  grade712Data?: Grade712Reflection;
}
