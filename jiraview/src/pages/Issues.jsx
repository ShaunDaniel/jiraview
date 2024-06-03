import React, { useState, useEffect } from 'react'
import { getIssuesByProjectID } from '../services/jiraService';
import { useParams } from 'react-router-dom';
import { SimpleGrid,Skeleton,Flex } from '@chakra-ui/react';
import Issue from '../components/Issue';
import Nav from '../components/Nav';

function Issues() {
  const [issues, setIssues] = useState([]);

  const cloudId = localStorage.getItem('cloudId');
  const { id } = useParams();

  useEffect(() => {
    getIssuesByProjectID(cloudId, id)
      .then((data) => {
        setIssues(data.sections[0].issues);
        console.log(issues)
      })
      .catch((error) => {
        console.error(error);
      });
  }, [cloudId, id]);

  return (
    issues && issues.length > 0 ? (
      <div>
        <Nav pageTitle='Issues'/>
        <Flex w={'full'}>
        <Flex mx={'auto'} h={"fit-content"} w={'90%'} mt={10} p={10} justifyContent={'center'} borderRadius={15} bg="rgba(255,255,255,0.4)">
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} m={5}>
          {issues.map((issue) => (
            <>
            <Issue cloudId={cloudId} issue={issue}/>
            </>
          ))}
        </SimpleGrid>
        </Flex>
        </Flex>
      </div>
    ) : (
      <div>
        <Skeleton h={"5rem"} w={"full"}></Skeleton>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={20} w={'full'} mx={10} mt={15}>
          <Skeleton w={'xs'} h={"8rem"} borderRadius={20} px="5" />
          <Skeleton w={'xs'} h={"8rem"} borderRadius={20} px="5"/>
          <Skeleton w={'xs'} h={"8rem"} borderRadius={20} px="5"/>
          <Skeleton w={'xs'} h={"8rem"} borderRadius={20} px="5"/>
        </SimpleGrid>
      </div>
    )
  );


}

export default Issues
