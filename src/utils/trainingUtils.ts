export const getRankColor = (progress: number) => {
  if (progress >= 150) {
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

export const showRankUpdate = (
  progress: number,
  showRankUpdateToast: (rank: string) => void
) => {
  if (progress === 150) {
    showRankUpdateToast("Rank S");
  } else if (progress === 70) {
    showRankUpdateToast("Rank A");
  } else if (progress === 50) {
    showRankUpdateToast("Rank B");
  } else if (progress === 20) {
    showRankUpdateToast("Rank C");
  } else if (progress === 5) {
    showRankUpdateToast("Rank D");
  } else if (progress === 1) {
    showRankUpdateToast("Rank F");
  }
};

export const getRandomUniqueIndex = (
  currentIndex: number,
  symbolCount: number
) => {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * symbolCount);
  } while (newIndex === currentIndex);
  return newIndex;
};

export const handleKeyDown = (event: {
  key: string;
  preventDefault: () => void;
}) => {
  if (event.key === "Enter") {
    event.preventDefault();
  }
};

