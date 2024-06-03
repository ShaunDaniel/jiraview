import React from 'react'
import { Flex, Text, IconButton } from '@chakra-ui/react';
import { IoIosArrowBack } from 'react-icons/io';
import Logout from './Logout';
import { useNavigate } from 'react-router-dom';

function Nav({pageTitle}) {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    return (
        <Flex h={'5rem'} bg={'white'} justifyContent={'space-between'}>
            <Flex>
                <IconButton my={'auto'} mx={5} aria-label="Go back" icon={<IoIosArrowBack />} onClick={goBack} />
                <Text my={'auto'} fontWeight={700} fontSize={'2rem'}>{pageTitle}</Text>
            </Flex>
            <Logout />
        </Flex>
    )
}

export default Nav