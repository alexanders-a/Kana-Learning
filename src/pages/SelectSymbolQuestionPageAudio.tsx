import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Text,
  Button,
  Center,
  VStack,
  Stack,
  Flex,
  useToast,
  useMediaQuery,
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
  handleKeyDown,
  showRankUpdate,
} from "../utils/trainingUtils";
import { shuffleArrayOptions } from "../utils/symbolSelectionUtils";
import BackButton from "../components/buttons/BackButton";
import useKeyPress from "../hooks/useKeyPress";
import { playAudio } from "../utils/audioSybmolUtils";
import { FaVolumeUp } from "react-icons/fa";

const SelectSymbolQuestionAudio: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const goToHome = () => navigation("/");
  const toast = useToast();
  const optionKeys = ["1", "2", "3", "4"];
  const optionClicks = optionKeys.map(useKeyPress);
  const nextPress = useKeyPress("Enter");
  const [isMobile] = useMediaQuery("(max-width: 768px)");

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
    playAudio(currentQuestion?.symbol);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, selectedSymbols, currentQuestionIndex]);

  const generateOptions = () => {
    if (!currentQuestion) return;
    const availableSymbols = selectedSymbols.filter(
      (symbol) =>
        symbol.reading.charAt(0) === currentQuestion?.reading.charAt(0)
    );

    const otherAvailableSymbols = availableSymbols.filter(
      (symbol) => symbol.symbol !== currentQuestion?.symbol
    );

    let randomOptions: string[];

    if (otherAvailableSymbols.length >= 3) {
      randomOptions = getRandomOptions(
        otherAvailableSymbols.map((symbol) => symbol.symbol),
        3
      );
    } else {
      randomOptions = getRandomOptions(
        selectedSymbols
          .filter((symbol) => symbol.symbol !== currentQuestion?.symbol)
          .map((symbol) => symbol.symbol),
        3
      );
    }

    randomOptions.push(currentQuestion.symbol);
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
      description: `Your new rank: ${newRank} - ${currentQuestion?.symbol}`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleOptionClick = (option: string) => {
    if (option === currentQuestion?.symbol) {
      dispatch(setShowAnswer(true));
      dispatch(setIsCorrect(true));
      const updatedProgress = {
        ...selectedSymbolProgress,
        [currentQuestion?.symbol]:
          (selectedSymbolProgress[currentQuestion?.symbol] || 0) + 1,
      };

      localStorage.setItem(
        "selectedSymbolProgress",
        JSON.stringify(updatedProgress)
      );
      showRankUpdate(progress, showRankUpdateToast);
    } else {
      dispatch(setShowAnswer(true));
    }
  };

  const handleNextQuestion = () => {
    const newIndex = getRandomUniqueIndex(
      currentQuestionIndex,
      selectedSymbols?.length
    );
    dispatch(
      setCurrentQuestionIndex(
        currentQuestionIndex === selectedSymbols?.length - 1 ? 0 : newIndex
      )
    );
    generateOptions();
    dispatch(setIsCorrect(false));
  };

  const handleOptionKeyPress = (optionIndex: number) => {
    if (options[optionIndex]) {
      handleOptionClick(options[optionIndex]);
    }
  };

  useEffect(() => {
    if (nextPress && showAnswer) {
      handleNextQuestion();
    }
    optionClicks.forEach((optionClick, index) => {
      if (optionClick) handleOptionKeyPress(index);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextPress, ...optionClicks]);

  return (
    <Center minHeight="100vh">
      <VStack spacing={8} align="center">
        {selectedSymbols.length > 0 &&
        currentQuestionIndex < selectedSymbols.length ? (
          <Stack justify="center" align="center">
            <Box
              m={1}
              p={2}
              borderWidth="4px"
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
              onKeyDown={handleKeyDown}
            >
              {!showAnswer ? (
                <Center m="32px" fontSize="9xl">
                  <FaVolumeUp
                    cursor="pointer"
                    color={rankColor}
                    onClick={() => playAudio(currentQuestion.symbol)}
                  />
                </Center>
              ) : (
                <Center fontSize="9xl">
                    <Text color={rankColor}>{currentQuestion.reading}</Text>
                </Center>
              )}
              <Center fontSize="4xl">
                <Flex>
                  {options.map((option, index) => (
                    <Button
                      m={1}
                      key={index}
                      onClick={() => handleOptionClick(option)}
                      colorScheme={
                        showAnswer
                          ? option === currentQuestion.symbol
                            ? "green"
                            : options.includes(option)
                            ? "red"
                            : "gray"
                          : "gray"
                      }
                    >
                      {!isMobile && (
                        <Text
                          fontSize={10}
                          position={"absolute"}
                          left={"8px"}
                          color={"gray.500"}
                          top={"10px"}
                        >
                          {index + 1}
                        </Text>
                      )}
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
              <Button
                isDisabled={!showAnswer}
                w="145px"
                m={1}
                onClick={handleNextQuestion}
              >
                Next
              </Button>
            </Flex>
          </Stack>
        ) : (
          <BackButton goToHome={goToHome} />
        )}
      </VStack>
    </Center>
  );
};

export default SelectSymbolQuestionAudio;
