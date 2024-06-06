import React, { useState } from 'react'
import { Box, Text, Flex, Image, Heading, Tag, TagLabel, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Avatar } from '@chakra-ui/react';
import { getIssueByIssueID } from '../services/jiraService';
import IssueModalTable from './IssueModalTable';


function Issue({ issue, cloudId }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [activeissue, setActiveIssue] = useState({});

    console.log('Issue component rendered');
    const getIssue = (issueID, cloudId) => {

        getIssueByIssueID(cloudId, issueID)
            .then((data) => {
                setActiveIssue(data);
                console.log(data)
            })
        onOpen();

    }



    const renderContent = (content) => {
        return content.map((block, index) => {
            switch (block.type) {
                case 'heading':
                    return (
                        <Heading as={`h${block.attrs.level}`} size="xl" key={index}>
                            {block.content.map((text, textIndex) => text.text)}
                        </Heading>
                    );
                case 'paragraph':
                    return (
                        <Text key={index}>
                            {block.content.map((text, textIndex) => {
                                let component = <React.Fragment key={textIndex}>{text.text}</React.Fragment>;
                                if (text.marks) {
                                    text.marks.forEach(mark => {
                                        switch (mark.type) {
                                            case 'strong':
                                                component = <Text as="strong" key={textIndex}>{component}</Text>;
                                                break;
                                            case 'em':
                                                component = <Text as="em" key={textIndex}>{component}</Text>;
                                                break;
                                            default:
                                                break;
                                        }
                                    });
                                }
                                return component;
                            })}
                        </Text>
                    );
                default:
                    return null;
            }
        });
    };

    const handleTagColor = (statusType) => {
        switch (statusType) {
            case 'To Do':
                return 'blue';
            case 'In Progress':
                return 'yellow';
            case 'Done':
                return 'green';
            default:
                return 'gray';
        }
    }


    return (
        <Box w={'fit-content'} minW={'xs'} key={issue.id} borderRadius={20} p={5} m={5} cursor={'pointer'} _hover={{ transform: "scale(1.015)" }} transition={'transform 0.2s'} dropShadow={'md'} bgColor={'white'} onClick={() => { getIssue(issue.id, cloudId) }}>
            <Flex justifyContent={'space-between'}>
                <Flex direction={'column'} justifyContent={'end'}>
                    <Image boxSize="50px" src={issue.fields.issuetype.iconUrl} alt={issue.key} />
                    <Text fontSize="xl" fontWeight="semibold" lineHeight="short">
                        {issue.key}
                    </Text>
                    <Text>{issue.fields.summary}</Text>
                </Flex>
                <Tag colorScheme={handleTagColor(issue.fields.status.name)} h={'fit-content'}>{issue.fields.status.name}</Tag>
            </Flex>
            <Text>{issue.summary}</Text>

            <Modal isOpen={isOpen} size={'xl'} onClose={onClose}>
                <ModalOverlay backdropFilter='auto' backdropBlur='2px' />
                <ModalContent maxW="1024px">
                    <ModalHeader>Issue Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {activeissue && activeissue.fields ? (
                            <>
                                <Flex w={'100%'} justifyContent={'space-between'} mb={5}>
                                    <Tag colorScheme='cyan' size={'lg'}>{activeissue.fields.status.name}</Tag>
                                    <Tag size={'sm'}>{activeissue.key}</Tag>
                                </Flex>
                                <Flex>
                                    <Flex direction={'column'} w={"60%"}>
                                        <Heading fontWeight={400} size="xl">{activeissue.fields.summary}</Heading>
                                        <Text as={'b'} my={2}>Description</Text>
                                        <Box p={4}>
                                            {activeissue.fields.description
                                                ? (activeissue.fields.description.content && renderContent(activeissue.fields.description.content))
                                                : <Text>No Description</Text>
                                            }
                                        </Box>
                                    </Flex>
                                    <Flex>
                                        <IssueModalTable reporter={activeissue.fields.reporter} assignee={activeissue.fields.assignee} />
                                    </Flex>
                                </Flex>
                            </>
                        ) : (
                            <Text>Loading...</Text>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Box>
    )
}

export default Issue
