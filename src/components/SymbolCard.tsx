import React from "react";
import { Box, Text, Center } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { KanaSymbol } from "../types/types";
import {
  addSelectedSymbol,
  removeSelectedSymbol,
} from "../store/features/kanaSlice";
import P1 from "../anim/SymbolsAnim";

interface SymbolCardProps {
  index: number;
  symbol: string;
  reading: string;
  selectedSymbols: KanaSymbol[];
}

const SymbolCard: React.FC<SymbolCardProps> = ({
  symbol,
  reading,
  index,
  selectedSymbols,
}) => {
  const dispatch = useDispatch();

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
    let updatedSelectedSymbols;

    if (isSelected) {
      dispatch(removeSelectedSymbol(symbol));
      updatedSelectedSymbols = selectedSymbols.filter(
        (selectedSymbol) => selectedSymbol.symbol !== symbol
      );
    } else {
      dispatch(addSelectedSymbol({ symbol, reading }));
      updatedSelectedSymbols = [...selectedSymbols, { symbol, reading }];
    }

    localStorage.setItem(
      "selectedSymbols",
      JSON.stringify(updatedSelectedSymbols)
    );
  };

  return (
    <P1 isEven={index % 2 === 0}>
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
        position="relative"
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
            <Box
              h="100%"
              w={`${Math.min(progress, 100)}%`}
              borderRadius="xl"
              bg={rank}
            />
          </Box>
        </Center>
      </Box>
    </P1>
  );
};

export default SymbolCard;
