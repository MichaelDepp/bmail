import {
  Box,
  Text,
  useColorMode,
  useColorModeValue,
  Input,
  Flex,
  Center,
  Button,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import react, { useEffect } from "react";
import Signlayout from "../components/Signlayout";
import { AiFillThunderbolt } from "react-icons/ai";
import axios from "axios";
import localStorage from "localStorage";
import { useForm } from "react-hook-form";

const Index = (props) => {
  const { register, handleSubmit, watch, errors } = useForm();
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
  const router = useRouter();

  const { setLoggedIn, loggedIn, api_key, setCurrentUser, currentUser } = props;

  useEffect(() => {
    if (loggedIn) {
      router.push("/inbox");
    }
  });

  const setLocal = (username) => {
    localStorage.setItem(
      "zapp_login",
      JSON.stringify({
        user: username,
        login: true,
        expires: new Date(Date.now() + 3600000 * 24 * 7),
      })
    );
  };

  const toast = useToast();

  const onSubmit = (data) => {
    axios
      .post(api_key, data)
      .then((res) => {
        if (res.data.message === "success") {
          setLocal(res.data.user);
          setCurrentUser(res.data.user);
          toast({
            title: "Login Succesfull",
            description: "You're succefully logged in.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          setLoggedIn(true);
        } else if (res.data.message === "error") {
          toast({
            title: "Login Failed",
            description: "Wrong email/password entered.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else {
          toast({
            title: "No Internet",
            description: "Internet connection loss.",
            status: "warning",
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .catch((err) => console.log(err.data));
  };

  const lightField = (
    <>
      <Input
        name="email"
        ref={register({ required: true })}
        mb={5}
        placeholder="Email"
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
        name="password"
        ref={register({ required: true })}
        mb={8}
        placeholder="Password"
        type={"password"}
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
    </>
  );

  const darkField = (
    <>
      <Input
        name="email"
        ref={register({ required: true })}
        mb={5}
        placeholder="Email"
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
          color: "rgba(210, 210, 210, 0.8)",
        }}
      />
      <Input
        name="password"
        ref={register({ required: true })}
        mb={8}
        placeholder="Password"
        type={"password"}
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
          color: "rgba(210, 210, 210, 0.8)",
        }}
      />
    </>
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
              SIGN IN
            </Text>
          </Box>

          <Box mt={16}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {colorMode === "light" ? darkField : lightField}
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
                  Sign In
                </Button>
              </Center>
            </form>
            <Center>
              <Text
                mt={3}
                textAlign="center"
                color={sbtn}
                fontFamily={"Poppins"}
                fontWeight="medium"
                fontSize={"sm"}
              >
                Don't have an account ?
              </Text>
              <Link href={"/signup"}>
                <Text
                  cursor="pointer"
                  mt={3}
                  pl={1}
                  textAlign="center"
                  color={btn}
                  fontFamily={"Poppins"}
                  fontWeight="semi"
                  fontSize={"sm"}
                >
                  Sign Up
                </Text>
              </Link>
            </Center>
          </Box>
        </Box>
      </Center>
    </Signlayout>
  );
};

export default Index;
