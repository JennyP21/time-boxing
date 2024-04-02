"use client"
import { TaskWithUserI } from '@/interfaces';
import { useDeleteTaskMutation } from '@/lib/features/taskApi';
import { Card, CardBody, CardFooter, CardHeader, Checkbox, Flex, Icon, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from '@chakra-ui/react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import AssignUserToTask from './AssignUserToTask';
import LabelDisplay from './LabelDisplay';
import TaskDetails from './TaskDetails';
import { useGetStepsByTaskIdQuery } from '@/lib/features/stepsApi';
import MoveTask from './MoveTask';

interface Props {
    taskWithUser: TaskWithUserI
}

const Task = ({ taskWithUser }: Props) => {
    const task = taskWithUser.tasks;
    const user = taskWithUser.user;

    const { isOpen: isOpenTask, onOpen: onOpenTask, onClose: onCloseTask } = useDisclosure();
    const { isOpen: isOpenMoveTask, onOpen: onOpenMoveTask, onClose: onCloseMoveTask } = useDisclosure();
    const [deleteTask] = useDeleteTaskMutation();
    const { data: steps } = useGetStepsByTaskIdQuery(task.id);

    const handleDelete = async () => {
        await deleteTask(task.id);
    }

    return (
        <Card
            backgroundColor="gray.50"
            className='relative cursor-pointer w-full text-left shadow-sm hover:shadow-md transition-all'
        >
            <CardHeader alignItems="center" px={3} py={1}>
                <Menu placement='bottom-end'>
                    <MenuButton className='absolute right-2 top-1'>
                        <Icon as={HiOutlineDotsHorizontal} w={4} h={4} />
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={handleDelete}>Delete</MenuItem>
                        <MenuItem onClick={onOpenMoveTask}>Move</MenuItem>
                    </MenuList>
                </Menu>
                <LabelDisplay task_id={task.id} />
                <Flex alignItems="center" gap={1}>
                    <Checkbox size={"md"} />
                    <Text onClick={onOpenTask}>
                        {task.title}
                    </Text>
                </Flex>
            </CardHeader>
            <CardBody px={3} pt={0}>
                {task.showOnTask === "note" &&
                    <Text className='text-xs overflow-clip whitespace-nowrap'>{task.note}</Text>
                }
                {task.showOnTask === "steps" &&
                    <Flex flexDir="column">
                        {steps && steps.map(step => (
                            <Flex key={step.id} alignItems="center" gap={1} fontSize="small">
                                <Checkbox size={"md"} />
                                {step.value}
                            </Flex>
                        ))}
                    </Flex>
                }
            </CardBody>
            <CardFooter px={3} py={0} borderTop={"1px"} borderColor={"gray.200"}>
                <AssignUserToTask image={user.image} name={user.name} />
            </CardFooter>
            <MoveTask user_id={user.id} bucket_id={task.bucket_id} task_id={task.id} isOpen={isOpenMoveTask} onClose={onCloseMoveTask} />
            <TaskDetails taskWithUser={taskWithUser} isOpen={isOpenTask} onClose={onCloseTask} />
        </Card >
    )
}

export default Task