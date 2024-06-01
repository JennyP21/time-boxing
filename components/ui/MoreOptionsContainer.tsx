"use client"
import { deleteTaskError, getBucketsError } from '@/constants';
import { ProjectI, TaskI } from '@/interfaces';
import { useGetBucketsByProjectIdQuery } from '@/lib/features/bucketApi';
import { useDeleteTaskMutation } from '@/lib/features/taskApi';
import { useDisclosure } from '@chakra-ui/react';
import { handleErrors } from '../utils/handleErrors';
import MoreOptions from './MoreOptions';
import MoveTask from './MoveTask';

interface Props {
    task: TaskI;
    align: "center" | "end";
    project: ProjectI;
}

const MoreOptionsContainer = ({ task, align, project }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data: buckets, error } = useGetBucketsByProjectIdQuery(project.id);
    if (error) handleErrors(error, getBucketsError.type);

    const [deleteTask, { error: taskDeleteError }] = useDeleteTaskMutation();
    if (taskDeleteError) handleErrors(taskDeleteError, deleteTaskError.type);
    const handleTaskDelete = async () => await deleteTask(task.id);

    return (
        <>
            <MoreOptions
                project={project}
                task={task}
                handleTaskDelete={handleTaskDelete}
                onOpen={onOpen}
                align={align}
                canMove={buckets !== undefined && buckets.length > 1}
            />
            {buckets && buckets.length > 1 && <MoveTask isOpen={isOpen} onClose={onClose} task_id={task.id} bucket_id={task.bucket_id} buckets={buckets} />}
        </>
    )
}

export default MoreOptionsContainer