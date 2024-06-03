import React, { useEffect, useState } from 'react'
import { getProjectData } from '../services/jiraService';
import { SimpleGrid, Flex, Text, Skeleton, SkeletonText } from "@chakra-ui/react";
import ProjectCard from '../components/ProjectCard';

import Logout from '../components/Logout';




function Projects() {
  const [projects, setProjects] = useState([]);
  const params = new URLSearchParams(window.location.search);
  const cloudId = params.get('id');
  useEffect(() => {
    const fetchProjects = async () => {

      const data = await getProjectData(cloudId);
      setProjects(data);
      console.log(projects)
    }
    fetchProjects();
  }
    , []);



  return (
    projects && projects.length > 0 ?
      <>
        <Flex h={'100vh'} direction={'column'}>
          <Flex h={'15%'} bg={'white'} justifyContent={'space-between'}>
            <Text p={5} m={5} fontWeight={700} fontSize={'2rem'}>Your Projects</Text>
            <Logout />
          </Flex>
          <Flex direction="column" align="center" h={'85%'}>
            <Flex h={"fit-content"} w={"70%"} mt={10} p={10} justifyContent={'center'} borderRadius={15} bg="rgba(255,255,255,0.4)">
              <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={10} w={'75%'}>
                {projects.map((project) => (
                  <>
                    <ProjectCard project={project} cloudId={cloudId} />
                    <ProjectCard project={project} cloudId={cloudId} />
                    <ProjectCard project={project} cloudId={cloudId} />
                    <ProjectCard project={project} cloudId={cloudId} />
                    <ProjectCard project={project} cloudId={cloudId} />
                    <ProjectCard project={project} cloudId={cloudId} />
                    <ProjectCard project={project} cloudId={cloudId} />
                    <ProjectCard project={project} cloudId={cloudId} />
                    <ProjectCard project={project} cloudId={cloudId} />
                    <ProjectCard project={project} cloudId={cloudId} />

                  </>
                ))}
              </SimpleGrid>
            </Flex>
          </Flex>
        </Flex>
      </>
      :
      <Flex direction="column">
        <Skeleton h={10} w={"25%"} m={5}></Skeleton>
        <SkeletonText h={10} w={"75%"} m={5}></SkeletonText>
      </Flex>
  );
}
export default Projects
