import { useSelector, useDispatch } from "react-redux";
import {
  Text,
  Input,
  Button,
  Center,
  VStack,
  Stack,
  Flex,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../types/types";
import {
  setCurrentQuestionIndex,
  setInputValue,
  setIsCorrect,
  setShowAnswer,
} from "../store/features/trainingSlice";
import BackButton from "../components/buttons/BackButton";
import { getRandomUniqueIndex, getRankColor } from "../utils/trainingUtils";
import { showRankUpdate } from "../utils/trainingUtils";
import { playAudio } from "../utils/audioSybmolUtils";
import P2 from "../anim/TriggerAnim";

const InputSoundQuestion = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const goToHome = () => navigation("/");
  const toast = useToast();

  const selectedSymbols = useSelector(
    (state: RootState) => state.training.questions
  );

  const selectedSymbolProgress = JSON.parse(
    localStorage.getItem("selectedSymbolProgress") || "{}"
  );

  const currentQuestionIndex = useSelector(
    (state: RootState) => state.training.currentQuestionIndex
  );

  const isCorrect = useSelector((state: RootState) => state.training.isCorrect);

  const inputValue = useSelector(
    (state: RootState) => state.training.inputValue
  );

  const showAnswer = useSelector(
    (state: RootState) => state.training.showAnswer
  );

  const currentQuestion = selectedSymbols[currentQuestionIndex];

  const progress = selectedSymbolProgress[currentQuestion?.symbol] || 0;

  const rankColor = getRankColor(progress);

  const showRankUpdateToast = (newRank: string) => {
    toast({
      title: "Rank Updated!",
      description: `Your new rank: ${newRank} - ${currentQuestion.symbol}`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleSubmit = () => {
    let newIsCorrect = false;

    if (inputValue.toLowerCase() === currentQuestion.reading.toLowerCase()) {
      newIsCorrect = true;
    }

    dispatch(setIsCorrect(newIsCorrect));

    if (newIsCorrect) {
      const updatedProgress = {
        ...selectedSymbolProgress,
        [currentQuestion.symbol]:
          (selectedSymbolProgress[currentQuestion.symbol] || 0) + 1,
      };
      localStorage.setItem(
        "selectedSymbolProgress",
        JSON.stringify(updatedProgress)
      );
    }

    dispatch(setShowAnswer(true));
  };

  const handleNextQuestion = () => {
    const newIndex = getRandomUniqueIndex(
      currentQuestionIndex,
      selectedSymbols.length
    );
    dispatch(setInputValue(""));
    dispatch(setIsCorrect(false));
    dispatch(setShowAnswer(false));
    dispatch(
      setCurrentQuestionIndex(
        currentQuestionIndex === selectedSymbols.length - 1 ? 0 : newIndex
      )
    );
  };

  const handleKeyPress = (event: { key: string }) => {
    if (event.key === "Enter") {
      handleSubmit();
      if (showAnswer === true || isCorrect === true) {
        handleNextQuestion();
      }
      showRankUpdate(progress, showRankUpdateToast);
    }
  };

  return (
    <Center minHeight="100vh">
      <VStack spacing={8} align="center">
        {selectedSymbols?.length ? (
          <Stack justify="center" align="center">
            <Box
              m={1}
              p={2}
              borderWidth="4px"
              borderRadius="3xl"
              width="300px"
              height="300px"
              borderColor={
                isCorrect ? "green.500" : !showAnswer ? "gray.500" : "red.500"
              }
            >
              <Center fontSize="9xl">
                <P2 correct={isCorrect}>
                  <Text
                    cursor="pointer"
                    onClick={() => {
                      playAudio(currentQuestion?.symbol);
                    }}
                    color={rankColor}
                  >
                    {currentQuestion?.symbol}
                  </Text>
                </P2>
              </Center>

              <Center fontSize="4xl">
                <Input
                  width="90px"
                  type="text"
                  value={
                    isCorrect === false && showAnswer
                      ? currentQuestion?.reading
                      : inputValue
                  }
                  onChange={(e) => dispatch(setInputValue(e.target.value))}
                  onKeyDown={(e) => handleKeyPress(e)}
                  borderColor={
                    isCorrect === true
                      ? "green.500"
                      : !showAnswer
                      ? "gray.300"
                      : "red.500"
                  }
                  isReadOnly={isCorrect || showAnswer}
                  fontSize="xl"
                  textAlign="center"
                />
              </Center>
            </Box>
            <Flex>
              <Button m={1} w="145px" onClick={goToHome}>
                Back
              </Button>
              {showAnswer || isCorrect ? (
                <Button w="145px" m={1} onClick={handleNextQuestion}>
                  Next
                </Button>
              ) : (
                <Button
                  w="145px"
                  m={1}
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Check
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

export default InputSoundQuestion;
