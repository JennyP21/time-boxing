"use client"
import { Box, Flex } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import ProjectHeading from "./ProjectHeading";
import ProjectContent from "./ProjectContent";

const ProjectPage = () => {
    const session = useSession();
    const user_id = session.data?.user.id;

    return (
        <Flex className="flex-col w-full h-full">
            <ProjectHeading>All Projects</ProjectHeading>
            <Box className='p-3 flex-[1_0_0] overflow-scroll'>
                {user_id && <ProjectContent user_id={user_id} />}
            </Box>
        </Flex>
    )
}

export default ProjectPage