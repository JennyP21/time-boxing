import { handleErrors } from "@/components/utils/handleErrors";
import { getProjectError } from "@/constants";
import { ProjectI } from "@/interfaces";
import { useGetTeamsByUserIdQuery } from "@/lib/features/teamApi";
import { useDisclosure } from "@chakra-ui/react";
import EditIcon from "./EditIcon";
import UpdateProject from "./UpdateProject";

interface Props {
    user_id: string;
    currentProject: ProjectI;
}

const UpdateProjectContainer = ({ user_id, currentProject }: Props) => {
    const { onClose, onOpen, isOpen } = useDisclosure();

    const { data: teams, error } = useGetTeamsByUserIdQuery(user_id);

    if (error) handleErrors(error, getProjectError.type);

    return (
        <>
            <EditIcon onOpen={onOpen} />
            {teams && <UpdateProject onClose={onClose} isOpen={isOpen} teams={teams} user_id={user_id} currentProject={currentProject} />}
        </>
    )
}

export default UpdateProjectContainer