import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/router";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  FormErrorMessage,
  FormControl,
  useMediaQuery,
} from "@chakra-ui/react";
import { validate } from "email-validator";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, db } from "@/firebase/config";

import { chatModalProps } from "@/utils/types";

export const ChatModal = ({ type, title }: chatModalProps) => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [chatName, setChatName] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { id } = router.query;

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setChatName(e.currentTarget.value);
  };

  const handleSubmit = async () => {
    const { email } = user;
    switch (type) {
      case "room":
        if (chatName !== "") {
          await addDoc(collection(db, "rooms"), {
            roomName: chatName,
            users: [email],
            lastSent: serverTimestamp(),
          });
          onClose();
        } else {
          setIsValid(false);
        }
        break;
      case "chat":
        if (validate(chatName)) {
          await addDoc(collection(db, "chats"), {
            users: [email, chatName],
            lastSent: serverTimestamp(),
          });
          onClose();
        } else {
          setIsValid(false);
        }
        break;
      case "addPeople":
        await updateDoc(doc(db, "rooms", id.toString()), {
          users: arrayUnion(chatName),
        });
        onClose();
    }
  };

  const header = type === "room" ? "Create New Room" : "Add Person To Chat";
  const placeHolder = type === "room" ? "Room Name" : "Email";
  return (
    <>
      <Button size={isMobile ? "lg" : "md"} onClick={onOpen}>
        {title}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={!isValid}>
              <Input
                placeholder={placeHolder}
                value={chatName}
                onChange={handleChange}
              />
              <FormErrorMessage>
                {type === "room" ? "Cannot be empty" : "Email is required"}.
              </FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleSubmit} variant="ghost">
              {type === "room"
                ? "Create Room"
                : type === "addPeople"
                ? "Add Person"
                : "Create Chat"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
