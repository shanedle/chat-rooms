import { FC } from "react";
import { useRouter } from "next/router";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  IconButton,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { formatDistanceToNowStrict } from "date-fns";
import { collection, query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { db } from "@/firebase/config";

import { chatHeadertypes } from "@/utils/types";

const DirectMessageHeader: FC<chatHeadertypes> = ({ chatData, user }) => {
  const { colorMode } = useColorMode();

  const router = useRouter();

  const filtered = chatData?.users?.filter(
    (singleUser) => singleUser !== user.email
  )[0];

  const [foundUser] = useCollectionData(
    query(collection(db, "users"), where("email", "==", filtered))
  );

  const headingName = foundUser?.length ? foundUser?.[0]?.email : filtered;

  const timeAgo = foundUser?.length
    ? `Active ${formatDistanceToNowStrict(
        new Date(foundUser?.[0].lastActive.toDate())
      )}  ago`
    : "Not available";

  return (
    <Flex
      align="center"
      width="100%"
      height="71px"
      p="10px"
      overflow="hidden"
      borderBottom="1px solid"
      borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
      maxWidth="100%"
    >
      <IconButton
        aria-label="Go Back"
        icon={<ArrowBackIcon />}
        mr="10px"
        size="md"
        onClick={() => router.push("/")}
        isRound
      />
      {foundUser?.length ? (
        <Avatar
          mr={4}
          name={foundUser?.[0].displayName}
          src={foundUser?.[0].photoURL}
        />
      ) : (
        <Avatar
          mr={4}
          name={filtered}
          bg={colorMode === "light" ? "teal.600" : "teal.500"}
        />
      )}
      <Box maxWidth="70%">
        <Heading size="md">{headingName}</Heading>
        <Text>{timeAgo}</Text>
      </Box>
    </Flex>
  );
};

export default DirectMessageHeader;
