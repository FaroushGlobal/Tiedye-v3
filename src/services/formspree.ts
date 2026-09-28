import { ReflectionSubmission } from '../types';

export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mqpabndl';

export interface FormspreeResponse {
  ok: boolean;
  error?: string;
}

export async function sendToFormspree(submission: ReflectionSubmission): Promise<FormspreeResponse> {
  const payload: Record<string, unknown> = {
    _subject: `Tie-Dye Reflection: ${submission.schoolName} - ${submission.teacherName} (${submission.gradeLevel})`,
    schoolName: submission.schoolName,
    afterSchoolTeacher: submission.teacherName,
    gradeLevel: submission.gradeLevel,
    gradeBand: submission.gradeBand,
    tieDyePatternChosen: submission.shirt.pattern,
    primaryColor: submission.shirt.primaryColor,
    secondaryColor: submission.shirt.secondaryColor,
    accentColor: submission.shirt.accentColor,
    activityRating: `${submission.rating} out of 5 stars`,
    submittedTimestamp: submission.timestamp,
    submissionDate: new Date(submission.timestamp).toLocaleString(),
  };

  if (submission.gradeBand === 'TK-2nd' && submission.tk2Data) {
    payload.question_afterRinsedAppearance = submission.tk2Data.appearance;
    if (submission.tk2Data.favoriteColorUsed) {
      payload.question_favoriteColor = submission.tk2Data.favoriteColorUsed;
    }
    if (submission.tk2Data.extraNotes) {
      payload.question_favoriteMoment = submission.tk2Data.extraNotes;
    }
  } else if (submission.gradeBand === '3rd-6th' && submission.grade36Data) {
    payload.question_mathPlanningExplanation = submission.grade36Data.mathPlanningExplanation;
    payload.question_afterRinsedAppearance = submission.grade36Data.shirtAppearance;
  } else if (submission.gradeBand === '7th-12th' && submission.grade712Data) {
    payload.question_colorRetentionScience = submission.grade712Data.colorRetentionScience;
    payload.question_geometrySymmetry = submission.grade712Data.geometrySymmetryExplanation;
    payload.question_engineeringChange = submission.grade712Data.engineeringChange;
  }

  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      return { ok: true };
    }

    const data = await res.json().catch(() => ({}));
    return {
      ok: false,
      error: data?.error || `Submission failed with status ${res.status}`,
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Network request failed',
    };
  }
}
