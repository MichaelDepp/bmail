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

function Sent(props) {
  const [sent, setSent] = useState({});
  const [loading, setLoading] = useState(true);
  const { colorMode, toggleColorMode } = useColorMode();

  const bg = useColorModeValue("#101010", "#F8F8F8");
  const color = useColorModeValue("#F8F8F8", "#101010");
  const btn = "#FE5454";
  const sbtn = useColorModeValue("#F8F8F8", "#101010");
  const api_key = "https://zapp-serv.herokuapp.com/";
  const { setLoggedIn } = props;

  const fetchSent = () => {
    axios
      .get(api_key + "getsent")
      .then((res) => {
        setSent(res.data);
        console.log("getsent==========>", res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err.data));
  };

  useEffect(() => {
    fetchSent();
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
            Sent
          </Heading>
        </Box>
        <Box>
          {sent.sent.map((item, index) => {
            console.log(item);
            return (
              <EmailBox key={index} data={item} name={item.receiverName} />
            );
          })}
        </Box>
      </Box>
    </Layout>
  );
}

export default Sent;