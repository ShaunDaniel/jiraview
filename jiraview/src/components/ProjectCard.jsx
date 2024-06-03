import React from 'react'
import { Box, Image, Text, Card,Flex } from "@chakra-ui/react";



function ProjectCard({project, cloudId}) {

    function openProjectPage() {
        window.location.href=`/project/${cloudId}/issues/${project.id}`
    }

    return (
        <Box key={project.id} borderWidth="1px" borderRadius="lg" bgColor={'white'} overflow="hidden" h={'fit-content'}   _hover={{transform: "scale(1.05)"}} transition={'transform 0.2s'} cursor={'pointer'} onClick={()=>{openProjectPage()}}>
            <Flex justifyContent={'space-between'}>
            <Box p="6">
                <Box d="flex" alignItems="baseline">
                    <Text fontWeight="semibold" textTransform="uppercase" fontSize="sm" color="teal.600">
                        {project.key}
                    </Text>
                </Box>
                <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
                    {project.name}
                </Text>
            </Box>
            <Image src={project.avatarUrls['48x48']} alt={project.name} objectFit={'cover'} w={'50%'}/>
            
            </Flex>
        </Box>
    )
}

export default ProjectCard
