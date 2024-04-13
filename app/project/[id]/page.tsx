"use client"
import { tabsList } from "@/constants"
import { useGetProjectQuery } from "@/lib/features/projectApi"
import { Box, Flex } from "@chakra-ui/react"
import { useState } from "react"
import ProjectContent from "./ProjectContent"
import ProjectHeader from "./ProjectHeader"

interface Props {
    params: { id: string }
}

const Project = ({ params }: Props) => {
    const { data } = useGetProjectQuery(params.id);
    const [tabs, setTabs] = useState(tabsList);

    if (!data) return null;

    const project = data[0];

    return (
        <Flex className='w-full h-full flex-col'>
            <ProjectHeader project={project} tabs={tabs} setTabs={setTabs} />
            <Box className='overflow-x-scroll overflow-y-hidden flex-[1_0_0]'>
                <ProjectContent project={project} tabs={tabs} />
            </Box>
        </Flex>
    )
}

export default Project