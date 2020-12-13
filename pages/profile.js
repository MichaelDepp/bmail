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
} from "@chakra-ui/react";
import Layout from "../components/Layout";
import Link from "next/link";
import react, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import localStorage from "localStorage";
import Userinfo from "../components/Userinfo";

const Profile = (props) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
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
  const { setLoggedIn, loggedIn, api_key, currentUser, setCurrentUser } = props;
  const router = useRouter();

  useEffect(() => {
    if (loggedIn == false) {
      router.push("/");
    }
  });

  const fetchProfile = () => {
    axios
      .post(api_key + "getprofile", { user: currentUser })
      .then((res) => {
        setData(res.data);
        console.log("getprofile==========>", res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err.data));
  };

  useEffect(() => {
    if (loggedIn) {
      fetchProfile();
    }
  }, []);

  if (loading) {
    return <p>loading</p>;
  }

  const onLogout = () => {
    setLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem("zapp_login");
    router.push("/");
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
            Profile
          </Heading>
        </Box>
        <Userinfo data={data} />
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
            onClick={onLogout}
          >
            Logout
          </Button>
        </Center>
      </Box>
    </Layout>
  );
};

export default Profile;
