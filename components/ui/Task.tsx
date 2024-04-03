"use client"
import { TaskWithUserI } from '@/interfaces';
import { useGetStepsByTaskIdQuery } from '@/lib/features/stepsApi';
import { useDeleteTaskMutation } from '@/lib/features/taskApi';
import { Card, CardBody, CardFooter, CardHeader, Checkbox, Flex, Icon, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from '@chakra-ui/react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import AssignUserToTask from './AssignUserToTask';
import LabelDisplay from './LabelDisplay';
import MoveTask from './MoveTask';
import StepsDetails from './StepsDetails';
import TaskDetails from './TaskDetails';

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
                        <MenuItem onClick={onOpenMoveTask}>Move</MenuItem>
                        <MenuItem onClick={handleDelete}>Delete</MenuItem>
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
            <CardBody px={3} py={1}>
                {task.showOnTask === "note" &&
                    <Text className='text-xs overflow-clip whitespace-nowrap'>{task.note}</Text>
                }
                {task.showOnTask === "steps" && steps &&
                    <StepsDetails steps={steps} task_id={task.id} showMinimumVersion={true} />
                }
                {steps && steps.length > 0 && <Flex mt={2} alignItems="center" fontSize="small">
                    <Icon as={IoIosCheckmarkCircleOutline} w={4} h={4} mr={1} />
                    {steps &&
                        `${steps.filter(step => step.checked === true).length} / ${steps.length}`
                    }
                </Flex>}
            </CardBody>
            <CardFooter px={3} py={0} borderTop={"1px"} borderColor={"gray.200"}>
                <AssignUserToTask image={user.image} name={user.name} />
            </CardFooter>
            <MoveTask user_id={user.id} bucket_id={task.bucket_id} task_id={task.id} isOpen={isOpenMoveTask} onClose={onCloseMoveTask} />
            <TaskDetails taskWithUser={taskWithUser} isOpen={isOpenTask} onClose={onCloseTask} />
        </Card>
    )
}

export default Task