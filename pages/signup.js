import {
  Box,
  Text,
  useColorMode,
  useColorModeValue,
  Input,
  Flex,
  Center,
  Button,
} from "@chakra-ui/react";
import Signlayout from "../components/Signlayout";
import Setpassword from "../components/Setpassword";
import { AiFillThunderbolt } from "react-icons/ai";

const Signup = () => {
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
    <Signlayout>
      <Center>
        <Box w={"90%"}>
          <Flex justifyContent="center" pt={10}>
            <AiFillThunderbolt
              color={btn}
              fontSize={"80"}
              onClick={toggleColorMode}
            />
          </Flex>
          <Box mt={10}>
            <Text
              textAlign="center"
              color={btn}
              fontFamily={"Poppins"}
              fontWeight="bold"
              fontSize={"2xl"}
            >
              SIGN UP
            </Text>
          </Box>

          <Box mt={16} pb={24}>
            <Input
              mb={5}
              placeholder="First Name"
              border="none"
              size="lg"
              background={cbox}
              fontFamily={"Poppins"}
              fontWeight={"semi"}
              fontSize={"md"}
              textColor={sbtn}
              _placeholder={{
                fontFamily: "Poppins",
                fontWeight: "semi",
                fontSize: "md",
                color: "rgba(64, 64, 64, 0.8)",
              }}
            />
            <Input
              mb={5}
              placeholder="Last Name"
              border="none"
              size="lg"
              background={cbox}
              fontFamily={"Poppins"}
              fontWeight={"semi"}
              fontSize={"md"}
              textColor={sbtn}
              _placeholder={{
                fontFamily: "Poppins",
                fontWeight: "semi",
                fontSize: "md",
                color: "rgba(64, 64, 64, 0.8)",
              }}
            />
            <Input
              mb={5}
              placeholder="Age"
              type={"number"}
              border="none"
              size="lg"
              background={cbox}
              fontFamily={"Poppins"}
              fontWeight={"semi"}
              fontSize={"md"}
              textColor={sbtn}
              _placeholder={{
                fontFamily: "Poppins",
                fontWeight: "semi",
                fontSize: "md",
                color: "rgba(64, 64, 64, 0.8)",
              }}
            />
            <Input
              mb={5}
              placeholder="Country"
              border="none"
              size="lg"
              background={cbox}
              fontFamily={"Poppins"}
              fontWeight={"semi"}
              fontSize={"md"}
              textColor={sbtn}
              _placeholder={{
                fontFamily: "Poppins",
                fontWeight: "semi",
                fontSize: "md",
                color: "rgba(64, 64, 64, 0.8)",
              }}
            />
            <Input
              mb={8}
              placeholder="City"
              border="none"
              size="lg"
              background={cbox}
              fontFamily={"Poppins"}
              fontWeight={"semi"}
              fontSize={"md"}
              textColor={sbtn}
              _placeholder={{
                fontFamily: "Poppins",
                fontWeight: "semi",
                fontSize: "md",
                color: "rgba(64, 64, 64, 0.8)",
              }}
            />
            <Input
              mb={8}
              placeholder="Phone Number"
              border="none"
              size="lg"
              background={cbox}
              fontFamily={"Poppins"}
              fontWeight={"semi"}
              fontSize={"md"}
              textColor={sbtn}
              _placeholder={{
                fontFamily: "Poppins",
                fontWeight: "semi",
                fontSize: "md",
                color: "rgba(64, 64, 64, 0.8)",
              }}
            />
            <Center>
              <Button
                w={"100%"}
                size="lg"
                fontSize={"md"}
                borderRadius={5}
                fontWeight="bold"
                fontFamily={"Poppins"}
                fontSize={"md"}
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
                Sign Up
              </Button>
            </Center>
            <Text
              mt={3}
              textAlign="center"
              color={sbtn}
              fontFamily={"Poppins"}
              fontWeight="medium"
              fontSize={"sm"}
            >
              By using this app, you agree to our<br></br> Terms of Use and
              Privacy Policy
            </Text>
          </Box>
        </Box>
      </Center>
    </Signlayout>
  );
};

export default Signup;
