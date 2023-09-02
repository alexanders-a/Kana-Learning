import React from "react";
import { Box, Text, Center } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../types/types";
import { addSelectedSymbol, removeSelectedSymbol } from "../store/features/kanaSlice";

interface SymbolCardProps {
  symbol: string;
  reading: string;
}

const SymbolCard: React.FC<SymbolCardProps> = ({ symbol, reading }) => {
  const dispatch = useDispatch();

  const selectedSymbols = useSelector(
    (state: RootState) => state.kana.selectedSymbols
  );

  const isSelected = selectedSymbols.some(
    (selectedSymbol) => selectedSymbol.symbol === symbol
  );

  const selectedSymbolProgress = JSON.parse(
    localStorage.getItem("selectedSymbolProgress") || "{}"
  );

  const progress = selectedSymbolProgress[symbol] || 0;

  let rank:
    | "gray.300"
    | "#2C7A7B"
    | "#4299E1"
    | "#C53030"
    | "#6B46C1"
    | "#B7791F" = "gray.300";

  if (progress >= 99) {
    rank = "#C53030";
  } else if (progress >= 70) {
    rank = "#6B46C1";
  } else if (progress >= 50) {
    rank = "#B7791F";
  } else if (progress >= 20) {
    rank = "#2C7A7B";
  } else if (progress > 5) {
    rank = "#4299E1";
  }

  const handleCardClick = () => {
    if (isSelected) {
      dispatch(removeSelectedSymbol(symbol));
    } else {
      dispatch(addSelectedSymbol({ symbol, reading }));
    }
  };

  return (
    <Box
      m={1}
      p={2}
      opacity={isSelected || selectedSymbols.length === 0 ? "1" : "0.7"}
      borderWidth={isSelected ? "3px" : "1px"}
      borderRadius="xl"
      width="70px"
      height="70px"
      borderColor={rank}
      onClick={handleCardClick}
      cursor="pointer"
    >
      <Center fontSize="xl">
        <Text fontWeight={"bold"} color={rank}>
          {symbol}
        </Text>
      </Center>
      <Center color={"gray.400"} fontSize="xs">
        <Text>{reading}</Text>
      </Center>
      <Center color={"gray.400"} fontSize="xs" position="relative">
        <Box w="50%" h="3px" borderRadius="xl" bg="gray.700">
          <Box h="100%" w={`${progress}%`} borderRadius="xl" bg={rank} />
        </Box>
      </Center>
    </Box>
  );
};

export default SymbolCard;
