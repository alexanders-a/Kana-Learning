import { symbolMap } from "./isKatakanaSoundsUtils";

export const playAudio = (symbol: string) => {
  const mappedSymbol = symbolMap[symbol] || symbol;
  const audioPath = require(`../sounds/${mappedSymbol}.mp3`);
  const audio = new Audio(audioPath);
  audio.play();
};