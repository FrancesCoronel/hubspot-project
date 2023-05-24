export interface RawMessage {
  content: string;
  fromUserId: number;
  timestamp: number;
  toUserId: number;
}

export interface RawUser {
  avatar: string;
  firstName: string;
  lastName: string;
  id: number;
}

export interface RawData {
  messages: RawMessage[];
  userId: number;
  users: RawUser[];
}

export interface ProcessedMessage {
  content: string;
  timestamp: number;
  userId: number;
}

export interface ProcessedConversation {
  avatar: string;
  firstName: string;
  lastName: string;
  mostRecentMessage: ProcessedMessage;
  totalMessages: number;
  userId: number;
}

export interface ProcessedData {
  conversations: ProcessedConversation[];
}

export interface ErrorResponse {
  status: string;
  message: string;
}
