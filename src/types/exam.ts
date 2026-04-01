export const EXAM_TYPES = ['jeongcheogi', 'sqld'] as const;
export type ExamType = (typeof EXAM_TYPES)[number];

export const CONTENT_CATEGORIES = ['theory', 'past', 'ox', 'wrong'] as const;
export type ContentCategory = (typeof CONTENT_CATEGORIES)[number];

export const SUBJECT_TYPES = [
  'softwareDesign',
  'softwareDevelopment',
  'database',
  'programmingLanguage',
  'informationSystem',
  'sqld1',
  'sqld2',
] as const;

export type SubjectType = (typeof SUBJECT_TYPES)[number];
