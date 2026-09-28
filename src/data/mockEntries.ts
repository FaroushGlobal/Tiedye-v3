import { ReflectionSubmission } from '../types';

export const INITIAL_SUBMISSIONS: ReflectionSubmission[] = [
  {
    id: 'steam-sub-1',
    timestamp: '2026-09-23T11:15:00.000Z',
    gradeBand: 'TK-2nd',
    schoolName: 'Sunnyvale Primary School',
    teacherName: 'Ms. Rivera',
    gradeLevel: '1st Grade',
    rating: 5,
    shirt: {
      pattern: 'spiral',
      primaryColor: '#0ea5e9',
      secondaryColor: '#ec4899',
      accentColor: '#eab308',
    },
    tk2Data: {
      appearance: 'Super surprising!',
      rating: 5,
      favoriteColorUsed: 'Bright Pink & Ocean Blue',
      extraNotes: 'The colors swirled around like a galaxy when I rinsed it in the sink!'
    }
  },
  {
    id: 'steam-sub-2',
    timestamp: '2026-09-23T11:42:00.000Z',
    gradeBand: '3rd-6th',
    schoolName: 'Oakridge Elementary School',
    teacherName: 'Mr. Davis',
    gradeLevel: '4th Grade',
    rating: 5,
    shirt: {
      pattern: 'bullseye',
      primaryColor: '#8b5cf6',
      secondaryColor: '#06b6d4',
      accentColor: '#10b981',
    },
    grade36Data: {
      shirtAppearance: 'Different, but I like it!',
      mathPlanningExplanation: 'I used rubber bands to divide the shirt into 4 equal concentric rings. Measuring 2 inches between bands helped keep the rings evenly spaced.',
      rating: 5
    }
  },
  {
    id: 'steam-sub-3',
    timestamp: '2026-09-23T12:05:00.000Z',
    gradeBand: '7th-12th',
    schoolName: 'Crestview High School',
    teacherName: 'Dr. Albright',
    gradeLevel: '9th Grade',
    rating: 4,
    shirt: {
      pattern: 'freeform',
      primaryColor: '#f97316',
      secondaryColor: '#6366f1',
      accentColor: '#14b8a6',
    },
    grade712Data: {
      colorRetentionScience: 'The fiber-reactive dye forms a permanent covalent bond with the cellulose molecules in the cotton fiber through an alkaline reaction with soda ash.',
      geometrySymmetryExplanation: 'I folded the fabric along 8 radial axes (45-degree angle increments) to create 8-fold rotational symmetry emanating from the center node.',
      engineeringChange: 'Next time I will increase saturation near the folded seams so there is less un-dyed white negative space between folds.',
      rating: 4
    }
  },
  {
    id: 'steam-sub-4',
    timestamp: '2026-09-23T12:30:00.000Z',
    gradeBand: 'TK-2nd',
    schoolName: 'Sunnyvale Primary School',
    teacherName: 'Ms. Rivera',
    gradeLevel: 'Kindergarten',
    rating: 5,
    shirt: {
      pattern: 'freeform',
      primaryColor: '#f43f5e',
      secondaryColor: '#3b82f6',
      accentColor: '#84cc16',
    },
    tk2Data: {
      appearance: 'Just like I thought!',
      rating: 5,
      favoriteColorUsed: 'Red and Green',
      extraNotes: 'I squeezed the bottles with my teacher helping.'
    }
  },
  {
    id: 'steam-sub-5',
    timestamp: '2026-09-23T13:00:00.000Z',
    gradeBand: '3rd-6th',
    schoolName: 'Pinecrest Elementary School',
    teacherName: 'Coach Marcus',
    gradeLevel: '5th Grade',
    rating: 4,
    shirt: {
      pattern: 'accordion',
      primaryColor: '#3b82f6',
      secondaryColor: '#f59e0b',
      accentColor: '#ec4899',
    },
    grade36Data: {
      shirtAppearance: 'Super surprising!',
      mathPlanningExplanation: 'I used accordion folds spaced 1 inch apart to create parallel stripes, then calculated how many color repeats I could fit on the shirt.',
      rating: 4
    }
  }
];
