"use client"
import { convertToTeamList } from "@/components/utils";
import { useGetTeamsByUserIdQuery } from "@/lib/features/teamApi";
import { Button, useDisclosure } from "@chakra-ui/react";
import AddProject from "./AddProject";

interface Props {
    user_id: string;
}

const AddProjectContainer = ({ user_id }: Props) => {
    const { onClose, onOpen, isOpen } = useDisclosure();

    const { data: teams } = useGetTeamsByUserIdQuery(user_id);

    return (
        <>
            <Button onClick={onOpen} colorScheme="blue" w="full" size="sm">
                Add Project
            </Button>
            <AddProject onClose={onClose} isOpen={isOpen} teams={convertToTeamList(teams)} user_id={user_id} />
        </>
    )
}

export default AddProjectContainer