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
