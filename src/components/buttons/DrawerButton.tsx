import React from "react";
import { IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

interface DrawerButtonProps {
  onOpen: () => void;
}

const DrawerButton: React.FC<DrawerButtonProps> = ({ onOpen }) => {
  return (
    <IconButton
      icon={<HamburgerIcon />}
      aria-label="Open Drawer"
      onClick={onOpen}
      m={1}
      p={2}
      borderWidth={"2px"}
      borderRadius="xl"
      width="70px"
      height="70px"
      borderColor={"gray.600"}
      cursor="pointer"
    />
  );
};

export default DrawerButton;
