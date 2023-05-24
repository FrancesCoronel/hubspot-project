# HubSpot Technical Assessment

May 24, 2023

## Installation

`npm i`

## Getting Started

`npm start`

## Expected Output

```shell
❯ npm start

> hubspot-project@1.0.0 start
> ts-node src/index.ts

[Render Inbox 📨] Where to fetch data: https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=24ed898cb162d6d4cc20112de7ca
[Render Inbox 📨] Where to post data: https://candidate.hubteam.com/candidateTest/v3/problem/result?userKey=24ed898cb162d6d4cc20112de7ca
[Fetch Data 🏤] Data was fetched successfully, status code is: 200
[Process Data 📦] Data is now processed
[Post Data 📬] Response data message: Results match! Congratulations!
[Post Data 📬] Data was sent successfully, status code is: 200
```

## Features

- TypeScript
- Prettier
- ESLint
- Env for API Key

## To-Do

If I had more time, I would have done the following:

- Setup Jest for testing
- Created a basic React UI to show the inbox view
