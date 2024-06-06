import React, { useState, useEffect } from 'react'
import { getIssuesByProjectID } from '../services/jiraService';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  MenuItemOption,
  MenuGroup,
  VStack,
  Checkbox,
  MenuDivider,
} from '@chakra-ui/react'

import { SimpleGrid, Skeleton, Flex } from '@chakra-ui/react';
import Issue from '../components/Issue';
import Nav from '../components/Nav';

function Issues() {
  const [issues, setIssues] = useState([]);
  const [filters, setFilters] = useState({
    selectedIssueTypes: [],
    selectedStatuses: []
  });

  const cloudId = localStorage.getItem('cloudId');
  const { id } = useParams();

  const navigate = useNavigate();


  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => {
      const updatedArray = prevFilters[filterType].includes(value) ? prevFilters[filterType].filter(item => item !== value) : [...prevFilters[filterType], value];
      return { ...prevFilters, [filterType]: updatedArray };
    });
  };

  // For "Type" checkboxes
  const handleIssueTypeChange = (e) => {
    handleFilterChange('selectedIssueTypes', e.target.value);
  };

  // For "Status" checkboxes
  const handleStatusChange = (e) => {
    handleFilterChange('selectedStatuses', e.target.value);
  };

  const filteredIssues = issues.filter(issue => {
    const issueTypeMatch = filters.selectedIssueTypes.length > 0 ? filters.selectedIssueTypes.includes(issue.fields.issuetype.name) : true;
    const statusMatch = filters.selectedStatuses.length > 0 ? filters.selectedStatuses.includes(issue.fields.status.name) : true;
    return issueTypeMatch && statusMatch;
  });



  console.log(issues)
  useEffect(() => {
    if (cloudId && cloudId.length > 0) {
      getIssuesByProjectID(cloudId, id)
        .then((data) => {
          setIssues(data.issues);
          console.log(issues)
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      navigate('/')
    }
  }, [cloudId, id]);


  return (
    issues && issues.length > 0 ? (
      <>
        <Nav pageTitle='Issues' />
        <Flex w={'full'} maxH={'fit-content'} minH={'100vh'} direction={'column'}>
          <Flex w={'90%'} mx={'auto'} mt={5}>
            <Menu >
              <MenuButton as={Button} rightIcon={<FaChevronDown />}>
                Type
              </MenuButton>
              <MenuList>
                <VStack alignItems={'start'}>
                <Checkbox size='md' colorScheme='blue' mx={3} value="Epic" onChange={handleIssueTypeChange}>Epic</Checkbox>
                <Checkbox size='md' colorScheme='blue' mx={3} value="Task" onChange={handleIssueTypeChange}>Task</Checkbox>
                <Checkbox size='md' colorScheme='blue' mx={3} value="Subtask" onChange={handleIssueTypeChange}>Subtask</Checkbox>
                </VStack>

              </MenuList>
            </Menu>
            <Menu >
              <MenuButton as={Button} rightIcon={<FaChevronDown />} mx={3}>
                Status
              </MenuButton>
              <MenuList>
                <VStack alignItems={'start'}>
                  <Checkbox size='md' colorScheme='blue' mx={3} value="Done" onChange={handleStatusChange}>Done</Checkbox>
                  <Checkbox size='md' colorScheme='blue' mx={3} value="In Progress" onChange={handleStatusChange}>In-Progress</Checkbox>
                  <Checkbox size='md' colorScheme='blue' mx={3} value="To Do" onChange={handleStatusChange}>To-Do</Checkbox>
                </VStack>
              </MenuList>
            </Menu>
          </Flex>
          <Flex mx={'auto'} h={"fit-content"} w={'90%'} my={10} p={10} justifyContent={'center'} borderRadius={15} bg="rgba(255,255,255,0.4)">

            <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} m={5}>
              {filteredIssues.length > 0 ? (
                filteredIssues.map(issue => (
                  <Issue key={issue.id} issue={issue} cloudId={cloudId}/>
                ))
              ) : (
                <p>No issues found matching the selected filters.</p>
              )}
            </SimpleGrid>
          </Flex>
        </Flex>
      </>
    ) : (
      <Flex direction="column" h={"100vh"}>
        <Skeleton h={"5rem"} w={"full"}></Skeleton>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={20} w={'full'} mx={10} mt={15}>
          <Skeleton w={'xs'} h={"8rem"} borderRadius={20} px="5" />
          <Skeleton w={'xs'} h={"8rem"} borderRadius={20} px="5" />
          <Skeleton w={'xs'} h={"8rem"} borderRadius={20} px="5" />
          <Skeleton w={'xs'} h={"8rem"} borderRadius={20} px="5" />
        </SimpleGrid>
      </Flex>
    )
  );


}

export default Issues
