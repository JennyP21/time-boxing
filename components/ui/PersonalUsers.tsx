import { UserI } from '@/interfaces';
import { useSession } from 'next-auth/react';
import React from 'react'
import AssignUser from './AssignUser';

const PersonalUsers = ({ task_id }: { task_id: string }) => {
    const { data } = useSession();
    if (!data) return null;
    const users = [{
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        image: data.user.image
    }] as UserI[];

    return (
        <AssignUser users={users} task_id={task_id} />
    )
}

export default PersonalUsers