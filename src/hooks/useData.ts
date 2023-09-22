import { useSelector } from "react-redux";
import { RootState } from "../types/types";
import db from "../data/db.json";

const useData = () => {
  const selectedCategory = useSelector(
    (state: RootState) => state.kana.selectedCategory
  );
  const selectedKanaType = useSelector(
    (state: RootState) => state.kana.selectedKanaType
  );

  if (selectedKanaType === "hiragana") {
    if (selectedCategory === "Dakuon") {
      return db.dakuonHiragana;
    } else {
      return db.hiragana;
    }
  } else if (selectedKanaType === "katakana") {
    if (selectedCategory === "Dakuon") {
      return db.dakuonKatakana;
    } else {
      return db.katakana;
    }
  }

  return [];
};

export default useData;
