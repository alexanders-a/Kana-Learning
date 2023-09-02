import { Button, Text, VStack } from "@chakra-ui/react";

interface BackButtonProps {
  goToHome: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ goToHome }) => {
  return (
    <VStack
      m={1}
      p={2}
      borderWidth={"2px"}
      borderRadius="xl"
      borderColor={"gray.600"}
    >
      <Text fontSize={"xl"}>No questions available!</Text>
      <Button m={1} w="145px" onClick={goToHome}>
        Back
      </Button>
    </VStack>
  );
};

export default BackButton;
