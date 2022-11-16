import { useRef } from "react";
import { useRouter } from "next/router";
import { doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Flex, useMediaQuery } from "@chakra-ui/react";

import { auth, db } from "@/lib/firebase";

import RoomsHeader from "@/components/ChatRoom/RoomsHeader";
import { ChatMessages } from "@/components/ChatMessages";
import { ChatBox } from "@/components/ChatBox";
import { Sidebar } from "@/components/Sidebar";
import { Container } from "@/components/Container";

const Chatroom = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { id } = router.query;
  const lastMessage = useRef(null);
  const [values] = useDocumentData(doc(db, "rooms", id.toString()));

  return (
    <Container>
      {!isMobile && <Sidebar />}
      <Flex direction="column" grow="1" height="100vh">
        <Flex height="71px">
          {values && <RoomsHeader chatData={values} user={user} />}
        </Flex>
        <ChatMessages
          scrollRef={lastMessage}
          chatType="rooms"
          id={id.toString()}
        />
        <ChatBox scrollRef={lastMessage} id={id.toString()} chatType="rooms" />
      </Flex>
    </Container>
  );
};

export default Chatroom;
