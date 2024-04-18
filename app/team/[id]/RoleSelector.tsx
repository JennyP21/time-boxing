import { AddMemberI, CustomMembers, TeamMemberI } from '@/interfaces';
import { useUpdateTeamMemberRoleMutation } from '@/lib/features/teamApi';
import { Select } from '@chakra-ui/react';
import { SyntheticEvent } from 'react';
import { UseFormRegister } from 'react-hook-form';

interface Props {
    user?: CustomMembers;
    register?: UseFormRegister<AddMemberI>
    hasOneOwner?: boolean;
}

const RoleSelector = ({ user, register, hasOneOwner }: Props) => {

    const [changeRole] = useUpdateTeamMemberRoleMutation();
    const handleRoleChange = async (e: SyntheticEvent) => {
        const newRole = (e.target as HTMLSelectElement).value;
        if (user && newRole !== user.role) {
            const newData = {
                id: user.team_member_id,
                team_id: user.team_id,
                user_id: user.user_id,
                role: newRole,
            } as TeamMemberI;
            await changeRole(newData);
        }
    }

    return (
        <Select placeholder='Select Role' isDisabled={hasOneOwner} onBlur={(e) => handleRoleChange(e)} defaultValue={user?.role} {...register && { ...register("role") }}>
            <option value="owner">Owner</option>
            <option value="member">Member</option>
        </Select>
    )
}

export default RoleSelector