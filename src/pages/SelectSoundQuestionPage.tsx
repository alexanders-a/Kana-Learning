import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Text,
  Button,
  Center,
  VStack,
  Stack,
  Flex,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  setCurrentQuestionIndex,
  setIsCorrect,
  setOptions,
  setQuestions,
  setShowAnswer,
} from "../store/features/trainingSlice";
import { RootState } from "../types/types";
import {
  getRandomUniqueIndex,
  getRankColor,
  shuffleArrayOptions,
} from "../utils/symbolSelectionUtils";
import BackButton from "../components/buttons/BackButton";

const SelectSoundQuestion: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const goToHome = () => navigation("/");
  const toast = useToast();

  const selectedSymbols = useSelector(
    (state: RootState) => state.training.questions
  );

  const options = useSelector((state: RootState) => state.training.options);

  const isCorrect = useSelector((state: RootState) => state.training.isCorrect);

  const showAnswer = useSelector(
    (state: RootState) => state.training.showAnswer
  );

  const currentQuestionIndex = useSelector(
    (state: RootState) => state.training.currentQuestionIndex
  );

  const currentQuestion = selectedSymbols[currentQuestionIndex];

  const selectedSymbolProgress = JSON.parse(
    localStorage.getItem("selectedSymbolProgress") || "{}"
  );

  const progress = selectedSymbolProgress[currentQuestion?.symbol] || 0;

  const rankColor = getRankColor(progress);

  useEffect(() => {
    dispatch(setQuestions(selectedSymbols));
    generateOptions();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, selectedSymbols, currentQuestionIndex]);

  const generateOptions = () => {
    if (!currentQuestion) return;
    const availableSymbols = selectedSymbols.filter(
      (symbol) => symbol.symbol !== currentQuestion.symbol
    );

    let randomOptions: string[];

    if (availableSymbols.length >= 3) {
      randomOptions = getRandomOptions(
        availableSymbols.map((symbol) => symbol.reading),
        3
      );
    } else {
      randomOptions = getRandomOptions(
        selectedSymbols
          .filter((symbol) => symbol.symbol !== currentQuestion.symbol)
          .map((symbol) => symbol.reading),
        3
      );
    }

    randomOptions.push(currentQuestion.reading);
    randomOptions = shuffleArrayOptions(randomOptions);
    dispatch(setOptions(randomOptions));
    dispatch(setShowAnswer(false));
  };

  const getRandomOptions = (symbols: string[], count: number) => {
    const shuffledSymbols = symbols.sort(() => 0.5 - Math.random());
    return shuffledSymbols.slice(0, count);
  };

  const showRankUpdateToast = (newRank: string) => {
    toast({
      title: "Rank Updated!",
      description: `Your new rank: ${newRank} - ${currentQuestion.symbol}`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleOptionClick = (option: string) => {
    if (option === currentQuestion.reading) {
      dispatch(setShowAnswer(true));
      dispatch(setIsCorrect(true));

      const updatedProgress = {
        ...selectedSymbolProgress,
        [currentQuestion.symbol]:
          (selectedSymbolProgress[currentQuestion.symbol] || 0) + 1,
      };

      localStorage.setItem(
        "selectedSymbolProgress",
        JSON.stringify(updatedProgress)
      );
      if (progress === 99) {
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
    } else {
      dispatch(setShowAnswer(true));
    }
  };

  const handleNextQuestion = () => {
    const newIndex = getRandomUniqueIndex(
      currentQuestionIndex,
      selectedSymbols.length
    );
    dispatch(
      setCurrentQuestionIndex(
        currentQuestionIndex === selectedSymbols.length - 1 ? 0 : newIndex
      )
    );
    generateOptions();
    dispatch(setIsCorrect(false));
  };

  return (
    <Center minHeight="100vh">
      <VStack spacing={8} align="center">
        {selectedSymbols.length > 0 &&
        currentQuestionIndex < selectedSymbols.length ? (
          <Stack justify="center" align="center">
            <Box
              m={1}
              p={2}
              borderWidth="1px"
              borderRadius="3xl"
              width="300px"
              height="300px"
              borderColor={
                showAnswer
                  ? isCorrect
                    ? "green.500"
                    : "gray.300"
                    ? "red.500"
                    : "gray.300"
                  : "gray.300"
              }
            >
              <Center fontSize="9xl">
                <Text color={rankColor}>{currentQuestion.symbol}</Text>
              </Center>

              <Center fontSize="4xl">
                <Flex>
                  {options.map((option, index) => (
                    <Button
                      m={1}
                      key={index}
                      onClick={() => handleOptionClick(option)}
                      colorScheme={
                        showAnswer
                          ? option === currentQuestion.reading
                            ? "green"
                            : options.includes(option)
                            ? "red"
                            : "gray"
                          : "gray"
                      }
                    >
                      {option}
                    </Button>
                  ))}
                </Flex>
              </Center>
            </Box>
            <Flex>
              <Button m={1} w="145px" onClick={goToHome}>
                Back
              </Button>
              {showAnswer && (
                <Button w="145px" m={1} onClick={handleNextQuestion}>
                  Next
                </Button>
              )}
            </Flex>
          </Stack>
        ) : (
          <BackButton goToHome={goToHome} />
        )}
      </VStack>
    </Center>
  );
};

export default SelectSoundQuestion;
