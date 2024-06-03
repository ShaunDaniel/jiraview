import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Spinner } from '@chakra-ui/react';

const Callback = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

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
          localStorage.setItem('jira_access_token', access_token);
          // Redirect to the main app
          navigate('/');
        } catch (error) {
          console.error('Error exchanging authorization code for access token:', error);
        }
      }
    };

    handleOAuthCallback();
  }, []);

  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  );
};

export default Callback;
