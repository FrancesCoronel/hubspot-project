import axios, { AxiosResponse } from "axios";
import { RawData } from "./types";

/**
 * Fetches data from the specified URL.
 * @param fetchURL - The URL to fetch data from.
 * @returns The fetched raw data or null if an error occurred.
 */
const fetchData = async (fetchURL: string): Promise<RawData | null> => {
  let rawData: RawData | null = null;

  try {
    const response: AxiosResponse = await axios.get(fetchURL);
    const responseStatus: number = response.status;

    if (responseStatus !== 200) {
      console.error(
        `[Fetch Data 🏤] Error fetching data, status code is: ${responseStatus}`
      );
    } else {
      rawData = response.data as RawData;
      console.log(
        `[Fetch Data 🏤] Data was fetched successfully, status code is: ${responseStatus}`
      );
      // console.log(`[Fetch Data 🏤] Raw data:`);
      // console.log(rawData);
    }
  } catch (error) {
    console.error(`[Fetch Data 🏤] Error fetching data, error is: ${error}`);
  }

  return rawData;
};

export default fetchData;
