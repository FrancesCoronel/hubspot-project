import fetchData from "./fetch-data";
import processData from "./process-data";
import sendData from "./send-data";

const renderInbox = async (
  whereToFetchData: string,
  whereToPostData: string
) => {
  console.log(`[Render inbox] Where to fetch data: ${whereToFetchData}`);
  console.log(`[Render inbox] Where to post data: ${whereToPostData}`);

  const rawData = await fetchData(whereToFetchData);

  if (rawData !== null) {
    const processedData = processData(rawData);

    Promise.all([rawData, processedData]).then(() => {
      sendData(whereToPostData, processedData);
    });
  } else {
    console.error("[Render inbox] Failed to fetch data");
  }
};

export default renderInbox;
