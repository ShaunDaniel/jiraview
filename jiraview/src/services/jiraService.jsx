import axios from 'axios';
import Cookies from 'js-cookie';

// Get the access token once
const accessToken = Cookies.get('jira_access_token');

export const getCloudId = async (accessTokenData) => {
  try {
    const response = await axios.get('https://api.atlassian.com/oauth/token/accessible-resources', {
      headers: {
        'Authorization': `Bearer ${accessTokenData}`,
        'Accept': 'application/json'
      }
    });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getProjectData = async (cloudId) => {
  try {
    const response = await axios.get(`https://api.atlassian.com/ex/jira/${cloudId}/rest/api/3/project`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};


export const getIssuesByProjectID = async (cloudId, projectId, startAt) => {
  try {
    const body = {
      "jql": `project = ${projectId}`,
      "startAt": startAt,
      "maxResults": 12,
      "fields": [
        "summary",
        "status",
        "assignee",
        "reporter",
        "issuetype",
        "priority",
        "created",
        "updated",
        "description"
      ]
    }
    const response = await axios.post(`https://api.atlassian.com/ex/jira/${cloudId}/rest/api/2/search`,body, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);

    return null;
  }
}

export const getIssueByIssueID = async (cloudId, issueId) => {
  try {
    const response = await axios.get(`https://api.atlassian.com/ex/jira/${cloudId}/rest/api/3/issue/${issueId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}