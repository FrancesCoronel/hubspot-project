# HubSpot Take-Home

Take-home technical assessment for a Software Engineer role.

A TypeScript CLI that fetches a raw dataset from the HubSpot candidate API, processes it (inbox rendering logic), and posts the result back. The solution passed the automated validation check.

**Company:** [HubSpot](https://hubspot.com)

## Installation

```bash
npm install
```

## Getting Started

Copy `.env.example` to `.env` and add your API key:

```bash
cp .env.example .env
```

Run:

```bash
npm start
```

## Expected Output

```shell
[Render Inbox] Where to fetch data: https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=YOUR_KEY
[Render Inbox] Where to post data: https://candidate.hubteam.com/candidateTest/v3/problem/result?userKey=YOUR_KEY
[Fetch Data] Data was fetched successfully, status code is: 200
[Process Data] Data is now processed
[Post Data] Response data message: Results match! Congratulations!
[Post Data] Data was sent successfully, status code is: 200
```

## Tech Stack

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [axios](https://axios-http.com/) — HTTP client
- [dotenv](https://github.com/motdotla/dotenv) — environment variables
- ESLint + Prettier

## To-Do

If I had more time:

- Setup Jest for testing
- Created a basic React UI to show the inbox view
