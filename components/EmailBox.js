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

const EmailBox = () => {
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
  return (
    <Box bg={cbox} borderRadius={8} mb={3}>
      <HStack spacing="20px" py={2}>
        <Box ml={4}>
          <Avatar src="./new.png" name="Michael Depp" />
        </Box>
        <Box>
          <Flex justifyContent="space-between">
            <Text color={tbtn} fontSize="md">
              Michael Depp
            </Text>
            <Text color={tbtn} fontSize="sm" mr={3}>
              28 Oct 20
            </Text>
          </Flex>
          <Flex>
            <Text color={tbtn} fontSize="sm">
              Regarding Leave of Absence
            </Text>
          </Flex>
          <Flex>
            <Text color={tbtn} fontSize="sm">
              Respectable madam, I am sorry to ffifji
            </Text>
          </Flex>
        </Box>
      </HStack>
    </Box>
  );
};

export default EmailBox;
