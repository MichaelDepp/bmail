import {
  Box,
  Text,
  useColorMode,
  useColorModeValue,
  Input,
  Flex,
  Center,
  Button,
  Image,
} from "@chakra-ui/react";
import react, { useState, useEffect } from "react";
import Register from "../components/Register";
import Checkmail from "../components/Checkmail";
import Passwordset from "../components/Passwordset";
import Signlayout from "../components/Signlayout";
import { AiFillThunderbolt } from "react-icons/ai";
import axios from "axios";
import { useForm } from "react-hook-form";

const Signup = (props) => {
  const [level, setLevel] = useState(0);
  const [registryData, setRegistryData] = useState({});
  const [done, setDone] = useState(false);
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

  const sucessClr = "#48BB78";

  const { api_key } = props;

  useEffect(() => {
    if (done) {
      console.log(registryData);
      onRegister();
    }
  });

  const onRegister = () => {
    console.log("=======>from signuppppp data", registryData);

    axios
      .post(api_key + "registeruser", { data: registryData })
      .then((res) => {
        if (res.data.message === "complete") {
          setLevel(3);
        }
      })
      .catch((err) => console.log(err.data));
  };

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
              color={level === 3 ? sucessClr : btn}
              fontFamily={"Poppins"}
              fontWeight="bold"
              fontSize={"2xl"}
            >
              {level === 3
                ? "Your Account has been created Successfully"
                : "SIGN UP"}
            </Text>
          </Box>
          <Box mt={16} pb={24}>
            {level === 0 && (
              <Register setRegistryData={setRegistryData} setLevel={setLevel} />
            )}
            {level === 1 && (
              <Checkmail
                setRegistryData={setRegistryData}
                registryData={registryData}
                setLevel={setLevel}
                api_key={api_key}
              />
            )}
            {level === 2 && (
              <Passwordset
                registryData={registryData}
                setRegistryData={setRegistryData}
                setDone={setDone}
              />
            )}
            {level === 3 && (
              <>
                <Center>
                  <Box>
                    <Image
                      boxSize={200}
                      src="./register.svg"
                      alt="Segun Adebayo"
                    />
                  </Box>
                </Center>
                <Center>
                  <Text
                    mt={5}
                    textAlign="center"
                    color={sucessClr}
                    fontFamily={"Poppins"}
                    fontWeight="regular"
                    fontSize={"lg"}
                  >
                    {"Your Email : " + registryData.email}
                  </Text>
                </Center>
                <Center mt={5}>
                  <a href="/" style={{ width: "100%" }}>
                    <Button
                      w={"100%"}
                      size="lg"
                      fontSize={"md"}
                      borderRadius={5}
                      fontWeight="bold"
                      fontFamily={"Poppins"}
                      fontSize={"md"}
                      bg={sucessClr}
                      color={color}
                      _hover={{ bg: "#C6F6D5" }}
                      _active={{
                        bg: { btn },
                        transform: "scale(0.98)",
                      }}
                      _focus={{
                        boxShadow:
                          "0 0 1px 2px rgba(198, 246, 213, .75), 0 1px 1px rgba(0, 0, 0, .15)",
                      }}
                    >
                      Done
                    </Button>
                  </a>
                </Center>
              </>
            )}
          </Box>
        </Box>
      </Center>
    </Signlayout>
  );
};

export default Signup;
