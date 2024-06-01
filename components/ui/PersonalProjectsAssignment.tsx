import { UserI } from '@/interfaces';
import { useSession } from 'next-auth/react';
import AssignUserContainer from './AssignUserContainer';

const PersonalProjectsAssignment = ({ task_id }: { task_id: string }) => {
    const { data } = useSession();
    if (!data) return null;
    const users = [{
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        image: data.user.image
    }] as UserI[];

    return (
        <AssignUserContainer users={users} task_id={task_id} />
    )
}

export default PersonalProjectsAssignment