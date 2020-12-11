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
  useToast,
} from "@chakra-ui/react";
import Signlayout from "../components/Signlayout";
import react, { useState, useEffect } from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import axios from "axios";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";

const Passwordset = (props) => {
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

  const { api_key, setRegistryData, registryData, setDone } = props;

  const toast = useToast;

  const onSubmit = async (data) => {
    if (data.password === data.retype) {
      console.log("========password on submit==========", data.password);
      setRegistryData({
        ...registryData,
        password: data.password,
      });
      setDone(true);
    } else {
      toast({
        title: "Password Mismatch",
        description: "Password & Retyped Password Mismatch",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

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
          By using this app, you agree to our<br></br> Terms of Use and Privacy
          Policy
        </Text>
      </Box>
    </>
  );
};

export default Passwordset;
