import { useState } from "react";
import { Button, Flex, FormControl, Input } from "@chakra-ui/react";
import { IoSend } from "react-icons/io5";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, db } from "@/firebase/config";

import { chatProps } from "@/utils/types";

export const ChatBox = ({ scrollRef, id, chatType }: chatProps) => {
  const [user] = useAuthState(auth);
  const messageRef = collection(db, `${chatType}`, id, "messages");
  const [chat, setChat] = useState("");

  const handleChange = (e) => {
    setChat(e.target.value);
  };

  const sendMessage = async (e) => {
    const { uid, photoURL } = user;
    e.preventDefault();
    if (chat !== "")
      await addDoc(messageRef, {
        Message: chat,
        createdAt: serverTimestamp(),
        uid,
        photoURL,
      });
    setChat("");
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <Flex direction="row" position="sticky" bottom={0}>
      <FormControl
        p={2}
        zIndex={3}
        as="form"
        display="flex"
        alignItems="center"
      >
        <Input
          size="lg"
          value={chat}
          onChange={handleChange}
          placeholder="Type your message here..."
        />
        <Button
          leftIcon={<IoSend />}
          size="lg"
          type="submit"
          onClick={sendMessage}
        >
          Send
        </Button>
      </FormControl>
    </Flex>
  );
};
