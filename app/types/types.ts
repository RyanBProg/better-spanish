export type DataType = {
  word: string;
  correctAnswer: string;
};

export type TVerb = {
  prefix?: string | string[];
  spanish: string;
  english: string;
  type?: string;
};

export type Verb = {
  english: string;
  spanish: string;
  present: TVerb[];
  past: TVerb[];
  future: TVerb[];
  gerund: TVerb;
};
