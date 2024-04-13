"use client"
import { useGetProjectQuery } from "@/lib/features/projectApi"
import { Box, Flex } from "@chakra-ui/react"
import ProjectContent from "./ProjectContent"
import ProjectHeader from "./ProjectHeader"

interface Props {
    params: { id: string }
}

const Project = ({ params }: Props) => {
    const { data } = useGetProjectQuery(params.id);

    if (!data) return null;

    const project = data[0];

    return (
        <Flex className='w-full h-full flex-col'>
            <ProjectHeader project={project} />
            <Box className='overflow-x-scroll overflow-y-hidden flex-[1_0_0]'>
                <ProjectContent project={project} />
            </Box>
        </Flex>
    )
}

export default Project