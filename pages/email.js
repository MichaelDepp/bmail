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
  Avatar,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import Layout from "../components/Layout";
import react, { useState, useEffect } from "react";
import EmailBox from "../components/EmailBox";
import Link from "next/link";
import {
  RiShareForwardFill,
  RiReplyFill,
  RiDeleteBin5Fill,
} from "react-icons/ri";
import { useRouter } from "next/router";
import axios from "axios";

function Email() {
  const [email, setEmail] = useState({});
  const [loading, setLoading] = useState(true);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState("bottom");
  const bg = useColorModeValue("#101010", "#F8F8F8");
  const color = useColorModeValue("#101010", "#F8F8F8");
  const btn = "#FE5454";
  const sbtn = useColorModeValue("#F8F8F8", "#101010");
  const cbox = useColorModeValue(
    "rgba(64, 64, 64, 0.4)",
    "rgba(210, 210, 210, 0.4)"
  );
  const navclr = useColorModeValue(
    "rgba(16, 16, 16, 0.9)",
    "rgba(248, 248, 248, 0.9)"
  );
  const field = useColorModeValue(
    "rgba(210, 210, 210, 0.8)",
    "rgba(64, 64, 64, 0.8)"
  );
  const api_key = "https://zapp-serv.herokuapp.com/getmail/";
  const router = useRouter();
  const slug = router.query.slug;

  const fetchMail = () => {
    console.log("slug========>");
    axios
      .post(api_key, { slug: slug })
      .then((res) => {
        setEmail(res.data.message);
        console.log("getmail==========>", res.data.message);
        setLoading(false);
      })
      .catch((err) => console.log(err.data));
  };

  useEffect(() => {
    fetchMail();
  }, []);

  const darkField = (
    <>
      <Input
        placeholder="To"
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
        }}
      />
      <Input
        placeholder="Subject"
        border="none"
        size="lg"
        background={cbox}
        fontFamily={"Poppins"}
        fontWeight={"semi"}
        fontSize={"md"}
        _placeholder={{
          fontFamily: "Poppins",
          fontWeight: "semi",
          fontSize: "md",
        }}
      />

      <Textarea
        placeholder="Message"
        height={"350px"}
        border="none"
        size="lg"
        background={cbox}
        fontFamily={"Poppins"}
        fontWeight={"semi"}
        fontSize={"md"}
        _placeholder={{
          fontFamily: "Poppins",
          fontWeight: "semi",
          fontSize: "md",
        }}
      />
    </>
  );

  const lightField = (
    <>
      <Input
        placeholder="To"
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
        placeholder="Subject"
        border="none"
        size="lg"
        background={cbox}
        fontFamily={"Poppins"}
        fontWeight={"semi"}
        fontSize={"md"}
        _placeholder={{
          fontFamily: "Poppins",
          fontWeight: "semi",
          fontSize: "md",
          color: "rgba(64, 64, 64, 0.8)",
        }}
      />
      <Textarea
        placeholder="Message"
        height={"350px"}
        border="none"
        size="lg"
        background={cbox}
        fontFamily={"Poppins"}
        fontWeight={"semi"}
        fontSize={"md"}
        _placeholder={{
          fontFamily: "Poppins",
          fontWeight: "semi",
          fontSize: "md",
          color: "rgba(64, 64, 64, 0.8)",
        }}
      />
    </>
  );

  return (
    <Layout>
      <Box display={"block"}>
        <Box mb={2} mt={5}>
          <Heading
            fontWeight="bold"
            textAlign={"left"}
            fontSize={["xl", "xl", "xl", "xl"]}
            color={btn}
          >
            {email?.title}
          </Heading>
        </Box>
        <Box mt={5}>
          <Flex justifyContent="space-between">
            <Flex>
              <Box>
                <Avatar src={".com"} name={email?.receiverName} />
              </Box>
              <Box ml={2}>
                <Flex alignItems="center">
                  <Text fontFamily="Poppins" fontWeight="semi" color={sbtn}>
                    {email?.receiverName}
                  </Text>
                  <Text
                    fontFamily="Poppins"
                    fontWeight="light"
                    fontSize="0.8rem"
                    color={sbtn}
                    ml={2}
                  >
                    {email?.timestamp}
                  </Text>
                </Flex>
                <Text
                  fontFamily="Poppins"
                  fontWeight="light"
                  fontSize="0.8rem"
                  color={sbtn}
                >
                  {email?.receiverEmail}
                </Text>
              </Box>
            </Flex>
            <Box>
              <IconButton
                onClick={onOpen}
                colorScheme="none"
                color={btn}
                size="lg"
                _focus={{ outline: "none" }}
                icon={<SettingsIcon />}
              />
            </Box>
          </Flex>
          <Stack spacing={3} mt={5}>
            <Box width="100%">
              <Text
                textAlign="left"
                fontFamily="Poppins"
                fontWeight="regular"
                fontSize="md"
                color={sbtn}
              >
                {email?.message}
              </Text>
            </Box>
          </Stack>
        </Box>
        <Drawer
          placement={placement}
          onClose={onClose}
          isOpen={isOpen}
          size={"xl"}
        >
          <DrawerOverlay>
            <DrawerContent bg={navclr}>
              <Center h="100%">
                <Stack direction="column" spacing={4} my={5}>
                  <Button
                    color={btn}
                    colorScheme="none"
                    _focus={{ outline: "none", background: "transparent" }}
                    rightIcon={<RiReplyFill />}
                  >
                    Reply
                  </Button>
                  <Button
                    color={btn}
                    colorScheme="none"
                    _focus={{ outline: "none", background: "transparent" }}
                    rightIcon={<RiShareForwardFill />}
                  >
                    Forward
                  </Button>
                  <Button
                    color={btn}
                    colorScheme="none"
                    _focus={{ outline: "none", background: "transparent" }}
                    rightIcon={<RiDeleteBin5Fill />}
                  >
                    Trash
                  </Button>
                </Stack>
              </Center>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </Box>
    </Layout>
  );
}

export default Email;
