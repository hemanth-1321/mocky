import { create } from "zustand";

interface InterviewState {
  questions: JSON[];
  interviewId: string | null;
  setQuestions: (questions: JSON[]) => void;
  clearQuestions: () => void;
  setInterviewId: (id: string) => void;
  clearInterviewId: () => void;
}

export const useInterviewStore = create<InterviewState>((set) => ({
  questions: [],
  interviewId: null,
  setQuestions: (questions) => set({ questions }),
  clearQuestions: () => set({ questions: [] }),
  setInterviewId: (id) => set({ interviewId: id }),
  clearInterviewId: () => set({ interviewId: null }),
}));
