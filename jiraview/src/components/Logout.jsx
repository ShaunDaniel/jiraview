import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from "react-icons/fa";
import { IconButton } from "@chakra-ui/react";

function Logout() {

    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('jira_access_token');
        navigate('/')
      }

    return (
        <IconButton
            icon={<FaSignOutAlt />}
            aria-label="Logout"
            onClick={logout}
            m={10}
            />
    )
}

export default Logout
