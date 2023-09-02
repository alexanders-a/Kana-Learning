import { KanaSymbol } from "../types/types";

export function shuffleArray(array: KanaSymbol[]) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export const shuffleArrayOptions = (array: string[]) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export const getRankColor = (progress: number ) => {
  if (progress >= 99) {
    return "#C53030"; // Rank S
  } else if (progress >= 70) {
    return "#6B46C1"; // Rank A
  } else if (progress >= 50) {
    return "#B7791F"; // Rank B
  } else if (progress >= 20) {
    return "#2C7A7B"; // Rank C
  } else if (progress > 5) {
    return "#4299E1"; // Rank D
  } else {
    return "gray.300"; // Rank F
  }
};

export const getRandomUniqueIndex = (currentIndex: number, symbolCount: number) => {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * symbolCount);
  } while (newIndex === currentIndex);
  return newIndex;
};