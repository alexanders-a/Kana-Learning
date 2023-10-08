import React from "react";
import SymbolCard from "../SymbolCard";
import { Box, Flex, Stack } from "@chakra-ui/react";
import { KanaSymbol } from "../../types/types";

interface SymbolsListProps {
  data: KanaSymbol[];
  selectedSymbols: KanaSymbol[];
}

const SymbolsList: React.FC<SymbolsListProps> = ({ data, selectedSymbols }) => {
  return (
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
                selectedSymbols={selectedSymbols}
              />
            ))}
          </Flex>
        </Box>
      </Flex>
    </Stack>
  );
};

export default SymbolsList;
