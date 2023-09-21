import { Button, Divider, Flex, IconButton } from "@chakra-ui/react";
import { FaAndroid, FaApple, FaDesktop } from "react-icons/fa";

const InstallAppButton = () => {
  const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  };

  const isInStandaloneMode = () =>
    "standalone" in window.navigator && window.navigator.standalone;

  const isAndroid = () => /android/.test(navigator.userAgent.toLowerCase());

  const handleClick = () => {
    if (isIos() && !isInStandaloneMode()) {
      alert("To install the app, tap 'Share' and select 'On Screen' Home");
    } else if (isAndroid()) {
      alert(
        "To install the application, press 'Menu' and select 'Add to Home Screen'"
      );
    } else {
      alert(
        "To install the application, use the context menu of your browser."
      );
    }
  };

  return (
    <>
      <Button w={"full"} onClick={handleClick}>
        Install the app
      </Button>
      <Divider w={"full"} mt={2} />
      <Flex>
        <IconButton m={1} aria-label="Apple" icon={<FaApple />} />
        <IconButton m={1} aria-label="Android" icon={<FaAndroid />} />
        <IconButton m={1} aria-label="PC" icon={<FaDesktop />} />
      </Flex>
    </>
  );
};

export default InstallAppButton;
