import { Flex, Avatar, Box, Text, useColorMode } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "@/lib/firebase";

import { MessageProps } from "@/types";

export const Message = ({ message, photoURL, id }: MessageProps) => {
  const { colorMode } = useColorMode();

  const [user] = useAuthState(auth);
  const { uid } = user;

  const bgColor = { light: "gray.300", dark: "gray.600" };
  const textColor = { light: "black", dark: "white" };

  return (
    <Flex py={2} w="100%" direction={uid == id ? "row-reverse" : "row"}>
      <Avatar src={photoURL || ""} />
      <Flex align={uid == id ? "end" : "start"}>
        <Box
          bg={uid == id ? "blue.500" : bgColor[colorMode]}
          w="fit-content"
          py={1}
          px={3}
          rounded="xl"
          margin={2}
          position="relative"
          wordBreak="break-word"
          color={uid == id ? "white" : textColor[colorMode]}
        >
          <Text>{message}</Text>
        </Box>
      </Flex>
    </Flex>
  );
};
