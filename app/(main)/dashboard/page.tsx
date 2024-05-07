"use client"
import { useSession } from "next-auth/react";
import GetTeamsWrapper from "./GetTeamsWrapper";
import { Box } from "@chakra-ui/react";

const Dashboard = () => {
    const user_id = useSession().data?.user.id;
    if (!user_id) return null;

    return (
        <Box className="flex w-full h-full">
            <GetTeamsWrapper user_id={user_id} />
        </Box>
    )
}

export default Dashboard