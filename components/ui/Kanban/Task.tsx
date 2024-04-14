"use client"
import { TaskI } from '@/interfaces';
import { useGetStepsByTaskIdQuery } from '@/lib/features/stepsApi';
import { Card, CardBody, CardFooter, CardHeader, Flex, Icon, Text, useDisclosure } from '@chakra-ui/react';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import CheckTask from '../CheckTask';
import MoreOptionsContainer from '../MoreOptionsContainer';
import StepsDetails from '../TaskDetails/StepsDetails';
import TaskDetails from '../TaskDetails/TaskDetails';
import LabelDisplay from './LabelDisplay';

interface Props {
    task: TaskI
}

const Task = ({ task }: Props) => {

    const { isOpen: isOpenTask, onOpen: onOpenTask, onClose: onCloseTask } = useDisclosure();
    const { data: steps } = useGetStepsByTaskIdQuery(task.id);

    return (
        <Card
            backgroundColor="gray.50"
            className='relative w-full text-left shadow-sm hover:shadow-md transition-all'
        >
            <CardHeader alignItems="center" px={3} py={1}>
                <MoreOptionsContainer task={task} align='end' />
                <LabelDisplay task_id={task.id} />
                <Flex alignItems="center" gap={1}>
                    <CheckTask task={task} />
                    <Text
                        className='cursor-pointer hover:underline'
                        textDecor={task.progress === "Completed" ? "line-through" : ""}
                        onClick={onOpenTask}
                        textColor={task.progress === "Completed" ? "gray.300" : ""}
                    >
                        {task.title}
                    </Text>
                </Flex>
            </CardHeader>
            <CardBody px={3} py={1} textColor={task.progress === "Completed" ? "gray.300" : ""}>
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
                {/* <AssignUserToTask image={user.image} name={user.name} /> */}
            </CardFooter>
            <TaskDetails task={task} isOpen={isOpenTask} onClose={onCloseTask} />
        </Card>
    )
}

export default Task