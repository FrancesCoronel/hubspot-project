import axios, { AxiosError } from "axios";
import { ErrorResponse } from "./types";

/**
 * Sends the processed data to the specified URL.
 * @param postURLSendData - The URL to send the data to.
 * @param processedDataSendData - The processed data to send.
 */
const sendData = async (
  postURLSendData: string,
  processedDataSendData: any
) => {
  // console.log(`[Post Data 📬] Where we are sending data: ${postURLSendData}`);
  // console.log(`[Post Data 📬] Processed data to send:`);
  // console.log(processedDataSendData);

  try {
    const response = await axios.post(postURLSendData, processedDataSendData);
    // console.log(`[Post Data 📬] Response:`);
    // console.log(response);

    const responseStatus = response.status;
    if (responseStatus !== 200) {
      console.error(
        `[Post Data 📬] Error sending data, status code is: ${responseStatus}`
      );
    } else {
      console.log(
        `[Post Data 📬] Response data message: ${response.data.message}`
      );
      console.log(
        `[Post Data 📬] Data was sent successfully, status code is: ${responseStatus}`
      );
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      const responseStatus: number = axiosError.response.status;
      const responseStatusText: string = axiosError.response.statusText;
      const responseData: ErrorResponse = axiosError.response
        .data as ErrorResponse;

      console.error(
        `[Post Data 📬] Error sending data, status code is ${responseStatus} with the message ${responseStatusText}`
      );
      console.error(
        `[Post Data 📬] Status: ${responseData.status} and Message: ${responseData.message}`
      );
    } else {
      console.error(`[Post Data 📬] Error sending data: ${axiosError.message}`);
    }
  }
};

export default sendData;
