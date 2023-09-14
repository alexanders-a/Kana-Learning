import { useSelector } from "react-redux";
import { RootState } from "../types/types";
import hiraganaData from "../data/hiragana.json";
import katakanaData from "../data/katakana.json";
import dakuonHiragana from "../data/dakuonHiragana.json";
import dakuonKatakana from "../data/dakuonKatakana.json";

const useData = () => {
  const selectedCategory = useSelector(
    (state: RootState) => state.kana.selectedCategory
  );
  const selectedKanaType = useSelector(
    (state: RootState) => state.kana.selectedKanaType
  );

  if (selectedKanaType === "hiragana") {
    if (selectedCategory === "Dakuon") {
      return dakuonHiragana;
    } else {
      return hiraganaData;
    }
  } else if (selectedKanaType === "katakana") {
    if (selectedCategory === "Dakuon") {
      return dakuonKatakana;
    } else {
      return katakanaData;
    }
  }

  return [];
};

export default useData;
