"use client"
import { Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import ProjectHeading from "./ProjectHeading";
import ProjectGrid from "./ProjectGrid";

const ProjectHome = () => {
    const session = useSession();
    const user_id = session.data?.user.id;

    return (
        <Box>
            <ProjectHeading>All Projects</ProjectHeading>
            <Box className='p-5'>
                {user_id && <ProjectGrid user_id={user_id} />}
            </Box>
        </Box>
    )
}

export default ProjectHome