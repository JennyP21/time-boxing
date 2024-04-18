import { AddMemberI, CustomMembers } from '@/interfaces';
import { Select } from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';

interface Props {
    user?: CustomMembers;
    register?: UseFormRegister<AddMemberI>
}

const RoleSelector = ({ user, register }: Props) => {
    return (
        <Select placeholder='Select Role' defaultValue={user?.role} {...register && { ...register("role") }}>
            <option value="owner">Owner</option>
            <option value="member">Member</option>
        </Select>
    )
}

export default RoleSelector