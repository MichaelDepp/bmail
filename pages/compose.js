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
  IconButton,
  Flex,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";
import Layout from "../components/Layout";
import EmailBox from "../components/EmailBox";
import react, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "next/link";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { HiMicrophone, HiOutlineMicrophone } from "react-icons/hi";
import { useRouter } from "next/router";
import FormData from "form-data";

const Compose = (props) => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    errors,
  } = useForm();
  const { colorMode, toggleColorMode } = useColorMode();
  const [exists, setExists] = useState(false);
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [speak, setSpeak] = useState(false);
  const [received, setReceived] = useState("");
  const [receiverFin, setReceiverFin] = useState(false);
  const [inputFile, setInputFile] = useState("No File");
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
  const fileInput = useRef(null);

  const { api_key, currentUser, loggedIn } = props;
  const router = useRouter();
  const toast = useToast();
  let formData = new FormData();

  useEffect(() => {
    if (loggedIn == false) {
      router.push("/");
    }
  });

  const { terima, tajuk, cerita } = router.query;

  const commands = [
    {
      command: "receiver *",
      callback: (recev) => {
        if (receiver === "") {
          setReceiver(recev.toLowerCase());
        } else {
          setReceiver(receiver + recev.toLowerCase());
        }
        setSpeak(false);
      },
    },
    {
      command: "spell receiver *",
      callback: (recev) => {
        if (receiver === "") {
          setReceiver(recev.replace(/\s/g, "").toLowerCase());
        } else {
          setReceiver(receiver + recev.replace(/\s/g, "").toLowerCase());
        }
        setSpeak(false);
      },
    },
    {
      command: "finished" || "finish",
      callback: (recev) => {
        setReceiver(receiver + "@zapp.com");
        setSpeak(false);
      },
    },
    {
      command: "subject *",
      callback: (subj) => {
        if (subject === "") {
          setSubject(subj);
        } else {
          setSubject(subject + " " + subj);
        }
        setSpeak(false);
      },
    },
    {
      command: "message *",
      callback: (mess) => {
        if (message === "") {
          setMessage(mess);
        } else {
          setMessage(message + " " + mess);
        }
        setSpeak(false);
      },
    },
    {
      command: "delete receiver*",
      callback: (recev) => {
        setReceiver("");
        setSpeak(false);
      },
    },
    {
      command: "delete subject*",
      callback: (subj) => {
        setSubject("");
        setSpeak(false);
      },
    },
    {
      command: "delete message*",
      callback: (mess) => {
        setMessage("");
        setSpeak(false);
      },
    },
    {
      command: "dot",
      callback: (mess) => {
        setMessage(message + ".");
        setSpeak(false);
      },
    },
    {
      command: "delete",
      callback: ({ resetTranscript }) => {
        resetTranscript();
        setSpeak(false);
      },
    },
  ];

  const { transcript } = useSpeechRecognition({ commands });

  // if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
  //   return null;
  // } this line breaks iphone

  useEffect(() => {
    if (terima) {
      setReceiver(terima);
    }
    if (tajuk) {
      setSubject(tajuk);
    }
    if (cerita) {
      setMessage(cerita);
    }
  }, []);

  useEffect(() => {
    if (transcript.length > 1) {
      if (receiver.length > 10) {
        onType(receiver);
      }
    }
  });

  useEffect(() => {
    register({ name: "attachment" });
  }, []);

  const hanldeInputClick = () => {
    fileInput.current.click();
  };

  const handleFileChange = (event) => {
    setValue("attachment", event.target.files[0]);
    setInputFile(event.target.files[0].name);
  };

  const onSubmit = (data) => {
    console.log("submitted data", data);
    if (exists) {
      const sentData = new FormData();
      sentData.append("sender", currentUser);
      sentData.append("receiver", data.receiver);
      sentData.append("title", data.subject);
      sentData.append("message", data.message);
      sentData.append("timestamp", new Date());
      sentData.append("file", data.attachment);

      axios
        .post(api_key + "composemail", sentData)
        .then((res) => {
          if (res.data.message === "sent") {
            toast({
              title: "Email Sent Succesfully",
              description:
                "Your message sent successfully to " + sentData.receiver,
              status: "success",
              duration: 9000,
              isClosable: true,
            });
            goTosent();
          } else {
            toast({
              title: "Email Failed to Sent",
              description: "Your message fail to send to" + sentData.receiver,
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          }
        })
        .catch((err) => {
          setExists(false);
          console.log(err.data);
          toast({
            title: "Internet Connection",
            description: "Internet connection is weak/not found",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        });
    } else {
      toast({
        title: "Email Not Exists",
        description: "Incorrect / Non Existing Email Address",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const onType = (data) => {
    console.log("=====blurrrrr======", receiver);
    if (receiver?.length > 0) {
      console.log("entereddd handlee", receiver);
      axios
        .post(api_key + "emailidcheck", { email: receiver })
        .then((res) => {
          if (res.data.message === "exists") {
            setExists(true);
            console.log(res.data.message);
          } else if (res.data.message === "unique") {
            setExists(false);
          } else {
            console.log(res.data.message);
          }
        })
        .catch((err) => {
          setExists(false);
          console.log(err.data);
        });
    }
    setReceiverFin(false);
  };

  const goTosent = () => {
    setTimeout(function () {
      router.push("/sent");
    }, 3000);
  };

  const onChangeReceiver = (text) => {
    setReceiver(text.target.value.toLowerCase());
  };

  const onChangeSubject = (text) => {
    setSubject(text.target.value);
  };

  const onChangeMessage = (text) => {
    setMessage(text.target.value);
  };

  const darkField = (
    <>
      <Input
        name="receiver"
        ref={register({ required: true })}
        onChange={onChangeReceiver}
        onBlur={onType}
        value={receiver}
        placeholder="Receiver"
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
        name="subject"
        ref={register({ required: true })}
        onChange={onChangeSubject}
        value={subject}
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
        name="message"
        ref={register({ required: true })}
        onChange={onChangeMessage}
        value={message}
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
        name="receiver"
        value={receiver}
        ref={register({ required: true })}
        onChange={onChangeReceiver}
        placeholder="Receiver"
        onBlur={onType}
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
        name="subject"
        ref={register({ required: true })}
        onChange={onChangeSubject}
        value={subject}
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
        name="message"
        ref={register({ required: true })}
        onChange={onChangeMessage}
        value={message}
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

  const voiceStart = () => {
    SpeechRecognition.startListening();
    setSpeak(true);
  };

  const voiceStop = () => {
    SpeechRecognition.stopListening();
    setSpeak(false);
    console.log("===========trasn==========>", transcript);
  };

  if (loggedIn) {
    return (
      <Layout>
        <Box display={"block"} pb={10}>
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
          <Center>
            {speak ? (
              <IconButton
                value="start"
                onClick={voiceStop}
                colorScheme="none"
                color={btn}
                fontSize="3xl"
                _focus={{ outline: "none" }}
                icon={<HiMicrophone></HiMicrophone>}
              ></IconButton>
            ) : (
              <IconButton
                value="stop"
                onClick={voiceStart}
                colorScheme="none"
                color={btn}
                fontSize="3xl"
                _focus={{ outline: "none" }}
                icon={<HiOutlineMicrophone></HiOutlineMicrophone>}
              ></IconButton>
            )}
          </Center>
          <form onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
            <Box mt={8}>
              <Stack spacing={3}>
                {colorMode === "light" ? darkField : lightField}
              </Stack>
            </Box>
            <input
              name="attachment"
              type="file"
              ref={fileInput}
              style={{ display: "none" }}
              onChange={(e) => handleFileChange(e)}
            ></input>
            <Center mt={6} width={"80%"} mx="auto">
              <Button
                onClick={() => hanldeInputClick()}
                rightIcon={<AttachmentIcon />}
                size="sm"
                borderRadius={5}
                fontWeight="regular"
                fontFamily={"Poppins"}
                fontSize={"md"}
                px={8}
                border="2px solid #f76565"
                bg={"none"}
                color={btn}
                _hover={{ bg: "#f76565", color: "#101010" }}
                _active={{
                  bg: { btn },
                  transform: "scale(0.98)",
                }}
                _focus={{
                  boxShadow:
                    "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
                }}
              >
                Attach File
              </Button>
              <Text
                width="auto"
                ml={5}
                color={btn}
                fontSize="sm"
                fontFamily="Poppins"
                isTruncated
              >
                {inputFile}
              </Text>
            </Center>
            <Center mt={8}>
              <Button
                disabled={!exists}
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
                Send
              </Button>
            </Center>
          </form>
        </Box>
      </Layout>
    );
  }

  return <p>loading</p>;
};

export default Compose;
