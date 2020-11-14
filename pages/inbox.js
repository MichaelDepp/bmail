import {
  Button,
  Heading,
  useColorMode,
  useColorModeValue,
  Image,
  VStack,
  Text,
  Box,
  Center,
  Container,
  Flex,
} from "@chakra-ui/react";
import Layout from "../components/Layout";
import EmailBox from "../components/EmailBox";
import Link from "next/link";

function Inbox() {
  const { colorMode, toggleColorMode } = useColorMode();

  const bg = useColorModeValue("#101010", "#F8F8F8");
  const color = useColorModeValue("#F8F8F8", "#101010");
  const btn = "#FE5454";
  const sbtn = useColorModeValue("#F8F8F8", "#101010");
  return (
    <Layout>
      <Box display={"block"}>
        <Box mb={2}>
          <Heading
            fontWeight="bold"
            textAlign={"left"}
            fontSize={["xl", "xl", "xl", "xl"]}
            color={btn}
          >
            Inbox
          </Heading>
        </Box>
        <Box>
          <EmailBox />
          <EmailBox />
          <EmailBox />
          <EmailBox />
          <EmailBox />
          <EmailBox />
          <EmailBox />
          <EmailBox />
          <EmailBox />
          <EmailBox />
          <EmailBox />
          <EmailBox />
          <EmailBox />
          <EmailBox />
          <EmailBox />
          <EmailBox />
          <EmailBox />
          <EmailBox />
          <EmailBox />
          <EmailBox />
          <EmailBox />
          <EmailBox />
          <EmailBox />
        </Box>
      </Box>
    </Layout>
  );
}

export default Inbox;
