import { UserInfo } from "firebase/auth";
import { DocumentData, Timestamp } from "firebase/firestore";

export type chatProps = {
  id: string;
  chatType: string;
  scrollRef?: any;
};

export type chatModalProps = {
  type: "room" | "chat" | "addPerson";
  title: string;
};

export type messageProps = {
  message: string;
  //createdAt: Timestamp;
  photoURL?: string;
  id: string;
};

export type chatHeadertypes = {
  chatData: DocumentData;
  user: UserInfo;
};

export type chatRoomProps = {
  data: DocumentData;
  id: string;
};

export type directMessageProps = {
  users: string[];
  id: string;
};
