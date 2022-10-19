import { useRouter } from "next/router";
import {
  Flex,
  Stack,
  HStack,
  Avatar,
  IconButton,
  Icon,
  useColorMode,
} from "@chakra-ui/react";
import { IoLogOut, IoSunny, IoMoon } from "react-icons/io5";
import { signOut } from "firebase/auth";
import { collection, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import { auth, db } from "@/firebase/config";

import ChatRooms from "@/components/ChatRoom";
import DirectMessage from "@/components/DirectMessage";

import { ChatModal } from "@/components/ChatModal";

export const Sidebar = ({ fullWidth }: { fullWidth?: boolean }) => {
  const router = useRouter();

  const { colorMode, toggleColorMode } = useColorMode();

  const [user] = useAuthState(auth);

  const [chatValues] = useCollection(
    query(collection(db, "chats"), where("users", "array-contains", user.email))
  );
  const [roomValues] = useCollection(
    query(collection(db, "rooms"), where("users", "array-contains", user.email))
  );

  const chats = chatValues?.docs.map((chat) => (
    <DirectMessage key={chat.id} id={chat.id} users={chat.data().users} />
  ));
  const rooms = roomValues?.docs.map((room) => (
    <ChatRooms key={room.id} id={room.id} data={room.data()} />
  ));

  const handleLogOut = () => {
    signOut(auth);
    router.push("/");
  };

  return (
    <Flex
      height="100vh"
      maxWidth={fullWidth ? "100vw" : "30vw"}
      width={fullWidth ? "100vw" : ""}
      direction="column"
      borderRight="1px solid"
      borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
    >
      <Flex flexWrap="wrap" direction="column" position="sticky" top="0">
        <Flex justify="space-between" height="71px" align="center" p="10px">
          <Avatar src={user.photoURL} />
          <Stack maxWidth="30vw" direction="row" align="center">
            <IconButton
              aria-label="Toggle Dark Mode"
              icon={
                colorMode === "light" ? (
                  <Icon as={IoMoon} />
                ) : (
                  <Icon as={IoSunny} />
                )
              }
              onClick={toggleColorMode}
              isRound
            />
            <IconButton
              aria-label="Sign Out"
              icon={<Icon as={IoLogOut} />}
              onClick={handleLogOut}
              isRound
            />
          </Stack>
        </Flex>
      </Flex>
      <Stack
        height="100vh"
        direction="column"
        overflow="scroll
      "
      >
        {rooms}
        {chats}
      </Stack>
      <HStack justify="space-between" p="10px">
        <ChatModal type="room" title="Create New Room" />
        <ChatModal type="chat" title="Create DM" />
      </HStack>
    </Flex>
  );
};
