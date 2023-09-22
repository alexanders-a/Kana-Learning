import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KanaSymbol, KanaType, KanaTypeCategoty } from "../../types/types";

interface KanaState {
  selectedKanaType: KanaType;
  selectedSymbols: KanaSymbol[];
  selectedCategory: KanaTypeCategoty;
}

const initialState: KanaState = {
  selectedKanaType: KanaType.Hiragana,
  selectedSymbols: JSON.parse(localStorage.getItem("selectedSymbols") || "[]"),
  selectedCategory: KanaTypeCategoty.Base,
};

const kanaSlice = createSlice({
  name: "kana",
  initialState,
  reducers: {
    setKanaType: (state, action: PayloadAction<KanaType>) => {
      state.selectedKanaType = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<KanaTypeCategoty>) => {
      state.selectedCategory = action.payload;
    },
    addSelectedSymbol: (state, action: PayloadAction<KanaSymbol>) => {
      state.selectedSymbols.push(action.payload);
    },
    setSelectedSymbols: (state, action: PayloadAction<KanaSymbol[]>) => {
      state.selectedSymbols = action.payload;
    },
    removeSelectedSymbol: (state, action: PayloadAction<string>) => {
      state.selectedSymbols = state.selectedSymbols.filter(
        (symbol) => symbol.symbol !== action.payload
      );
    },
    clearSelectedSymbols: (state) => {
      state.selectedSymbols = [];
    },
  },
});

export const {
  setKanaType,
  setSelectedSymbols,
  setSelectedCategory,
  addSelectedSymbol,
  removeSelectedSymbol,
  clearSelectedSymbols,
} = kanaSlice.actions;
export default kanaSlice.reducer;
