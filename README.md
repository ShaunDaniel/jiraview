# Jira Integration React App

This is a React application that integrates with Jira using OAuth 2.0 (3LO) authentication. The app fetches and displays projects from Jira.

**Note:** This project is part of a submission for an internship application.

**Deployment Link:** https://jiraview.onrender.com/


## Features

- Fetch and display projects from Jira -
  
  ![image](https://github.com/ShaunDaniel/jiraview/assets/73394707/56160b56-5edf-4ab5-93a7-dd74aa5bc0d4)
  
- Fetch and display issues related to each project
  
  ![image](https://github.com/ShaunDaniel/jiraview/assets/73394707/b90f9b47-d089-4e5c-8a9a-b10972fbd7cb)

- Filter issues

  ![image](https://github.com/ShaunDaniel/jiraview/assets/73394707/f254a6e2-ede2-493e-b6e4-995a8cefa982)

- Expand & View Issue details

  ![image](https://github.com/ShaunDaniel/jiraview/assets/73394707/949de5f1-2566-4a49-b16b-d1c250eb6c06)

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/ShaunDaniel/jiraview.git
   ```

2. Navigate to the project directory
   ```sh
   cd jiraview/jiraview
   ```

3. Create a .env file in the root directory and add the following environment variables:
   ```js
    VITE_APP_API_TOKEN = "your_app_api_token"
    VITE_APP_CLIENT_ID = "your_app_client_id"
    VITE_APP_CLIENT_SECRET = "your_app_client_secret"
    VITE_APP_REDIRECT_URI = "http://localhost:5173/callback"
    VITE_APP_SCOPE = "read:jira-user read:jira-work read:project read:user write:jira-work offline_access manage:jira-configuration"
   ```
   You can obtain your own API token from [here](https://id.atlassian.com/manage-profile/security/api-tokens) & client IDs from [here](https://developer.atlassian.com/)
3. Install NPM packages
   ```sh
   npm install
   ```
4. Run the project
    ```sh
    npm run dev
    ```
