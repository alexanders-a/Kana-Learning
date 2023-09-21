import React, { useState } from "react";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedSymbols } from "../store/features/kanaSlice";
import { setQuestions } from "../store/features/trainingSlice";
import { RootState } from "../types/types";
import { useMediaQuery } from "@chakra-ui/react";
import { shuffleArray } from "../utils/symbolSelectionUtils";
import SymbolCard from "../components/SymbolCard";
import KanaTypeSelector from "../components/KanaTypeSelector";
import QuickSelectButtons from "../components/symbolSelection/QuickSelectButtons";
import SelectionButtons from "../components/symbolSelection/SelectionButtons";
import hiraganaData from "../data/hiragana.json";
import katakanaData from "../data/katakana.json";
import dakuonHiragana from "../data/dakuonHiragana.json";
import dakuonKatakana from "../data/dakuonKatakana.json";
import TrainingTypeSelector from "../components/training/TrainingTypeSelector";
import LearnButton from "../components/buttons/LearnButton";
import DrawerButton from "../components/buttons/DrawerButton";
import useData from "../hooks/useData";
import WelcomeSlider from "../components/welcome/WelcomeSlider";

const SymbolSelectionPage: React.FC = () => {
  const data = useData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const sounds = ["k", "s", "t", "n", "h", "m", "y", "r"];
  const vowels = ["a", "i", "u", "e", "o"];
  const others = ["chi", "fu", "wa", "wo"];
  const dakuon = ["g", "z", "d", "b", "p"];
  const hasSeenWelcome = localStorage.getItem("welcomeToken");

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
  const selectedKanaType = useSelector(
    (state: RootState) => state.kana.selectedKanaType
  );

  const selectedCategory = useSelector(
    (state: RootState) => state.kana.selectedCategory
  );

  const selectedSymbols = useSelector(
    (state: RootState) => state.kana.selectedSymbols
  );

  const handleQuickSelect = (startsWith: string) => {
    toggleSymbolsByFilter((symbolData) => symbolData.reading[0] === startsWith);
  };

  const handleSelectVowels = () => {
    toggleSymbolsByFilter((symbolData) => vowels.includes(symbolData.reading));
  };

  const handleSelectOthers = () => {
    toggleSymbolsByFilter((symbolData) => others.includes(symbolData.reading));
  };

  const handleSelectAll = () => {
    if (selectedSymbols.length === data?.length) {
      dispatch(setSelectedSymbols([]));
    } else {
      toggleSymbolsByFilter(() => true);
    }
  };

  const handleClearSelection = () => {
    dispatch(setSelectedSymbols([]));
  };

  const toggleSymbolsByFilter = (filterFn: (symbolData: any) => boolean) => {
    const symbolsToToggle =
      selectedKanaType === "hiragana"
        ? selectedCategory === "Dakuon"
          ? dakuonHiragana
          : hiraganaData
        : selectedCategory === "Dakuon"
        ? dakuonKatakana
        : katakanaData;

    const toggled = symbolsToToggle.filter(filterFn);

    const newSelectedSymbols = selectedSymbols.filter((symbolData) =>
      toggled.some(
        (toggledSymbol) => toggledSymbol.symbol === symbolData.symbol
      )
    );
    const combinedSymbols = [...newSelectedSymbols, ...toggled];
    localStorage.setItem("selectedSymbols", JSON.stringify(combinedSymbols));

    dispatch(setSelectedSymbols(combinedSymbols));
  };
  const handleRandomSelect = () => {
    let symbolsToSelect =
      selectedKanaType === "hiragana" ? hiraganaData : katakanaData;

    if (selectedCategory === "Dakuon") {
      symbolsToSelect =
        selectedKanaType === "hiragana" ? dakuonHiragana : dakuonKatakana;
    }

    const randomSymbolsCount = Math.floor(Math.random() * 11) + 5;
    const randomSymbols = symbolsToSelect
      .filter(
        (symbolData) =>
          !selectedSymbols.some(
            (selectedSymbol) => selectedSymbol.symbol === symbolData.symbol
          )
      )
      .sort(() => 0.5 - Math.random())
      .slice(0, randomSymbolsCount);

    dispatch(setSelectedSymbols(randomSymbols));
  };

  const handleNextClick = () => {
    if (selectedSymbols.length >= 3) {
      const shuffledSymbols = shuffleArray(selectedSymbols);
      dispatch(setQuestions(shuffledSymbols));
      setIsReady(true);
    } else {
      toast({
        title: "Not Enough Symbols",
        description: "Please select at least 3 symbols before proceeding.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (!hasSeenWelcome) return <WelcomeSlider />;
  if (isReady) return <TrainingTypeSelector navigate={navigate} />;
  return (
    <Stack mt={isMobile ? 5 : 0} minH={"100vh"} justify="center" align="center">
      <Flex maxWidth={"450px"} justify="space-between" align="center">
        <DrawerButton onOpen={handleDrawerOpen} />
        <LearnButton onClick={handleNextClick} />
        <Drawer
          placement={!isMobile ? "right" : "bottom"}
          onClose={handleDrawerClose}
          isOpen={isDrawerOpen}
        >
          <DrawerOverlay>
            <DrawerContent opacity={isMobile ? 0.9 : 1}>
              <DrawerCloseButton />
              <DrawerHeader>Kana</DrawerHeader>
              <DrawerBody>
                <KanaTypeSelector />
                <Stack>
                  <QuickSelectButtons
                    sounds={sounds}
                    dakuon={dakuon}
                    handleQuickSelect={handleQuickSelect}
                    selectedCategory={selectedCategory}
                  />
                  <SelectionButtons
                    selectedCategory={selectedCategory}
                    handleSelectVowels={handleSelectVowels}
                    handleSelectOthers={handleSelectOthers}
                    handleSelectAll={handleSelectAll}
                    handleRandomSelect={handleRandomSelect}
                    handleClearSelection={handleClearSelection}
                    selectedSymbols={selectedSymbols}
                  />
                </Stack>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </Flex>
      <Stack justify="center" align="center" minH="80vh">
        <Flex>
          <Box flex={1} p={4}>
            <Flex
              maxWidth={"450px"}
              justify="center"
              align="center"
              direction="row"
              wrap="wrap"
            >
              {data?.map((symbolData: any, index) => (
                <SymbolCard
                  key={index}
                  index={index}
                  symbol={symbolData.symbol}
                  reading={symbolData.reading}
                />
              ))}
            </Flex>
          </Box>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default SymbolSelectionPage;
