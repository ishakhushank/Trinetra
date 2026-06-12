export type DifficultyType = 'Easy' | 'Medium' | 'Hard';

export interface EvidenceFile {
  name: string;
  size: string;
  type: 'CSV' | 'XLSX' | 'TXT' | 'LOG' | 'ZIP';
  description: string;
  category: 'CDR' | 'IPDR';
}

export interface InvestigationQuestion {
  id: string;
  question: string;
  hint: string;
  sampleAnswer?: string; // Correct answer or expected response for simulation
  correctKeywords?: string[]; // Keywords to validate correctness (case-insensitive)
  solutionText?: string; // The beautiful exact answer displayed in the solution key
}

export interface CaseStudy {
  id: string;
  category: 'cdr' | 'ipdr';
  title: string;
  shortDescription: string;
  difficulty: DifficultyType;
  summary: string;
  backgroundStory: string;
  objective: string;
  evidenceFiles: EvidenceFile[];
  investigationQuestions: InvestigationQuestion[];
}

export interface UserNote {
  caseId: string;
  text: string;
  lastUpdated: string;
}

export interface SubmittedAnswer {
  caseId: string;
  questionId: string;
  answerText: string;
  isCorrect?: boolean;
  checkedAt?: string;
}
