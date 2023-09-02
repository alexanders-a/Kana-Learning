import { Heading, Text, Stack, Link } from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";

export default function NotFound() {
  return (
    <Link
      _hover={{
        textDecoration: "none",
      }}
      as={ReachLink}
      to="/"
    >
      <Stack minH="90vh" justify="center" align="center" textAlign="center">
        <Heading
          display="inline-block"
          as="h2"
          size="4xl"
          bgGradient="linear(to-r, purple.500, purple.800)"
          backgroundClip="text"
          outline="none"
        >
          404
        </Heading>
        <Text
          fontSize="28px"
          fontWeight="700"
          bgGradient="linear(to-r, purple.400, purple.800)"
          backgroundClip="text"
          mt={3}
          mb={2}
        >
          Page Not Found
        </Text>
      </Stack>
    </Link>
  );
}
