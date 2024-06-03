import React from 'react'
import { Box, Text, Flex, Image, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';


function Issue({issue, cloudId}) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box w={'fit-content'} minW={'xs'} key={issue.id} borderRadius={20} p={5} m={5} cursor={'pointer'} _hover={{transform: "scale(1.015)"}} transition={'transform 0.2s'} dropShadow={'md'} bgColor={'white'} onClick={onOpen}>
            <Flex>
            <Image boxSize="50px" src={`https://api.atlassian.com/ex/jira/${cloudId}${issue.img}`} alt={issue.key} />
            <Text ml={4} fontSize="xl" fontWeight="semibold" lineHeight="short">
                {issue.key}
            </Text>
            </Flex>
            <Text mt={4}>{issue.summary}</Text>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Issue Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text><strong>Key:</strong> {issue.key}</Text>
                        <Text><strong>Summary:</strong> {issue.summary}</Text>
                        {/* Add more issue details here */}
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
