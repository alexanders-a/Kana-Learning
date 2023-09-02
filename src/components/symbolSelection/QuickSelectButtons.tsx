import { Button, Flex } from "@chakra-ui/react";
import { KanaTypeCategoty } from "../../types/types";

const QuickSelectButtons: React.FC<{
  sounds: string[];
  dakuon: string[];
  handleQuickSelect: (startsWith: string) => void;
  selectedCategory: KanaTypeCategoty;
}> = ({ sounds, dakuon, handleQuickSelect, selectedCategory }) => {
  const isDakuonCategory = selectedCategory === "Dakuon";

  return (
    <Flex wrap={"wrap"}>
      {sounds.map((char, index) => (
        <Button
          key={index}
          isDisabled={isDakuonCategory}
          onClick={() => handleQuickSelect(char)}
          m={1}
        >
          {char}
        </Button>
      ))}
      {dakuon.map((char, index) => (
        <Button
          key={index}
          isDisabled={!isDakuonCategory}
          onClick={() => handleQuickSelect(char)}
          m={1}
        >
          {char}
        </Button>
      ))}
    </Flex>
  );
};

export default QuickSelectButtons;
