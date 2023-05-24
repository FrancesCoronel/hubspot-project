# HubSpot Technical Assessment

Frances Coronel

May 24, 2023

In this code structure, the axios instance is wrapped in a separate file axios-wrapper.js to ensure consistency across modules. The fetch-raw-data.js file contains the logic for fetching raw data using the axios instance. The helpers.js file contains the processData function for processing the raw data. The send-data.js file handles sending the processed data using the axios instance. Finally, the index.js file is the entry point that imports the necessary modules and orchestrates the workflow.

- better ESLint + Prettier config
- modularity
- TypeScript?
- better comments
- env for API Key
