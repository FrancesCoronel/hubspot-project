// easier to fetch and post JSON data
const axios = require("axios");

// my unique user key
const userKey = "24ed898cb162d6d4cc20112de7ca";

// where to fetch data
const fetchURL = `https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=${userKey}`;

// where to post processed data
const postURL = `https://candidate.hubteam.com/candidateTest/v3/problem/result?userKey=${userKey}`;

// fetch data
// param: the url to fetch data from (string)
const fetchRawData = async (fetchAPIUrl) => {
  let rawData = "";

  await axios
    .get(fetchAPIUrl)
    .then((response) => {
      const responseStatus = response.status;

      if (responseStatus !== 200) {
        console.error(
          `[Fetch Data] Error fetching data, status code is: ${responseStatus}`
        );
      } else {
        rawData = response.data;
        console.log(
          `[Fetch Data] Data was fetched successfully, status code is: ${responseStatus}`
        );
        console.log(`[Fetch Data] Raw data:`);
        console.log(rawData);
      }
    })
    .catch((error) => {
      console.error(`[Fetch Raw Data] Error fetching data, error is: ${error}`);
    });

  return rawData;
};

// process data
// param: the data to process (json)
const processData = (rawData) => {
  const processedData = {
    conversations: [],
  };
  const processedConversations = processedData.conversations;
  const rawMessages = rawData.messages;
  const rawUsers = rawData.users;
  const primaryUserId = rawData.userId;

  rawUsers.map((user) => {
    // avatar
    const userAvatar = user.avatar;

    // first name
    const userFirstName = user.firstName;

    // last name
    const userLastName = user.lastName;

    // user id
    const userId = user.id;

    // messages sent to user with the user ID
    const userMessages = rawMessages.filter((message) => {
      // primary user sent message
      const primaryUserSentMessage =
        message.fromUserId === primaryUserId && message.toUserId === userId;
      // primary user received message
      const primaryUserReceivedMessage =
        message.toUserId === primaryUserId && message.fromUserId === userId;
      // we want messages that are being sent to and from primary user and the selected user
      return primaryUserSentMessage || primaryUserReceivedMessage;
    });
    // console.log(user_messages);

    // sort messages by timestamp (most recent first)
    const sortedUserMessages = userMessages.sort((a, b) =>
      a.timestamp < b.timestamp ? 1 : b.timestamp < a.timestamp ? -1 : 0
    );
    // console.log(sorted_user_messages);

    const mostRecentMessage = sortedUserMessages[0];
    const mostRecentMessageContent = mostRecentMessage.content;
    const mostRecentMessageTimestamp = mostRecentMessage.timestamp;
    const mostRecentMessageFromUserId = mostRecentMessage.fromUserId;
    // console.log(most_recent_message);

    // total messages sent to this user
    const userTotalMessages = userMessages.length;

    // prepping object to push into conversations array
    const conversation = {
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

    // console.log(`[Process data] Processed conversation`);
    // console.log(conversation);
    processedConversations.push(conversation);
  });

  // sort conversations by timestamp (most recent first)
  processedConversations.sort((a, b) =>
    a.mostRecentMessage.timestamp < b.mostRecentMessage.timestamp
      ? 1
      : b.mostRecentMessage.timestamp < a.mostRecentMessage.timestamp
      ? -1
      : 0
  );

  // console.log(`[Process data] Processed data:`);
  // console.log(processed_data);
  console.log(JSON.stringify(processedData));

  return processedData;
};

// send data
// params: where to send data (string), data to send (json)
const sendData = async (postURLSendData, processedDataSendData) => {
  console.log(`[Send data] Where to post data:`);
  console.log(postURLSendData);
  console.log(`[Send data] Processed data to send:`);
  console.log(processedDataSendData);

  axios
    .post(postURLSendData, processedDataSendData)
    .then((response) => {
      console.log(`[Send data] Response:`);
      console.log(response);
      const responseStatus = response.status;
      if (responseStatus !== 200) {
        console.error(
          `[Send data] Error sending data, status code is: ${responseStatus}`
        );
      } else {
        console.log(
          `[Send data] Data was sent successfully, status code is: ${responseStatus}`
        );
      }
    })
    .catch((error) => {
      console.error(
        `[Send data] Error sending data, status code is ${error.response.status} with the message ${error.response.statusText}`
      );
      console.error(
        `[Send data] Status: ${error.response.data.status} and Message: ${error.response.data.message}`
      );
    });
};

// render inbox view
// params: where to fetch data (string), where to send data (string)
const renderInbox = async (whereToFetchData, whereToPostData) => {
  console.log(`[Render inbox] Where to fetch data: ${whereToFetchData}`);
  console.log(`[Render inbox] Where to post data: ${whereToPostData}`);

  const rawData = await fetchRawData(whereToFetchData);
  const processedData = processData(rawData);

  Promise.all([rawData, processedData]).then(() => {
    // console.log(`[Render inbox] Raw data to process:`);
    // console.log(raw_data);

    // console.log(`[Render inbox] Processed data to send:`);
    // console.log(processed_data);

    sendData(whereToPostData, processedData);
  });
};

// calling final function
renderInbox(fetchURL, postURL);

// for debugging
// call process_data on sample raw data
