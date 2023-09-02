import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KanaSymbol } from "../../types/types";

interface TrainingState {
  questions: KanaSymbol[];
  options: string[];
  isCorrect: boolean;
  showAnswer: boolean;
  currentQuestionIndex: number;
  inputValue: string;
}

const initialState: TrainingState = {
  questions: [],
  options: [],
  isCorrect: false,
  showAnswer: false,
  currentQuestionIndex: 0,
  inputValue: "",
};

const trainingSlice = createSlice({
  name: "training",
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<KanaSymbol[]>) => {
      state.questions = action.payload;
    },
    setOptions: (state, action: PayloadAction<string[]>) => {
      state.options = action.payload;
    },
    setIsCorrect: (state, action: PayloadAction<boolean>) => {
      state.isCorrect = action.payload;
    },
    setShowAnswer: (state, action: PayloadAction<boolean>) => {
      state.showAnswer = action.payload;
    },
    setCurrentQuestionIndex: (state, action: PayloadAction<number>) => {
      state.currentQuestionIndex = action.payload;
    },
    setInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
  },
});

export const {
  setQuestions,
  setOptions,
  setIsCorrect,
  setShowAnswer,
  setCurrentQuestionIndex,
  setInputValue,
} = trainingSlice.actions;
export default trainingSlice.reducer;
