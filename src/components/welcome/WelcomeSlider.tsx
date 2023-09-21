import React, { useState, useEffect } from "react";
import { Button, Flex, Img, Stack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import InstallAppButton from "../buttons/InstallAppButton";
import Loading from "../loading/Loading";
import { useNavigate } from "react-router-dom";

function AT({ children }: { children: React.ReactNode }) {
  const A = {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  };
  return (
    <motion.section initial="hidden" animate="visible" variants={A}>
      <motion.div transition={{ delay: 3 }}>{children}</motion.div>
    </motion.section>
  );
}

function AJ({ children }: { children: React.ReactNode }) {
  const A = {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  };
  return (
    <motion.section initial="hidden" animate="visible" variants={A}>
      <motion.div transition={{ delay: 0.5 }}>{children}</motion.div>
    </motion.section>
  );
}

function OP({ children }: { children: React.ReactNode }) {
  return (
    <motion.section initial="hidden" animate="visible">
      <motion.div transition={{ delay: 2 }}>{children}</motion.div>
    </motion.section>
  );
}

const WelcomeSlider: React.FC = () => {
  const [showSlide, setShowSlide] = useState(true);
  const [animate, setAnimate] = useState(false);
  const [welcome, setWelcome] = useState(false);
  const navigate = useNavigate();

  const handleWelcome = () => {
    setWelcome(true);
    localStorage.setItem("welcomeToken", "true");
    setTimeout(() => {
      setShowSlide(false);
      navigate('/')
    }, 4000);
  };

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 4000);
  }, []);

  if (welcome) return <Loading />;
  if (!showSlide) return null;
  return (
    <Stack
      justify={"center"}
      align={"center"}
      textAlign={"center"}
      w={"full"}
      overflow={"hidden"}
      minH={"100vh"}
    >
      {animate ? (
        <AT>
          <InstallAppButton />
          <Button onClick={handleWelcome} w={"full"}>
            Lern
          </Button>
        </AT>
      ) : (
        <OP>
          <Flex justify={"center"} align={"center"}>
            <AJ>
              <Img
                borderRadius={"3xl"}
                border={"2px"}
                borderColor={"GrayText"}
                src={require("./welcome.png")}
              />
            </AJ>
          </Flex>
        </OP>
      )}
    </Stack>
  );
};

export default WelcomeSlider;
