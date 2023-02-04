import { UserInfo } from "firebase/auth";
import { DocumentData, Timestamp } from "firebase/firestore";

export interface Message {
  id: string;
  message: string;
  //createdAt: Timestamp;
  photoURL?: string;
}

export interface Chat {
  id: string;
  chatType: string;
  scrollRef?: any;
}

export interface ChatModal {
  type: "room" | "chat" | "addPerson";
  title: string;
}

export interface ChatHeader {
  chatData: DocumentData;
  user: UserInfo;
}

export interface ChatRoom {
  id: string;
  data: DocumentData;
}

export interface DirectMessage {
  id: string;
  users: string[];
}
