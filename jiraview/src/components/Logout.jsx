import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from "react-icons/fa";
import { useToast } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import Cookies from 'js-cookie';

function Logout() {

    const navigate = useNavigate();
    const toast = useToast();

    function logout() {
      Cookies.remove('jira_access_token');
      Cookies.remove('cloudId')
        toast({
            title: "Logged out",
            description: "Logged out successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        navigate('/')

      }

    return (
        <IconButton
            icon={<FaSignOutAlt />}
            aria-label="Logout"
            onClick={logout}
            my={'auto'}
            mr={5}
            />
    )
}

export default Logout
