"use client"
import { ProjectI, TaskI } from '@/interfaces';
import { useGetBucketsByProjectIdQuery } from '@/lib/features/bucketApi';
import { useDeleteTaskMutation } from '@/lib/features/taskApi';
import { useDisclosure } from '@chakra-ui/react';
import MoreOptions from './MoreOptions';
import MoveTask from './MoveTask';

interface Props {
    task: TaskI;
    align: "center" | "end";
    project: ProjectI;
}

const MoreOptionsContainer = ({ task, align, project }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data: buckets } = useGetBucketsByProjectIdQuery(project.id);

    const [deleteTask] = useDeleteTaskMutation();
    const handleTaskDelete = async () => await deleteTask(task.id);

    return (
        <>
            <MoreOptions handleTaskDelete={handleTaskDelete} onOpen={onOpen} align={align} />
            {buckets && <MoveTask isOpen={isOpen} onClose={onClose} task_id={task.id} bucket_id={task.bucket_id} buckets={buckets} />}
        </>
    )
}

export default MoreOptionsContainer