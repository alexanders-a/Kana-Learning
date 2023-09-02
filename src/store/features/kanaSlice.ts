import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KanaSymbol, KanaType, KanaTypeCategoty } from "../../types/types";

interface KanaState {
  symbols: KanaSymbol[];
  selectedKanaType: KanaType;
  selectedSymbols: KanaSymbol[];
  selectedCategory: KanaTypeCategoty

}

const initialState: KanaState = {
  symbols: [],
  selectedKanaType: KanaType.Hiragana,
  selectedSymbols: [],
  selectedCategory: KanaTypeCategoty.Base,
};

const kanaSlice = createSlice({
  name: "kana",
  initialState,
  reducers: {
    setSymbols: (state, action: PayloadAction<KanaSymbol[]>) => {
      state.symbols = action.payload;
    },
    setKanaType: (state, action: PayloadAction<KanaType>) => {
      state.selectedKanaType = action.payload;
      state.symbols = [];
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
  setSymbols,
  setSelectedSymbols,
  setSelectedCategory,
  addSelectedSymbol,
  removeSelectedSymbol,
  clearSelectedSymbols,
} = kanaSlice.actions;
export default kanaSlice.reducer;
