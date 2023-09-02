import React from "react";
import { Box, ButtonGroup, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  setKanaType,
  setSelectedCategory,
  setSelectedSymbols,
} from "../store/features/kanaSlice";
import { KanaType, KanaTypeCategoty, RootState } from "../types/types";

const KanaTypeSelector: React.FC = () => {
  const dispatch = useDispatch();

  const selectedKanaType = useSelector(
    (state: RootState) => state.kana.selectedKanaType
  );

  const selectedCategory = useSelector(
    (state: RootState) => state.kana.selectedCategory
  );

  const handleKanaTypeChange = (newKanaType: KanaType) => {
    if (newKanaType !== selectedKanaType) {
      dispatch(setKanaType(newKanaType));
      dispatch(setSelectedSymbols([]));
    }
  };

  const handleKanaTypeCategoryChange = (newKanaType: KanaTypeCategoty) => {
    if (newKanaType !== selectedCategory) {
      dispatch(setSelectedCategory(newKanaType));
      dispatch(setSelectedSymbols([]));
    }
  };

  return (
    <Box padding={0}>
      <ButtonGroup isAttached variant="outline">
        <Button
          m={1}
          p={1}
          borderWidth={"2px"}
          borderRadius="xl"
          colorScheme={
            selectedKanaType === KanaType.Hiragana ? "blue" : undefined
          }
          onClick={() => handleKanaTypeChange(KanaType.Hiragana)}
        >
          Hiragana
        </Button>
        <Button
          m={1}
          p={1}
          borderWidth={"2px"}
          borderRadius="xl"
          colorScheme={
            selectedKanaType === KanaType.Katakana ? "yellow" : undefined
          }
          onClick={() => handleKanaTypeChange(KanaType.Katakana)}
        >
          Katakana
        </Button>
      </ButtonGroup>
      <ButtonGroup m={1} isAttached variant="outline">
        <Button
          m={1}
          p={1}
          borderWidth={"2px"}
          borderRadius="xl"
          colorScheme={
            selectedCategory === KanaTypeCategoty.Base ? "blue" : undefined
          }
          onClick={() => handleKanaTypeCategoryChange(KanaTypeCategoty.Base)}
        >
          Base
        </Button>
        <Button
          m={1}
          p={1}
          borderWidth={"2px"}
          borderRadius="xl"
          colorScheme={
            selectedCategory === KanaTypeCategoty.Dakuon ? "red" : undefined
          }
          onClick={() => handleKanaTypeCategoryChange(KanaTypeCategoty.Dakuon)}
        >
          Dakuon
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default KanaTypeSelector;
