import { useRouter } from "next/router";
import {
  Avatar,
  AvatarGroup,
  Box,
  Flex,
  Heading,
  IconButton,
  Text,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import { IoArrowBack } from "react-icons/io5";
import { formatDistanceToNowStrict } from "date-fns";

import { ChatHeaderProps } from "@/types";

import { ChatModal } from "@/components/ChatModal";

const RoomsHeader = ({ chatData, user }: ChatHeaderProps) => {
  const [isMobile] = useMediaQuery("(max-width: 680px)");
  const { colorMode } = useColorMode();
  const router = useRouter();

  const otherUsers = chatData.users?.filter(
    (singleUser) => user.email !== singleUser
  );

  const userAvatars = otherUsers?.map((singleUser) => (
    <Avatar key={Math.random()} name={singleUser} />
  ));

  const timeAgo = chatData.lastSent
    ? `Active ${formatDistanceToNowStrict(
        new Date(chatData?.lastSent.toDate())
      )}  ago`
    : "Not available";

  return (
    <Flex
      align="center"
      justify="space-between"
      width="100%"
      p="10px"
      borderBottom="1px solid"
      borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
      direction="row"
    >
      <Flex align="center">
        {isMobile && (
          <IconButton
            aria-label="Go Back"
            icon={<IoArrowBack />}
            mr="10px"
            size="md"
            onClick={() => router.push("/")}
            isRound
          />
        )}

        <AvatarGroup size="md" max={isMobile ? 1 : 4}>
          {userAvatars}
        </AvatarGroup>
      </Flex>
      <Box maxWidth="70%">
        <Heading size={isMobile ? "md" : "lg"}>{chatData.roomName}</Heading>
        {!isMobile && <Text>{timeAgo}</Text>}
      </Box>
      <ChatModal type="addPerson" title="Add Person" />
    </Flex>
  );
};

export default RoomsHeader;
