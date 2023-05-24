import fetchData from "./fetch-data";
import processData from "./process-data";
import sendData from "./send-data";

/**
 * Renders the inbox by fetching data, processing it, and sending the processed data.
 * @param whereToFetchData - The URL to fetch the raw data from.
 * @param whereToPostData - The URL to post the processed data to.
 */
const renderInbox = async (
  whereToFetchData: string,
  whereToPostData: string
) => {
  console.log(`[Render Inbox 📨] Where to fetch data: ${whereToFetchData}`);
  console.log(`[Render Inbox 📨] Where to post data: ${whereToPostData}`);

  const rawData = await fetchData(whereToFetchData);

  if (rawData !== null) {
    const processedData = processData(rawData);

    Promise.all([rawData, processedData]).then(() => {
      sendData(whereToPostData, processedData);
    });
  } else {
    console.error("[Render Inbox 📨] Failed to fetch data");
  }
};

export default renderInbox;
