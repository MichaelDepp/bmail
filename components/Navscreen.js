import {
  Center,
  Text,
  Box,
  VStack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import Linkpage from "../components/Linkpage";
import Link from "next/link";

function Navscreen(props) {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("#101010", "#F8F8F8");
  const color = useColorModeValue("#F8F8F8", "#101010");
  const btn = "#FE5454";
  const sbtn = useColorModeValue("#F8F8F8", "#101010");
  const navclr = useColorModeValue(
    "rgba(16, 16, 16, 0.9)",
    "rgba(248, 248, 248, 0.9)"
  );

  return (
    <Center>
      <Box justify="center" my="50px">
        <VStack>
          <Linkpage
            page={"/"}
            name={"Sent"}
            color={btn}
            onClose={props.onClose}
          ></Linkpage>
          <Linkpage
            page={"/inbox"}
            name={"Inbox"}
            color={btn}
            onClose={props.onClose}
          ></Linkpage>
          <Linkpage
            page={"/trash"}
            name={"Trash"}
            color={btn}
            onClose={props.onClose}
          ></Linkpage>
          <Linkpage
            page={"/profile"}
            name={"Profile"}
            color={btn}
            onClose={props.onClose}
          ></Linkpage>
          <Linkpage
            page={"/compose"}
            name={"Compose"}
            color={btn}
            onClose={props.onClose}
          ></Linkpage>
        </VStack>
      </Box>
    </Center>
  );
}

export default Navscreen;
