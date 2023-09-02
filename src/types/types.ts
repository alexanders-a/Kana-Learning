export interface RootState {
  kana: {
    symbols: KanaSymbol[];
    selectedKanaType: KanaType.Hiragana | KanaType.Katakana;
    selectedSymbols: KanaSymbol[];
    selectedCategory: KanaTypeCategoty.Base | KanaTypeCategoty.Dakuon;
  };
  training: {
    questions: KanaSymbol[];
    options: string[];
    isCorrect: boolean;
    showAnswer: boolean;
    currentQuestionIndex: number;
    inputValue: string;
  };
}

export interface KanaSymbol {
  symbol: string;
  reading: string;
  progress?: number;
}

export enum KanaType {
  Hiragana = "hiragana",
  Katakana = "katakana",
}
export enum KanaTypeCategoty {
  Base = "Base",
  Dakuon = "Dakuon",
}
