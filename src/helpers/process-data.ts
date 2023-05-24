import {
  ProcessedConversation,
  ProcessedData,
  RawMessage,
  RawUser,
} from "./types";

/**
 * Processes the raw data into a structured format.
 * @param rawData - The raw data to process.
 * @returns The processed data.
 */
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

    // Filter the messages related to the primary user and the selected user
    const userMessages = rawMessages.filter((message) => {
      const primaryUserSentMessage =
        message.fromUserId === primaryUserId && message.toUserId === userId;
      const primaryUserReceivedMessage =
        message.toUserId === primaryUserId && message.fromUserId === userId;
      return primaryUserSentMessage || primaryUserReceivedMessage;
    });

    // Sort the messages by timestamp (most recent first)
    const sortedUserMessages = userMessages.sort((a, b) => {
      if (a.timestamp < b.timestamp) {
        return 1;
      }
      if (b.timestamp < a.timestamp) {
        return -1;
      }
      return 0;
    });

    // Extract details from the most recent message
    const mostRecentMessage = sortedUserMessages[0];
    const mostRecentMessageContent = mostRecentMessage.content;
    const mostRecentMessageTimestamp = mostRecentMessage.timestamp;
    const mostRecentMessageFromUserId = mostRecentMessage.fromUserId;

    // Calculate the total number of messages sent to the user
    const userTotalMessages = userMessages.length;

    // Create a conversation object for the user
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

    // Add the conversation to the processed conversations array
    processedConversations.push(conversation);
  });

  // Sort the conversations by most recent message timestamp (most recent first)
  processedConversations.sort((a, b) => {
    if (a.mostRecentMessage.timestamp < b.mostRecentMessage.timestamp) {
      return 1;
    }
    if (b.mostRecentMessage.timestamp < a.mostRecentMessage.timestamp) {
      return -1;
    }
    return 0;
  });

  console.log("[Process Data 📦] Data is now processed");
  // console.log(JSON.stringify(processedData));

  return processedData;
};

export default processData;
