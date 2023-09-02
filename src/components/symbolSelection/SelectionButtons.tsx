import { Button, Flex } from "@chakra-ui/react";
import { KanaSymbol, KanaTypeCategoty } from "../../types/types";

interface SelectionButtonsProps {
  selectedSymbols: KanaSymbol[];
  selectedCategory: KanaTypeCategoty;
  handleSelectVowels: () => void;
  handleSelectOthers: () => void;
  handleSelectAll: () => void;
  handleRandomSelect: () => void;
  handleClearSelection: () => void;

}

const SelectionButtons: React.FC<SelectionButtonsProps> = ({
  selectedCategory,
  handleSelectVowels,
  handleSelectOthers,
  handleSelectAll,
  handleRandomSelect,
  handleClearSelection,

}) => {
  const isDakuonCategory = selectedCategory === "Dakuon";

  return (
    <Flex direction="row" wrap="wrap">
      <Button isDisabled={isDakuonCategory} onClick={handleSelectVowels} m={1}>
        Vowels
      </Button>
      <Button isDisabled={isDakuonCategory} onClick={handleSelectOthers} m={1}>
        Others
      </Button>
      <Button onClick={handleSelectAll} m={1}>
        All
      </Button>
      <Button onClick={handleRandomSelect} m={1}>
        Random
      </Button>
      <Button onClick={handleClearSelection} m={1}>
        Clear
      </Button>

    </Flex>
  );
};

export default SelectionButtons;
