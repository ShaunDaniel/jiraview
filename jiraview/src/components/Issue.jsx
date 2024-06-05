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


    return (
        <Box w={'fit-content'} minW={'xs'} key={issue.id} borderRadius={20} p={5} m={5} cursor={'pointer'} _hover={{ transform: "scale(1.015)" }} transition={'transform 0.2s'} dropShadow={'md'} bgColor={'white'} onClick={() => { getIssue(issue.id, cloudId) }}>
            <Flex>
                <Image boxSize="50px" src={`https://api.atlassian.com/ex/jira/${cloudId}${issue.img}`} alt={issue.key} />
                <Text ml={4} fontSize="xl" fontWeight="semibold" lineHeight="short">
                    {issue.key}
                </Text>
            </Flex>
            <Text mt={4}>{issue.summary}</Text>

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
                                            {renderContent(activeissue.fields.description.content)}
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
