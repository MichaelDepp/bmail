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
import react, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

function Trash(props) {
  const [trash, setTrash] = useState({});
  const [loading, setLoading] = useState(true);
  const { colorMode, toggleColorMode } = useColorMode();

  const bg = useColorModeValue("#101010", "#F8F8F8");
  const color = useColorModeValue("#F8F8F8", "#101010");
  const btn = "#FE5454";
  const sbtn = useColorModeValue("#F8F8F8", "#101010");
  const { setLoggedIn, api_key, currentUser } = props;

  const fetchTrash = () => {
    axios
      .get(api_key + "gettrash", { user: currentUser })
      .then((res) => {
        setTrash(res.data);
        console.log("gettrash==========>", res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err.data));
  };

  useEffect(() => {
    fetchTrash();
  }, []);

  if (loading) {
    return <p>loading</p>;
  }
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
        <Box>
          {trash.trash.map((item, index) => {
            return (
              <EmailBox key={index} data={item} name={item.receivername} />
            );
          })}
        </Box>
      </Box>
    </Layout>
  );
}

export default Trash;
