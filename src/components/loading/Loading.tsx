import React from "react";
import {  Img, Stack, useMediaQuery,  } from "@chakra-ui/react";

const Loading: React.FC = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (

    <Stack justify="end" align="end" minH="100vh">
      <Img w={isMobile ? "320px" : "520px"} src={require("./loading.png")} />
    </Stack>
  );
};

export default Loading;
