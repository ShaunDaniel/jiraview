import React from 'react'
import { getIssuesByProjectID } from '../services/jiraService';

function Issues() {
    const params = new URLSearchParams(window.location.search);
    const cloudId = params.get('id');
    const projectId = params.get('projectid');

    getIssuesByProjectID(cloudId, projectId).then((data) => {
        console.log(data);
    }
    );
    
  return (
    <div>
      Hi i am issue
    </div>
  )
}

export default Issues
