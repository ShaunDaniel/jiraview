import React, { useEffect, useState } from 'react';
import { getCloudId } from '../services/jiraService';
import { Box, Button, Flex, Text, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const [cloudId, setCloudId] = useState(null);
  const [authUrl, setAuthUrl] = useState(null);


  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);


    const fetchCloudId = async () => {
      const jiraAccessToken = localStorage.getItem('jira_access_token');
      if (jiraAccessToken) {
        const data = await getCloudId(jiraAccessToken);
        localStorage.setItem('cloudId', data.data[0].id);
        setCloudId(data.data[0].id);
      }
      else {
        const jiraClientId = import.meta.env.VITE_APP_CLIENT_ID;
        const jiraScope = encodeURIComponent(import.meta.env.VITE_APP_SCOPE);
        const jiraRedirectUri = encodeURIComponent(import.meta.env.VITE_APP_REDIRECT_URI);
        setAuthUrl(`https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=${jiraClientId}&scope=${jiraScope}&redirect_uri=${jiraRedirectUri}&state=${state}&response_type=code&prompt=consent`)
        console.log(authUrl)
      }

    }

    fetchCloudId();
  }, []);


  return (
    <Box h={'100vh'}>
      <Flex h={'100%'}>
        <Flex backdropFilter={{ blur: '5px' }} bg="rgba(255,255,255,0.4)" my={'auto'} w={"50%"} mx={'auto'} h={'50%'} borderRadius={'20'}>
          <Flex direction={'column'} p={'10'}>
            <Text fontSize={'2rem'} fontWeight={'700'}>JiraView</Text>
            <Text fontSize={'1rem'} fontWeight={'300'} mt={5} mb={2}>Connect your Jira account to start - </Text>
            {cloudId && cloudId.length > 0 ? 
              (() => {
                navigate(`/projects/`);
                toast({
                  title: "Logged in",
                  description: "You are already logged in. Redirecting to projects page.",
                  status: "info",
                  duration: 5000,
                  isClosable: true,
                });
              })()
              : 
              <Button isLoading={authUrl === null} colorScheme='blue' loadingText="Loading.." onClick={() => window.location.href = `${authUrl}`}>Connect to Jira</Button>}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Homepage
