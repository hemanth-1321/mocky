interface Interview {
  id: string;
  role: string;
  level: string;
  questions: string[];
  techstack: string[];
  createdAt: string;
  userId: string;
  type: string;
  finalized: boolean;
}
interface Feedback {
  id: string;
  interviewId: string;
  totalScore: number;
  categoryScores: Array<{
    name: string;
    score: number;
    comment: string;
  }>;
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
  createdAt: string;
}
interface InterviewCardProps {
  interviewId?: string;
  userId?: string;
  role: string;
  type: string;
  techstack: string[];
  createdAt?: string;
}
interface Job {
  id: number;
  position: string;
  company: string;
  company_logo?: string;
  logo?: string;
  location: string;
  tags: string[];
  apply_url?: string;
  description?: string;
  url: string;
  date: Date;
  salary_min?: Int;
  salary_max?: Int;
}

interface SignUpParams {
  id?: string;
  name: string;
  email: string;
  password: string;
}

interface SignInParams {
  id?: string;
  email: string;
  password: string;
}
