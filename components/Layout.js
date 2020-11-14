import {
  Button,
  Heading,
  useColorMode,
  useColorModeValue,
  Wrap,
  IconButton,
  Box,
  Center,
  Container,
  Flex,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";

function Layout(props) {
  const { colorMode, toggleColorMode } = useColorMode();

  const bg = useColorModeValue("#101010", "#F8F8F8");
  const color = useColorModeValue("#F8F8F8", "#101010");
  const btn = "#FE5454";
  const sbtn = useColorModeValue("#F8F8F8", "#101010");
  return (
    <Box bg={bg} color={color} minHeight="100vh">
      <Navbar></Navbar>
      <Center>
        <Box w={["90%", "90%", "70%", "80%"]}>{props.children}</Box>
      </Center>
    </Box>
  );
}

export default Layout;
