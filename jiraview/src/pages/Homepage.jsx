import React, { useEffect, useState } from 'react';
import { getCloudId } from '../services/jiraService';
import { Box, Button, Flex, Text, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const [cloudId, setCloudId] = useState(null);
  const [authUrl, setAuthUrl] = useState(null);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();


  useEffect(() => {
    const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  
    const fetchCloudId = async () => {
      const jiraAccessToken = localStorage.getItem('jira_access_token');
      try {
        if (jiraAccessToken) {
          const data = await getCloudId(jiraAccessToken);
          if (data && data.data[0].id) {
            localStorage.setItem('cloudId', data.data[0].id);
            setCloudId(data.data[0].id);
            navigate(`/projects/`);
          } else {
            // If data is null, remove everything from localStorage and set cloudId and authUrl to null
            localStorage.removeItem('jira_access_token');
            localStorage.removeItem('cloudId');
            setCloudId(null);
            setAuthUrl(null);
            toast({
              title: "Session expired",
              description: "Your session has expired. Please log in again.",
              status: "error",
              duration: 5000,
              isClosable: true,
            });

          }
        } else {
          const jiraClientId = import.meta.env.VITE_APP_CLIENT_ID;
          const jiraScope = encodeURIComponent(import.meta.env.VITE_APP_SCOPE);
          const jiraRedirectUri = encodeURIComponent(import.meta.env.VITE_APP_REDIRECT_URI);
          setAuthUrl(`https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=${jiraClientId}&scope=${jiraScope}&redirect_uri=${jiraRedirectUri}&state=${state}&response_type=code&prompt=consent`)
        }
      } catch (error) {
        console.error(error)
      }
    }
  
    fetchCloudId()
  }, []);

  const handleLogin = () => {
    setLoading(true);
    window.location.href = `${authUrl}`
  }

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
              <Button isLoading={loading} colorScheme='blue' loadingText="Loading.." onClick={() => handleLogin()}>Connect to Jira</Button>}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Homepage
