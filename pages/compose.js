import {
  Button,
  Heading,
  useColorMode,
  useColorModeValue,
  Image,
  Stack,
  Text,
  Box,
  Center,
  Container,
  Flex,
  Input,
} from "@chakra-ui/react";
import Layout from "../components/Layout";
import EmailBox from "../components/EmailBox";
import Link from "next/link";

function Compose() {
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
            Compose
          </Heading>
        </Box>
        <Box>
          <Stack spacing={3}>
            <Input placeholder="To" size="lg" />
            <Input placeholder="Subject" size="lg" />
          </Stack>
        </Box>
      </Box>
    </Layout>
  );
}

export default Compose;
