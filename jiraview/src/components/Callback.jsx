import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Flex, Spinner,useToast } from '@chakra-ui/react';
import Cookies from 'js-cookie';


const Callback = () => {

  const navigate = useNavigate();
  const toast = useToast();
  const jira_access_token = Cookies.get('jira_access_token');

  if(jira_access_token && jira_access_token.length>0){
    navigate('/')
  }
  
  useEffect(() => {
    const handleOAuthCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const error = params.get('error')

      if (error) {
        // Handle error
        toast({
          title: "Authentication failed!",
          description: `Please try again!`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        navigate('/')
        return;
      }
      
      if (code) {
        try {
          // Exchange the authorization code for an access token
          const response = await axios.post('https://auth.atlassian.com/oauth/token', {
            code,
            redirect_uri: `${import.meta.env.VITE_APP_REDIRECT_URI}`,
            grant_type: 'authorization_code',
            client_id: `${import.meta.env.VITE_APP_CLIENT_ID}`,
            client_secret: `${import.meta.env.VITE_APP_CLIENT_SECRET}`,
          });

          const { access_token } = response.data;
          Cookies.set('jira_access_token', access_token, { secure: true, sameSite: 'strict' });
          navigate('/projects');
          window.location.reload();
          toast({
            title: "Success",
            description: "You have successfully logged in.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });

        } catch (error) {
          console.error('Error exchanging authorization code for access token:', error);
          toast({
            title: "Error",
            description: "There was an error logging in. Please try again.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }

    };


      handleOAuthCallback();
  }, []);

  return (
    <Flex h={'100vh'}>
    <Spinner
      mx={'auto'}
      my={'auto'}
      thickness="10px"
      speed="0.7s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
    </Flex>

  );
};

export default Callback;
