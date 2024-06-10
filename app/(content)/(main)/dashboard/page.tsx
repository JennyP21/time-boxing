"use client"
import { Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import GetTeamsWrapper from "./GetTeamsWrapper";

const Dashboard = () => {
    const user_id = useSession().data?.user.id;
    if (!user_id) return null;

    return (
        <Box className="w-full h-full max-md:h-[calc(100%-4.75rem)] overflow-y-scroll">
            <GetTeamsWrapper user_id={user_id} />
        </Box>
    )
}

export default Dashboard