import { create } from "zustand";

interface InterviewState {
  questions: JSON[];
  setQuestions: (questions: JSON[]) => void;
  clearQuestions: () => void;
}

export const useInterviewStore = create<InterviewState>((set) => ({
  questions: [],
  setQuestions: (questions) => set({ questions }),
  clearQuestions: () => set({ questions: [] }),
}));
