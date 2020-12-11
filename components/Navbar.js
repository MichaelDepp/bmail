import {
  Box,
  Flex,
  Image,
  useColorMode,
  useColorModeValue,
  IconButton,
  Center,
  Container,
  Wrap,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillThunderbolt } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import Link from "next/link";
import Hamburger from "hamburger-react";
import Navscreen from "../components/Navscreen";
import { useState } from "react";

function Navbar(props) {
  const [menu, setMenu] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState("left");
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("#101010", "#F8F8F8");
  const color = useColorModeValue("#F8F8F8", "#101010");
  const btn = "#FE5454";
  const sbtn = useColorModeValue("#F8F8F8", "#101010");
  const navclr = useColorModeValue(
    "rgba(16, 16, 16, 0.9)",
    "rgba(248, 248, 248, 0.9)"
  );

  const { talk, setTalk } = props;

  const onTalk = () => {
    if (setTalk) {
      setTalk(!talk);
    }
  };

  return (
    <div style={{ paddingTop: "5px" }}>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        py="2"
        bg={bg}
        color={color}
      >
        <Flex align="center">
          <IconButton
            colorScheme="none"
            color={btn}
            onClick={onOpen}
            fontSize="2xl"
            _focus={{ outline: "none" }}
            icon={<GiHamburgerMenu></GiHamburgerMenu>}
          ></IconButton>
        </Flex>

        <Box>
          <IconButton
            onClick={onTalk}
            colorScheme="none"
            color={btn}
            _focus={{ outline: "none" }}
            icon={<AiFillThunderbolt size={30}></AiFillThunderbolt>}
          ></IconButton>
        </Box>

        <Box display={{ sm: true ? "block" : "none", md: "block" }}>
          <IconButton
            colorScheme="none"
            color={btn}
            size="lg"
            _focus={{ outline: "none" }}
            fontSize="2xl"
            icon={colorMode === "light" ? <IoMdSunny /> : <IoMdMoon />}
            onClick={toggleColorMode}
          ></IconButton>
        </Box>
      </Flex>
      <Drawer
        placement={placement}
        onClose={onClose}
        isOpen={isOpen}
        size={"full"}
      >
        <DrawerOverlay>
          <DrawerContent bg={navclr}>
            <DrawerCloseButton
              mt={5}
              size="xl"
              outline="none"
              outlineColor="none"
              color={btn}
              _focus={{ outline: "none" }}
            />
            <Center h="100%">
              <Navscreen onClick={onClose} />
            </Center>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </div>
  );
}

export default Navbar;
