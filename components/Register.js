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
import { AiFillThunderbolt } from "react-icons/ai";
import axios from "axios";
import { useForm } from "react-hook-form";

const Register = (props) => {
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

  const { setRegistryData, setLevel } = props;

  const onSubmit = (data) => {
    setRegistryData({
      fname: data.fname,
      lname: data.lname,
      age: data.age,
      city: data.city,
      country: data.country,
      phone: data.phone,
    });
    setLevel(1);
  };

  const lightField = (
    <>
      <Input
        name="fname"
        ref={register({ required: true })}
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
        name="lname"
        ref={register({ required: true })}
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
        name="age"
        ref={register({ required: true })}
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
        name="country"
        ref={register({ required: true })}
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
        name="city"
        ref={register({ required: true })}
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
        name="phone"
        ref={register({ required: true })}
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
    </>
  );

  const darkField = (
    <>
      <Input
        name="fname"
        ref={register({ required: true })}
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
          color: "rgba(210, 210, 210, 0.8)",
        }}
      />
      <Input
        name="lname"
        ref={register({ required: true })}
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
          color: "rgba(210, 210, 210, 0.8)",
        }}
      />
      <Input
        name="age"
        ref={register({ required: true })}
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
          color: "rgba(210, 210, 210, 0.8)",
        }}
      />
      <Input
        name="country"
        ref={register({ required: true })}
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
          color: "rgba(210, 210, 210, 0.8)",
        }}
      />
      <Input
        name="city"
        ref={register({ required: true })}
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
          color: "rgba(210, 210, 210, 0.8)",
        }}
      />
      <Input
        name="phone"
        ref={register({ required: true })}
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
          color: "rgba(210, 210, 210, 0.8)",
        }}
      />
    </>
  );

  return (
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
            Next
          </Button>
        </Center>
      </form>
    </Box>
  );
};

export default Register;
