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
import Layout from "../components/Layout";
import EmailBox from "../components/EmailBox";
import react, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "next/link";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { HiMicrophone, HiOutlineMicrophone } from "react-icons/hi";
import { useRouter } from "next/router";

const Compose = (props) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const { colorMode, toggleColorMode } = useColorMode();
  const [exists, setExists] = useState(false);
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [speak, setSpeak] = useState(false);
  const [received, setReceived] = useState("");
  const [receiverFin, setReceiverFin] = useState(false);
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

  const { api_key, currentUser } = props;
  const router = useRouter();
  const toast = useToast();

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
      },
    },
    {
      command: "super type",
      callback: (recev) => setReceiver(receiver + "@zapp.com"),
    },
    {
      command: "subject *",
      callback: (subj) => {
        if (subject === "") {
          setSubject(subj);
        } else {
          setSubject(subject + " " + subj);
        }
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
      },
    },
    {
      command: "delete receiver*",
      callback: (recev) => setReceiver(""),
    },
    {
      command: "delete subject*",
      callback: (subj) => setSubject(""),
    },
    {
      command: "delete message*",
      callback: (mess) => setMessage(""),
    },
    {
      command: "delete",
      callback: ({ resetTranscript }) => resetTranscript(),
    },
  ];

  const { transcript } = useSpeechRecognition({ commands });

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

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
    if (receiverFin) {
      onType(receiver);
    }
  });

  const onSubmit = (data) => {
    if (exists) {
      const composeData = {
        sender: currentUser,
        receiver: data.receiver,
        title: data.subject,
        message: data.message,
        timestamp: new Date(),
      };
      onSendmail(composeData);
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

  const onSendmail = (composeData) => {
    if (exists) {
      axios
        .post(api_key + "composemail", { data: composeData })
        .then((res) => {
          if (res.data.message === "sent") {
            toast({
              title: "Email Sent Succesfully",
              description:
                "Your message sent successfully to " + composeData.receiver,
              status: "success",
              duration: 9000,
              isClosable: true,
            });
            goTosent();
          } else {
            toast({
              title: "Email Failed to Sent",
              description:
                "Your message fail to send to" + composeData.receiver,
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
    }
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

  const speakNow = () => {
    console.log("speakkkk triggered");
    setReceived("");
    setSpeak(true);
  };

  const stopNow = (value) => {
    console.log(value);
    if (value.search("receiver") === 0) {
      if (value.slice(8).trim() === "clear") {
        setReceiver("");
      } else if (value.slice(8).trim() === "finish") {
        setReceiver(receiver + "@zapp.com");
        setReceiverFin(true);
      } else {
        setReceiver(receiver + value.slice(8).trim().toLowerCase());
      }
    } else if (value.search("subject") === 0) {
      if (value.slice(7).trim() === "clear") {
        setSubject("");
      } else {
        if (subject === "") {
          setSubject(subject + value.slice(7).trim());
        } else {
          setSubject(subject + value.slice(7));
        }
      }
    } else if (value.search("message") === 0) {
      if (value.slice(7).trim() === "clear") {
        setMessage("");
      } else {
        if (message === "") {
          setMessage(message + value.slice(7).trim());
        } else {
          setMessage(message + value.slice(7));
        }
      }
    } else {
      console.log("message cant categorized");
    }
    setSpeak(false);
    console.log("=======================>", received);
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
          {/* <Vocal onStart={speakNow} onResult={stopNow}>
            {(start, stop) => {
              return speak ? (
                <IconButton
                  onClick={stop}
                  colorScheme="none"
                  color={btn}
                  fontSize="3xl"
                  _focus={{ outline: "none" }}
                  icon={<HiMicrophone></HiMicrophone>}
                ></IconButton>
              ) : (
                <IconButton
                  onClick={start}
                  colorScheme="none"
                  color={btn}
                  fontSize="3xl"
                  _focus={{ outline: "none" }}
                  icon={<HiOutlineMicrophone></HiOutlineMicrophone>}
                ></IconButton>
              );
            }}
          </Vocal> */}
        </Center>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mt={8}>
            <Stack spacing={3}>
              {colorMode === "light" ? darkField : lightField}
            </Stack>
          </Box>
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
              Send
            </Button>
          </Center>
        </form>
      </Box>
    </Layout>
  );
};

export default Compose;
