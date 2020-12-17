import {
  Button,
  Heading,
  useColorMode,
  useColorModeValue,
  Image,
  VStack,
  Text,
  Box,
  Center,
  Container,
  Flex,
} from "@chakra-ui/react";
import Layout from "../components/Layout";
import EmailBox from "../components/EmailBox";
import { useRouter } from "next/router";
import react, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Spinner from "../components/Spinner";

function Trash(props) {
  const [trash, setTrash] = useState({});
  const [loading, setLoading] = useState(true);
  const { colorMode, toggleColorMode } = useColorMode();

  const bg = useColorModeValue("#101010", "#F8F8F8");
  const color = useColorModeValue("#F8F8F8", "#101010");
  const btn = "#FE5454";
  const sbtn = useColorModeValue("#F8F8F8", "#101010");
  const { setLoggedIn, api_key, currentUser, loggedIn } = props;
  const router = useRouter();

  useEffect(() => {
    if (loggedIn == false) {
      router.push("/");
    }
  });

  const fetchTrash = () => {
    axios
      .post(api_key + "gettrash", { user: currentUser })
      .then((res) => {
        setTrash(res.data);
        console.log("gettrash==========>", res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err.data));
  };

  useEffect(() => {
    if (loggedIn) {
      fetchTrash();
    }
  }, []);

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
            Trash
          </Heading>
        </Box>
        {loading ? (
          <Spinner />
        ) : (
          <Box>
            {trash.trash.map((item, index) => {
              return <EmailBox key={index} data={item} />;
            })}
          </Box>
        )}
      </Box>
    </Layout>
  );

  return <p>Loading</p>;
}

export default Trash;
