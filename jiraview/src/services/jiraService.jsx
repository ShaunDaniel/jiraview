import axios from 'axios';

export const getCloudId = async (accessToken) => {
  try {
    const response = await axios.get('https://api.atlassian.com/oauth/token/accessible-resources', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
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
    const accessToken = localStorage.getItem('jira_access_token');
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


export const getIssuesByProjectID = async (cloudId, projectId) => {
  try {
    const accessToken = localStorage.getItem('jira_access_token');
    const response = await axios.get(`https://api.atlassian.com/ex/jira/${cloudId}/rest/api/3/issue/picker?currentProjectId=${projectId}`, {
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