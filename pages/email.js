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
  useToast,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import Layout from "../components/Layout";
import react, { useState, useEffect, useCallback } from "react";
import EmailBox from "../components/EmailBox";
import Link from "next/link";
import {
  RiShareForwardFill,
  RiReplyFill,
  RiDeleteBin5Fill,
  RiExchangeFundsFill,
} from "react-icons/ri";
import { useRouter } from "next/router";
import axios from "axios";
import Artyom from "artyom.js";
import moment from "moment";

const Jarvis = new Artyom();

function Email(props) {
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
  const { api_key, currentUser, talk, setTalk } = props;
  const router = useRouter();
  const slug = router.query.slug;
  const toast = useToast();
  let emailMode;
  let timing;

  if (email?.timestamp) {
    timing = moment(email?.timestamp).fromNow();
    console.log("=======timing=====", timing);
  }

  const fetchMail = () => {
    console.log("slug========>");
    axios
      .post(api_key + "getmail", { slug: slug, user: currentUser })
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

  useEffect(() => {
    if (talk) {
      onSay();
    } else {
      Jarvis.shutUp();
    }
  });

  if (email?.currentLocation === "trash") {
    if (email?.initialLocation === "inbox") {
      emailMode = "inbox";
    } else {
      emailMode = "sent";
    }
  } else if (email?.currentLocation === "inbox") {
    emailMode = "inbox";
  } else {
    emailMode = "sent";
  }

  const onSay = () => {
    if (emailMode === "inbox") {
      Jarvis.say("Email from" + email?.senderName);
    } else {
      Jarvis.say("Email from" + email?.receiverName);
    }
    Jarvis.say("Email title" + email?.title);
    Jarvis.say("Email message" + email?.message);
  };

  const onReply = () => {
    router.push({
      pathname: "/compose",
      query: {
        terima:
          email?.initialLocation === "inbox"
            ? email?.senderEmail
            : email?.receiverEmail,
        tajuk: "Re: " + email?.title,
      },
    });
  };

  const onForward = () => {
    router.push({
      pathname: "/compose",
      query: {
        tajuk: "Fwd: " + email?.title,
        cerita: email?.message,
      },
    });
  };

  const onMove = () => {
    axios
      .post(api_key + "trashrestore", {
        userid: currentUser,
        emailid: email?.id,
        location:
          email?.currentLocation === "trash" ? email?.initialLocation : "trash",
      })
      .then((res) => {
        if (res.data.message === "moved") {
          if (email?.currentLocation === "trash") {
            toast({
              title: "Email Restored Back",
              description: "Your email successfully restored",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
          } else {
            toast({
              title: "Email Moved To Trash",
              description: "Your message successfully trashed",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
          }
          gotoCurrentLocation();
        }
      })
      .catch((err) => console.log(err.data));
  };

  const onDeletePerm = () => {
    axios
      .post(api_key + "delete", {
        userid: currentUser,
        emailid: email?.id,
      })
      .then((res) => {
        if (res.data.message === "deleted") {
          toast({
            title: "Email Deleted Permenantly!",
            description: "Your message successfully deleted permenantly",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          gotoCurrentLocation();
        }
      })
      .catch((err) => console.log(err.data));
  };

  const gotoCurrentLocation = () => {
    setTimeout(function () {
      router.push("/" + email?.currentLocation);
    }, 3000);
  };

  return (
    <Layout talk={talk} setTalk={setTalk}>
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
                <Avatar
                  src={".com"}
                  name={
                    email?.currentLocation === "trash"
                      ? email?.initialLocation === "inbox"
                        ? email?.senderName
                        : email?.receiverName
                      : email?.currentLocation === "inbox"
                      ? email?.senderName
                      : email?.receiverName
                  }
                />
              </Box>
              <Box ml={2}>
                <Flex alignItems="center">
                  <Text fontFamily="Poppins" fontWeight="semi" color={sbtn}>
                    {email?.currentLocation === "trash"
                      ? email?.initialLocation === "inbox"
                        ? email?.senderName
                        : email?.receiverName
                      : email?.currentLocation === "inbox"
                      ? email?.senderName
                      : email?.receiverName}
                  </Text>
                  <Text
                    fontFamily="Poppins"
                    fontWeight="light"
                    fontSize="0.8rem"
                    color={sbtn}
                    ml={2}
                  >
                    {timing && timing}
                  </Text>
                </Flex>
                <Text
                  fontFamily="Poppins"
                  fontWeight="light"
                  fontSize="0.8rem"
                  color={sbtn}
                >
                  {email?.currentLocation === "trash"
                    ? email?.initialLocation === "inbox"
                      ? email?.senderEmail
                      : email?.receiverEmail
                    : email?.currentLocation === "inbox"
                    ? email?.senderEmail
                    : email?.receiverEmail}
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
                  {email?.currentLocation === "trash" ? (
                    <>
                      <Button
                        onClick={onMove}
                        color={btn}
                        colorScheme="none"
                        _focus={{ outline: "none", background: "transparent" }}
                        rightIcon={<RiExchangeFundsFill />}
                      >
                        Restore
                      </Button>
                      <Button
                        onClick={onDeletePerm}
                        color={btn}
                        colorScheme="none"
                        _focus={{ outline: "none", background: "transparent" }}
                        rightIcon={<RiDeleteBin5Fill />}
                      >
                        Delete Permenantly
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={onReply}
                        color={btn}
                        colorScheme="none"
                        _focus={{ outline: "none", background: "transparent" }}
                        rightIcon={<RiReplyFill />}
                      >
                        Reply
                      </Button>
                      <Button
                        onClick={onForward}
                        color={btn}
                        colorScheme="none"
                        _focus={{ outline: "none", background: "transparent" }}
                        rightIcon={<RiShareForwardFill />}
                      >
                        Forward
                      </Button>
                      <Button
                        onClick={onMove}
                        color={btn}
                        colorScheme="none"
                        _focus={{ outline: "none", background: "transparent" }}
                        rightIcon={<RiDeleteBin5Fill />}
                      >
                        Trash
                      </Button>
                    </>
                  )}
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
