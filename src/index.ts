import dotenv from "dotenv";
import renderInbox from "./helpers/render-inbox";

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

// Calling the final function
renderInbox(fetchURL, postURL);
