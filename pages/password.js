import {
  Box,
  Text,
  useColorMode,
  useColorModeValue,
  Input,
  Flex,
  Center,
  Spinner,
  Button,
} from "@chakra-ui/react";
import Signlayout from "../components/Signlayout";
import react, { useState, useEffect } from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import axios from "axios";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";

const Password = (props) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [emailConfirm, setEmailConfirm] = useState(false);
  const [uniq, setUniq] = useState(false);
  const [checking, setChecking] = useState(false);
  const [emailId, setEmailId] = useState("");
  const [userReg, setUserReg] = useState({});
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

  const { api_key } = props;

  const onPressNext = () => {
    setUserReg({
      name: "michael",
      email: emailId,
    });
    console.log(userReg);
    setEmailConfirm(true);
  };

  const onSubmit = (data) => {
    console.log(userReg);
    console.log("=======>submited data", data);
  };

  const handleChange = (text) => {
    const reg = /[^A-Za-z0-9]/;
    setEmailId(text.target.value.replace(reg, ""));
    if (text.target.value.length > 1) {
      console.log("entereddd handlee");
      if (checkEmail) {
        setChecking(true);
        clearTimeout(checkEmail);
      }
    }
  };

  const checkEmail = setTimeout(() => {
    if (emailId?.length > 0) {
      axios
        .post(api_key + "emailidcheck", { email: emailId + "@zapp.com" })
        .then((res) => {
          setChecking(false);
          if (res.data.message === "unique") {
            setUniq(true);
          } else if (res.data.message === "exists") {
            setUniq(false);
          } else {
            console.log(res.data.message);
          }
        })
        .catch((err) => console.log(err.data));
    }
  }, 2000);

  const lightField = (
    <>
      <Input
        name="password"
        ref={register({ required: true })}
        type="password"
        mb={5}
        placeholder="Set Password"
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
        name="retype"
        ref={register({ required: true })}
        type="password"
        mb={5}
        placeholder="Re-type Password"
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
        name="password"
        ref={register({ required: true })}
        type="password"
        mb={5}
        placeholder="Set Password"
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
        name="retype"
        ref={register({ required: true })}
        type="password"
        mb={5}
        placeholder="Re-type Password"
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

          {!emailConfirm ? (
            <>
              <Box mt={10}>
                <Text
                  textAlign="center"
                  color={btn}
                  fontFamily={"Poppins"}
                  fontWeight="bold"
                  fontSize={"2xl"}
                >
                  Select Email Id
                </Text>
              </Box>
              <Flex alignSelf="Flex" justifyContent="center" py="0" mt={4}>
                <Text
                  textAlign="center"
                  mr={2}
                  color={btn}
                  fontFamily={"Poppins"}
                  fontWeight="regular"
                  fontSize={"xl"}
                >
                  {emailId?.length > 0 ? emailId + "@zapp.com" : "@zapp.com"}
                </Text>
                {checking ? (
                  <Spinner size="xs" my="auto" color="white" />
                ) : uniq ? (
                  <CheckCircleIcon my="auto" color="green.500" />
                ) : (
                  <WarningIcon my="auto" color="red.500" />
                )}
              </Flex>
              <Box mt={3} pb={24}>
                {colorMode === "light" ? (
                  <Input
                    name="email"
                    ref={register({ required: true })}
                    mb={5}
                    placeholder="Preffered Email Id"
                    value={emailId}
                    border="none"
                    size="lg"
                    onChange={handleChange}
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
                ) : (
                  <Input
                    name="email"
                    ref={register({ required: true })}
                    mb={5}
                    placeholder="Preffered Email Id"
                    border="none"
                    value={emailId}
                    onChange={handleChange}
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
                )}
                <Center>
                  <Button
                    onClick={onPressNext}
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
                  >
                    Next
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
            </>
          ) : (
            <>
              <Box mt={10}>
                <Text
                  textAlign="center"
                  color={btn}
                  fontFamily={"Poppins"}
                  fontWeight="bold"
                  fontSize={"2xl"}
                >
                  Set Password
                </Text>
              </Box>

              <Box mt={16} pb={24}>
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
                      Register
                    </Button>
                  </Center>
                </form>
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
            </>
          )}
        </Box>
      </Center>
    </Signlayout>
  );
};

export default Password;
