import React from "react";
import {
  Box,
  Center,
  Flex,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";

interface TrainingTypeSelectorProps {
  navigate: (to: string) => void;
}

const TrainingTypeSelector: React.FC<TrainingTypeSelectorProps> = ({
  navigate,
}) => {
  return (
    <VStack justify="center" align="center" minH={"100vh"} spacing={4}>
      <Box
        m={1}
        p={2}
        borderWidth={"2px"}
        borderRadius="xl"
        width="200px"
        height="200px"
        borderColor={"gray.600"}
        cursor="pointer"
        onClick={() => navigate("/training")}
      >
        <Center fontSize="7xl">
          <Text fontWeight={"bold"}>ツ</Text>
        </Center>
        <Center color={"gray.400"} fontSize="xs">
          <Input w={"100px"} h={"50px"} />
        </Center>
      </Box>
      <Box
        m={1}
        p={2}
        borderWidth={"2px"}
        borderRadius="xl"
        width="200px"
        height="200px"
        borderColor={"gray.600"}
        cursor="pointer"
        onClick={() => navigate("/trainingSymbol")}
      >
        <Center fontSize="7xl">
          <Text fontWeight={"bold"}>se</Text>
        </Center>
        <Flex>
          <Center
            m={1}
            w="50px"
            h="50px"
            borderWidth={"1px"}
            borderRadius="sm"
            fontSize="20px"
            color={"gray.400"}
          >
            <Text>を</Text>
          </Center>
          <Center
            m={1}
            w="50px"
            h="50px"
            borderWidth={"1px"}
            borderRadius="sm"
            fontSize="20px"
            color={"gray.400"}
          >
            <Text>せ</Text>
          </Center>
          <Center
            m={1}
            w="50px"
            h="50px"
            borderWidth={"1px"}
            borderRadius="sm"
            fontSize="20px"
            color={"gray.400"}
          >
            <Text>く</Text>
          </Center>
        </Flex>
      </Box>
      <Box
        m={1}
        p={2}
        borderWidth={"2px"}
        borderRadius="xl"
        width="200px"
        height="200px"
        borderColor={"gray.600"}
        cursor="pointer"
        onClick={() => navigate("/trainingSound")}
      >
        <Center fontSize="7xl">
          <Text fontWeight={"bold"}>ほ</Text>
        </Center>
        <Flex>
          <Center
            m={1}
            w="50px"
            h="50px"
            borderWidth={"1px"}
            borderRadius="sm"
            fontSize="20px"
            color={"gray.400"}
          >
            <Text>he</Text>
          </Center>
          <Center
            m={1}
            w="50px"
            h="50px"
            borderWidth={"1px"}
            borderRadius="sm"
            fontSize="20px"
            color={"gray.400"}
          >
            <Text>ho</Text>
          </Center>
          <Center
            m={1}
            w="50px"
            h="50px"
            borderWidth={"1px"}
            borderRadius="sm"
            fontSize="20px"
            color={"gray.400"}
          >
            <Text>ha</Text>
          </Center>
        </Flex>
      </Box>
    </VStack>
  );
};

export default TrainingTypeSelector;
