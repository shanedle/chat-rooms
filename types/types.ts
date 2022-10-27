import { UserInfo } from "firebase/auth";
import { DocumentData, Timestamp } from "firebase/firestore";

export type MessageProps = {
  id: string;
  message: string;
  //createdAt: Timestamp;
  photoURL?: string;
};

export type ChatProps = {
  id: string;
  chatType: string;
  scrollRef?: any;
};

export type ChatModalProps = {
  type: "room" | "chat" | "addPerson";
  title: string;
};

export type ChatHeaderProps = {
  chatData: DocumentData;
  user: UserInfo;
};

export type ChatRoomProps = {
  id: string;
  data: DocumentData;
};

export type DirectMessageProps = {
  id: string;
  users: string[];
};
