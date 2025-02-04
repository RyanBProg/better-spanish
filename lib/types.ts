export type UserFlashcard = {
  id: number;
  userId: number;
  wordId: number;
  easeFactor: number;
  interval: number;
  streak: number;
  nextReview: Date;
};

export type Word = {
  id: number;
  spanish: string;
  english: string;
  category: string;
};

export type User = {
  id: number;
  kindeId: string;
  family_name: string;
  given_name: string;
  email: string;
  createdAt: Date;
};

export type UserFlashcardAnswer = {
  wordId: number;
  word: string;
  translation: string;
  rating: number;
};

export type BaseVerb = {
  id: number;
  spanish: string;
  english: string;
  gerundSpanish: string;
  gerundEnglish: string;
};

export type VerbConjugation = {
  verbId: number;
  verbData: VerbConjugationData[];
};

export type VerbConjugationData = {
  id: number;
  verbId: number;
  tense: string;
  type: string;
  prefix: string;
  spanish: string;
  english: string;
};
