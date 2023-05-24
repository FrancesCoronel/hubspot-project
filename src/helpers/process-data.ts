import {
  ProcessedConversation,
  ProcessedData,
  RawMessage,
  RawUser,
} from "./types";

const processData = (rawData: {
  messages: RawMessage[];
  users: RawUser[];
  userId: number;
}): ProcessedData => {
  const processedData: ProcessedData = {
    conversations: [],
  };

  const processedConversations = processedData.conversations;
  const rawMessages = rawData.messages;
  const rawUsers = rawData.users;
  const primaryUserId = rawData.userId;

  rawUsers.forEach((user) => {
    const userAvatar = user.avatar;
    const userFirstName = user.firstName;
    const userLastName = user.lastName;
    const userId = user.id;

    const userMessages = rawMessages.filter((message) => {
      const primaryUserSentMessage =
        message.fromUserId === primaryUserId && message.toUserId === userId;
      const primaryUserReceivedMessage =
        message.toUserId === primaryUserId && message.fromUserId === userId;
      return primaryUserSentMessage || primaryUserReceivedMessage;
    });

    const sortedUserMessages = userMessages.sort((a, b) => {
      if (a.timestamp < b.timestamp) {
        return 1;
      }
      if (b.timestamp < a.timestamp) {
        return -1;
      }
      return 0;
    });

    const mostRecentMessage = sortedUserMessages[0];
    const mostRecentMessageContent = mostRecentMessage.content;
    const mostRecentMessageTimestamp = mostRecentMessage.timestamp;
    const mostRecentMessageFromUserId = mostRecentMessage.fromUserId;

    const userTotalMessages = userMessages.length;

    const conversation: ProcessedConversation = {
      avatar: userAvatar,
      firstName: userFirstName,
      lastName: userLastName,
      mostRecentMessage: {
        content: mostRecentMessageContent,
        timestamp: mostRecentMessageTimestamp,
        userId: mostRecentMessageFromUserId,
      },
      totalMessages: userTotalMessages,
      userId,
    };

    processedConversations.push(conversation);
  });

  processedConversations.sort((a, b) => {
    if (a.mostRecentMessage.timestamp < b.mostRecentMessage.timestamp) {
      return 1;
    }
    if (b.mostRecentMessage.timestamp < a.mostRecentMessage.timestamp) {
      return -1;
    }
    return 0;
  });

  console.log(JSON.stringify(processedData));

  return processedData;
};

export default processData;
