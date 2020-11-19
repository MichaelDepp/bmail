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
  Textarea,
} from "@chakra-ui/react";
import Layout from "../components/Layout";
import Userinfo from "../components/Userinfo";

const Profile = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const bg = useColorModeValue("#101010", "#F8F8F8");
  const color = useColorModeValue("#101010", "#F8F8F8");
  const btn = "#FE5454";
  const sbtn = useColorModeValue("#F8F8F8", "#101010");
  const cbox = useColorModeValue(
    "rgba(64, 64, 64, 0.4)",
    "rgba(210, 210, 210, 0.4)"
  );
  const field = useColorModeValue(
    "rgba(210, 210, 210, 0.8)",
    "rgba(64, 64, 64, 0.8)"
  );
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
            Profile
          </Heading>
        </Box>
        <Userinfo />
        <Center mt={10}>
          <Button
            w={"50%"}
            size="md"
            borderRadius={5}
            fontWeight="bold"
            fontFamily={"Poppins"}
            fontSize={"xl"}
            bg={btn}
            color={color}
            _hover={{ bg: "#f76565" }}
            _active={{
              bg: { btn },
              transform: "scale(0.98)",
            }}
            _focus={{
              boxShadow:
                "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
            }}
            type="submit"
          >
            Logout
          </Button>
        </Center>
      </Box>
    </Layout>
  );
};

export default Profile;
