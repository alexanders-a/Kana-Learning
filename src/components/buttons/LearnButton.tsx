import React from "react";
import { Box, Text, Center } from "@chakra-ui/react";

interface LearnButtonProps {
  onClick: () => void;
}

const LearnButton: React.FC<LearnButtonProps> = ({ onClick }) => {
  return (
    <Box
      m={1}
      p={2}
      borderWidth={"2px"}
      borderRadius="xl"
      width="70px"
      height="70px"
      borderColor={"gray.600"}
      onClick={onClick}
      cursor="pointer"
    >
      <Center fontSize="xl">
        <Text fontWeight={"bold"}>学ぶ</Text>
      </Center>
      <Center color={"gray.400"} fontSize="xs">
        <Text>Learn</Text>
      </Center>
    </Box>
  );
};

export default LearnButton;
