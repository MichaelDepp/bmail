import {
  Box,
  Text,
  Flex,
  useColorMode,
  useColorModeValue,
  Avatar,
  Center,
  Icon,
} from "@chakra-ui/react";
import { MdLocationOn } from "react-icons/md";

const Userinfo = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const bg = useColorModeValue("#101010", "#F8F8F8");
  const color = useColorModeValue("#101010", "#F8F8F8");
  const btn = "#FE5454";
  const sbtn = useColorModeValue("#F8F8F8", "#101010");
  const { data } = props;
  return (
    <Box mt={6}>
      <Box width={220} mx="auto">
        <Avatar
          border={"5px #FE5454 solid"}
          size="4xl"
          src="./new.png"
          name={data.profile.fname + " " + data.profile.lname}
        />
      </Box>
      <Box mt={5}>
        <Text
          textAlign="center"
          fontFamily="Poppins"
          fontWeight="semi"
          fontSize={"2xl"}
          color={sbtn}
        >
          {data.profile.fname + " " + data.profile.lname}
        </Text>
        <Text
          textAlign="center"
          fontFamily="Poppins"
          fontWeight="medium"
          fontSize={"sm"}
          color={sbtn}
        >
          {data.profile.age + " years old"}
        </Text>
        <Flex justifyContent="center">
          <Icon as={MdLocationOn} mr={2}></Icon>
          <Text
            textAlign="center"
            fontFamily="Poppins"
            fontWeight="medium"
            fontSize={"sm"}
            color={sbtn}
          >
            {data.profile.location}
          </Text>
        </Flex>
      </Box>
      <Center mt={8} pb={10}>
        <Flex width={"60vw"} justifyContent="space-between">
          <Box>
            <Text
              textAlign="center"
              fontFamily="Poppins"
              fontWeight={"bold"}
              color={sbtn}
              fontSize={"md"}
            >
              Inbox
            </Text>
            <Text
              textAlign="center"
              fontFamily="Poppins"
              fontWeight={"medium"}
              color={sbtn}
              fontSize={"md"}
            >
              {data.inbox}
            </Text>
          </Box>
          <Box>
            <Text
              textAlign="center"
              fontFamily="Poppins"
              fontWeight={"bold"}
              color={sbtn}
              fontSize={"md"}
            >
              Sent
            </Text>
            <Text
              textAlign="center"
              fontFamily="Poppins"
              fontWeight={"medium"}
              color={sbtn}
              fontSize={"md"}
            >
              {data.sent}
            </Text>
          </Box>
          <Box>
            <Text
              textAlign="center"
              fontFamily="Poppins"
              fontWeight={"bold"}
              color={sbtn}
              fontSize={"md"}
            >
              Trash
            </Text>
            <Text
              textAlign="center"
              fontFamily="Poppins"
              fontWeight={"medium"}
              color={sbtn}
              fontSize={"md"}
            >
              {data.trash}
            </Text>
          </Box>
        </Flex>
      </Center>
    </Box>
  );
};

export default Userinfo;
