import { configureStore } from "@reduxjs/toolkit";
import kanaSlice from "./features/kanaSlice";
import {
  KanaSymbol,
  KanaType,
  KanaTypeCategoty,
  RootState,
} from "../types/types";
import trainingSlice from "./features/trainingSlice";

const initialProgress = localStorage.getItem("kanaProgress");

const initialProgressData: KanaSymbol[] = initialProgress
  ? JSON.parse(initialProgress)
  : [];

const initialRootState: RootState = {
  kana: {
    selectedKanaType: KanaType.Hiragana,
    selectedSymbols: initialProgressData,
    selectedCategory: KanaTypeCategoty.Base,
  },
  training: {
    questions: [],
    options: [],
    isCorrect: false,
    showAnswer: false,
    currentQuestionIndex: 0,
    inputValue: "",
  },
};

const store = configureStore({
  reducer: { kana: kanaSlice, training: trainingSlice },
  preloadedState: initialRootState,
});

export default store;
