"use client"
import { useSession } from "next-auth/react";
import GetTeamsWrapper from "./GetTeamsWrapper";

const Dashboard = () => {
    const user_id = useSession().data?.user.id;
    if (!user_id) return null;

    return (
        <GetTeamsWrapper user_id={user_id} />
    )
}

export default Dashboard