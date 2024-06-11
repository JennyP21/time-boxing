import ConfirmDelete from '@/components/ui/ConfirmDelete';
import { handleErrors } from '@/components/utils/handleErrors';
import { removeTeamMemberError } from '@/constants';
import { CustomMembersI, TeamMemberI } from '@/interfaces';
import { useRemoveMemberMutation } from '@/lib/features/teamApi';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    user: CustomMembersI;
}

const RemoveMember = ({ isOpen, onClose, user }: Props) => {
    const [removeMember, { isLoading, error }] = useRemoveMemberMutation();

    if (error) handleErrors(error, removeTeamMemberError.type);

    const handleRemoveMember = async () => {
        const data = {
            team_id: user.team_id,
            user_id: user.user_id,
        } as TeamMemberI;
        await removeMember(data);
        onClose();
    }

    return (
        <ConfirmDelete isOpen={isOpen} onClose={onClose} handleRemove={handleRemoveMember} item={user.name} isLoading={isLoading} />
    )
}

export default RemoveMember