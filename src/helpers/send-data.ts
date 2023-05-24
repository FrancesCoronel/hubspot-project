import axios, { AxiosError } from "axios";
import { ErrorResponse } from "./types";

// send data
// params: where to send data (string), data to send (json)
const sendData = async (
  postURLSendData: string,
  processedDataSendData: any
) => {
  console.log(`[Send data] Where to post data:`);
  console.log(postURLSendData);
  console.log(`[Send data] Processed data to send:`);
  console.log(processedDataSendData);

  try {
    const response = await axios.post(postURLSendData, processedDataSendData);
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
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      const responseStatus: number = axiosError.response.status;
      const responseStatusText: string = axiosError.response.statusText;
      const responseData: ErrorResponse = axiosError.response
        .data as ErrorResponse;

      console.error(
        `[Send data] Error sending data, status code is ${responseStatus} with the message ${responseStatusText}`
      );
      console.error(
        `[Send data] Status: ${responseData.status} and Message: ${responseData.message}`
      );
    } else {
      console.error(`[Send data] Error sending data: ${axiosError.message}`);
    }
  }
};

export default sendData;
