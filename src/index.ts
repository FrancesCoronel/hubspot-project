import dotenv from "dotenv";
import renderInbox from "./helpers/render-inbox";

/**
 * This code retrieves the user key from environment variables using dotenv.config(). If the user key is not found, an error is thrown.
 * The fetchURL and postURL variables store the URLs to fetch the raw data and post the processed data, respectively. They include the user key as a query parameter.
 * Finally, the renderInbox function is called with the fetchURL and postURL as arguments to initiate the data retrieval, processing, and sending process.
 */

dotenv.config();

// Retrieve the user key from environment variables
const userKey: string | undefined = process.env.API_KEY;

if (!userKey) {
  throw new Error("API_KEY not found in environment variables");
}

// URL to fetch data
const fetchURL: string = `https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=${userKey}`;

// URL to post processed data
const postURL: string = `https://candidate.hubteam.com/candidateTest/v3/problem/result?userKey=${userKey}`;

// Rendering the inbox of processed data
renderInbox(fetchURL, postURL);
