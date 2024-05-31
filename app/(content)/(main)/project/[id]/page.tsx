"use client"
import ContentBodyLoading from "@/components/loading/ContentBodyLoading"
import ContentHeaderLoading from "@/components/loading/ContentHeaderLoading"
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
                    <ContentHeaderLoading />
                    <ContentBodyLoading />
                </>
                :
                <>
                    <ProjectHeader project={project} tabs={tabs} setTabs={setTabs} />
                    <ProjectContent project={project} />
                </>
            }
        </Flex>
    )
}

export default Project