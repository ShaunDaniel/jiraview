import React, { useEffect, useState } from 'react'
import { getProjectData } from '../services/jiraService';
import { SimpleGrid, Flex, Text, Skeleton, SkeletonText } from "@chakra-ui/react";
import ProjectCard from '../components/ProjectCard';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import Cookies from 'js-cookie';




function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  const [cloudId,setCloudId] = useState(Cookies.get('cloudId'));
  
  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getProjectData(cloudId);
      setProjects(data);
      console.log(projects)
    }

    if(cloudId && cloudId.length>0){
      fetchProjects();
    }
    else{
      navigate('/')
    }

  }
    , []);


  if (cloudId && cloudId.length > 0) {

    return (
      projects && projects.length > 0 ?
        <>
          <Flex minH={'100vh'} direction={'column'}>

            <Nav pageTitle="Projects" />
            <Flex direction="column" align="center"  h={'fit-content'}>
              <Flex h={"fit-content"} w={"70%"} my={10} p={10} justifyContent={'center'} borderRadius={15} bg="rgba(255,255,255,0.4)">
                <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={10} w={'100%'}>
                  {projects.map((project, id) => (
                    <>
                      <ProjectCard key={id} project={project} cloudId={cloudId} />
                    </>
                  ))}
                </SimpleGrid>
              </Flex>
            </Flex>
          </Flex>
        </>
        :
        <Flex direction="column" h={"100vh"}>
          <Skeleton h={"5rem"} w={"full"}></Skeleton>
          <Flex w={'100%'} justifyContent={'center'} >
            <Skeleton h={"20rem"} w={"70%"} m={5}></Skeleton>
          </Flex>
        </Flex>
    );
  }
  else {
    navigate('/')
  }
}
export default Projects
