import { ExamType } from '../types/exam';

export const EXAM_COLORS = {
  JEONGCHEOGI_PRIMARY: '#2563EB',
  JEONGCHEOGI_SECONDARY: '#93C5FD',
  JEONGCHEOGI_BACKGROUND: '#EFF6FF',

  SQLD_PRIMARY: '#003366',
  SQLD_SECONDARY: '#7FA6CC',
  SQLD_BACKGROUND: '#EEF4FA',
} as const;

export interface ExamTheme {
  label: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
}

export const EXAM_THEME_MAP: Record<ExamType, ExamTheme> = {
  jeongcheogi: {
    label: '정처기',
    primaryColor: EXAM_COLORS.JEONGCHEOGI_PRIMARY,
    secondaryColor: EXAM_COLORS.JEONGCHEOGI_SECONDARY,
    backgroundColor: EXAM_COLORS.JEONGCHEOGI_BACKGROUND,
  },
  sqld: {
    label: 'SQLD',
    primaryColor: EXAM_COLORS.SQLD_PRIMARY,
    secondaryColor: EXAM_COLORS.SQLD_SECONDARY,
    backgroundColor: EXAM_COLORS.SQLD_BACKGROUND,
  },
};
