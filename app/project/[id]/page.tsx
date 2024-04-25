"use client"
import ContentBody from "@/components/loading/ContentBody"
import ContentHeader from "@/components/loading/ContentHeader"
import { handleErrors } from "@/components/utils/handleErrors"
import { getProjectError, tabsList } from "@/constants"
import { useGetProjectQuery } from "@/lib/features/projectApi"
import { Box, Flex } from "@chakra-ui/react"
import { useState } from "react"
import ProjectContent from "./ProjectContent"
import ProjectHeader from "./ProjectHeader"

interface Props {
    params: { id: string }
}

const Project = ({ params }: Props) => {
    const { data: project, error, isLoading } = useGetProjectQuery(params.id);
    const [tabs, setTabs] = useState(tabsList);

    if (error) handleErrors(error, getProjectError.type);

    if (!project) return null;

    return (
        <Flex className='w-full h-full flex-col'>
            {isLoading ?
                <>
                    <ContentHeader />
                    <ContentBody />
                </>
                :

                <>
                    <ProjectHeader project={project} tabs={tabs} setTabs={setTabs} />
                    <Box className='overflow-x-scroll overflow-y-hidden flex-[1_0_0]'>
                        <ProjectContent project={project} tabs={tabs} />
                    </Box>
                </>
            }
        </Flex>
    )
}

export default Project