import jeongcheogiTheory from '../data/jeongcheogi/theory.json';
import jeongcheogiPast from '../data/jeongcheogi/past.json';
import sqldData from '../data/sqld.json';

import { ExamQuestion, ExamQuestionSet } from '../types/question';
import { ContentCategory, ExamType, EXAM_TYPES, SUBJECT_TYPES } from '../types/exam';

type RawQuestion = Partial<ExamQuestion> & Record<string, unknown>;

const isString = (value: unknown): value is string => typeof value === 'string';
const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string');
const isNumber = (value: unknown): value is number => typeof value === 'number';

const isValidCategory = (value: unknown): value is ContentCategory =>
  value === 'theory' || value === 'past' || value === 'ox' || value === 'wrong';

const isValidExamType = (value: unknown): value is ExamType =>
  EXAM_TYPES.includes(value as ExamType);

const isValidSubject = (value: unknown): boolean =>
  typeof value === 'string' && SUBJECT_TYPES.includes(value as any);

export const isExamQuestion = (item: RawQuestion): item is ExamQuestion => {
  return (
    isString(item.id) &&
    isValidCategory(item.category) &&
    isValidExamType(item.exam_type) &&
    isValidSubject(item.subject) &&
    isString(item.question) &&
    Array.isArray(item.options) &&
    isStringArray(item.options) &&
    item.options.length === 4 &&
    isNumber(item.answer_idx) &&
    item.answer_idx >= 0 &&
    item.answer_idx < item.options.length &&
    isString(item.explanation) &&
    (item.codeSnippet === undefined || isString(item.codeSnippet)) &&
    (item.latex === undefined || isString(item.latex))
  );
};

const sanitizeQuestions = (items: unknown[], sourceName: string): ExamQuestion[] => {
  const validItems = items.filter(
    (item): item is RawQuestion => typeof item === 'object' && item !== null
  );

  const parsed = validItems.filter(isExamQuestion);

  if (parsed.length !== items.length) {
    console.warn(
      `[dataLoader] ${sourceName}: ${items.length - parsed.length}개의 잘못된 문항이 제외되었습니다.`
    );
  }

  return parsed;
};

const RAW_DATASETS: Record<
  ExamType,
  { theory?: unknown[]; past?: unknown[]; all?: unknown[] }
> = {
  jeongcheogi: {
    theory: jeongcheogiTheory as unknown[],
    past: jeongcheogiPast as unknown[],
  },
  sqld: {
    all: sqldData as unknown[],
  },
};

const buildQuestionSet = (examType: ExamType): ExamQuestionSet => {
  const source = RAW_DATASETS[examType];

  if (source.all) {
    const allQuestions = sanitizeQuestions(source.all, `${examType}.all`);
    return {
      examType,
      theory: allQuestions.filter((q) => q.category === 'theory'),
      past: allQuestions.filter((q) => q.category === 'past'),
    };
  }

  const theory = sanitizeQuestions(source.theory ?? [], `${examType}.theory`);
  const past = sanitizeQuestions(source.past ?? [], `${examType}.past`);

  return {
    examType,
    theory,
    past,
  };
};

const DATA_REGISTRY: Record<ExamType, ExamQuestionSet> = {
  jeongcheogi: buildQuestionSet('jeongcheogi'),
  sqld: buildQuestionSet('sqld'),
};

export const loadExamData = (
  examType: ExamType,
  category: 'theory' | 'past'
): ExamQuestion[] => {
  return DATA_REGISTRY[examType]?.[category] ?? [];
};

export const loadAllExamData = (examType: ExamType): ExamQuestionSet => {
  return DATA_REGISTRY[examType];
};
