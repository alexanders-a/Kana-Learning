import React from "react";
import {
  Box,
  Center,
  Flex,
  Input,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { FaVolumeUp } from "react-icons/fa";

interface TrainingTypeSelectorProps {
  navigate: (to: string) => void;
}

const TrainingTypeSelector: React.FC<TrainingTypeSelectorProps> = ({
  navigate,
}) => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const blocks = [
    {
      title: "se",
      nav: "/trainingSymbol",
      inputs: [{ text: "を" }, { text: "せ" }, { text: "く" }],
    },
    {
      title: "ほ",
      nav: "/trainingSound",
      inputs: [{ text: "he" }, { text: "ho" }, { text: "ha" }],
    },
    {
      title: "ほ",
      nav: "/trainingSoundAudio",
      inputs: [{ text: "プ1" }, { text: "エ" }, { text: "ホ" }],
      detals: "icon",
    },
  ];

  return (
    <Flex m={"5vh"} justify="center" align="center" minH="90vh" flexWrap="wrap">
      {!isMobile && (
        <Box
          key="training"
          m={1}
          p={2}
          borderWidth="2px"
          borderRadius="xl"
          width="200px"
          height="200px"
          borderColor="gray.600"
          cursor="pointer"
          onClick={() => navigate("/training")}
        >
          <Center fontSize="7xl">
            <Text fontWeight="bold">ツ</Text>
          </Center>
          <Center color={"gray.400"} fontSize="xs">
            <Input w={"100px"} h={"50px"} />
          </Center>
        </Box>
      )}
      {blocks.map((block, index) => (
        <Box
          key={index}
          m={1}
          p={2}
          borderWidth="2px"
          borderRadius="xl"
          width="200px"
          height="200px"
          borderColor="gray.600"
          cursor="pointer"
          onClick={() => navigate(block.nav)}
        >
          {block.detals !== "icon" ? (
            <Center fontSize="7xl">
              <Text fontWeight="bold">{block.title}</Text>
            </Center>
          ) : (
            <Center m={5} fontSize="7xl">
              <FaVolumeUp />
            </Center>
          )}
          <Flex>
            {block.inputs.map((input, inputIndex) => (
              <Center
                key={inputIndex}
                m={1}
                w="50px"
                h="50px"
                borderWidth="1px"
                borderRadius="sm"
                fontSize="20px"
                color="gray.400"
              >
                <Text>{input.text}</Text>
              </Center>
            ))}
          </Flex>
        </Box>
      ))}
    </Flex>
  );
};

export default TrainingTypeSelector;
