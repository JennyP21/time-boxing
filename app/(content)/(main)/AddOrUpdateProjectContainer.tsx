import { handleErrors } from "@/components/utils/handleErrors";
import { getProjectError } from "@/constants";
import { ProjectI } from "@/interfaces";
import { useGetTeamsByUserIdQuery } from "@/lib/features/teamApi";
import { Button, Icon, useDisclosure } from "@chakra-ui/react";
import { LuPencil } from "react-icons/lu";
import AddOrUpdateProject from "./AddOrUpdateProject";

interface Props {
    user_id: string;
    currentProject?: ProjectI;
}

const AddOrUpdateProjectContainer = ({ user_id, currentProject }: Props) => {
    const { onClose, onOpen, isOpen } = useDisclosure();

    const { data: teams, error } = useGetTeamsByUserIdQuery(user_id);

    if (error) handleErrors(error, getProjectError.type);

    return (
        <>
            {currentProject ? <Icon onClick={onOpen} as={LuPencil} className='rounded-tl-lg rounded-br-lg cursor-pointer' w={5} h={5} _hover={{ bg: "gray.300" }} />
                :
                <Button className="w-full flex-shrink-0" onClick={onOpen} colorScheme="blue" size="sm">
                    Add Project
                </Button>
            }
            {teams && <AddOrUpdateProject onClose={onClose} isOpen={isOpen} teams={teams} user_id={user_id} currentProject={currentProject} />}
        </>
    )
}

export default AddOrUpdateProjectContainer