import {
  Box,
  Wrap,
  useColorMode,
  useColorModeValue,
  Avatar,
  WrapItem,
  Grid,
  Image,
  Text,
  Flex,
  Spacer,
  GridItem,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";

const EmailBox = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const bg = useColorModeValue("#101010", "#F8F8F8");
  const color = useColorModeValue("#F8F8F8", "#101010");
  const btn = "#FE5454";
  const sbtn = useColorModeValue("#F8F8F8", "#101010");
  const tbtn = useColorModeValue("#F8F8F8", "#101010");
  const cbox = useColorModeValue(
    "rgba(64, 64, 64, 0.4)",
    "rgba(210, 210, 210, 0.4)"
  );
  const { data, name } = props;
  return (
    <Link
      href={{
        pathname: "/email/",
        query: { slug: data.id },
      }}
    >
      <Box bg={cbox} borderRadius={8} mb={3}>
        <HStack spacing="20px" py={2}>
          <Box ml={4}>
            <Avatar src={data?.img} name={name} />
          </Box>
          <Box>
            <Flex justifyContent="space-between">
              <Text color={tbtn} fontSize="md">
                {name}
              </Text>
              <Text color={tbtn} fontSize="sm" mr={3}>
                {data?.timestamp}
              </Text>
            </Flex>
            <Flex>
              <Text color={tbtn} fontSize="sm">
                {data?.title}
              </Text>
            </Flex>
            <Flex>
              <Text color={tbtn} fontSize="sm" noOfLines={2}>
                {data?.message}
              </Text>
            </Flex>
          </Box>
        </HStack>
      </Box>
    </Link>
  );
};

export default EmailBox;
