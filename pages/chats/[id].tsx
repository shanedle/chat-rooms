import { FC, useRef } from "react";
import { useRouter } from "next/router";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import { doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";

import { auth, db } from "@/firebase/config";

import DirectMessageHeader from "@/components/DirectMessage/DirectMessageHeader";
import { ChatMessages } from "@/components/ChatMessages";
import { ChatBox } from "@/components/ChatBox";
import { Sidebar } from "@/components/Sidebar";
import { Container } from "@/components/Container";

const Chatroom: FC = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { id } = router.query;
  const lastMessage = useRef(null);
  const [values] = useDocumentData(doc(db, "chats", id.toString()));

  return (
    <Container>
      {!isMobile && <Sidebar />}
      <Flex direction="column" grow="1" height="100vh" maxWidth="100%">
        {values && <DirectMessageHeader chatData={values} user={user} />}
        <ChatMessages
          scrollRef={lastMessage}
          chatType="chats"
          id={id.toString()}
        />
        <ChatBox scrollRef={lastMessage} id={id.toString()} chatType="chats" />
      </Flex>
    </Container>
  );
};

export default Chatroom;
