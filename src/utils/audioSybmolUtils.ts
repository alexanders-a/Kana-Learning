import { ref, getDownloadURL } from "firebase/storage";
import { symbolMap } from "./isKatakanaSoundsUtils";
import { storage } from "../firebase/firebase";

export const playAudio = async (symbol: string) => {
  const mappedSymbol = symbolMap[symbol] || symbol;
  const audioPath = `sounds/${mappedSymbol}.mp3`;

  const storageRef = ref(storage, audioPath);

  try {
    const audioUrl = await getDownloadURL(storageRef);
    const audio = new Audio(audioUrl);
    audio.play();
  } catch (error) {
    console.error("error audio:", error);
  }
};
