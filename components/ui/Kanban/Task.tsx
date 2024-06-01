"use client"
import { handleErrors } from '@/components/utils/handleErrors';
import { getStepsError } from '@/constants';
import { ProjectI, TaskI } from '@/interfaces';
import { useGetStepsByTaskIdQuery } from '@/lib/features/stepsApi';
import { Card, CardBody, CardFooter, CardHeader, Flex, Icon, Spinner, Text, useDisclosure } from '@chakra-ui/react';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import UserAssignmentContainer from '../UserAssignmentContainer';
import CheckTask from '../CheckTask';
import MoreOptionsContainer from '../MoreOptionsContainer';
import StepsDetails from '../TaskDetails/StepsDetails';
import TaskDetails from '../TaskDetails/TaskDetails';
import LabelDisplay from './LabelDisplay';

interface Props {
    task: TaskI;
    project: ProjectI;
}

const Task = ({ task, project }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data: steps, isLoading, error } = useGetStepsByTaskIdQuery(task.id);

    if (error) handleErrors(error, getStepsError.type);

    return (
        <Card
            backgroundColor="gray.50"
            className='relative w-full text-left shadow-sm hover:shadow-md transition-all'
        >
            <CardHeader alignItems="center" px={3} py={1}>
                <MoreOptionsContainer task={task} align='end' project={project} />
                <LabelDisplay task_id={task.id} />
                <Flex alignItems="center" gap={1}>
                    <CheckTask task={task} />
                    <Text
                        className='cursor-pointer hover:underline'
                        textDecor={task.progress === "Completed" ? "line-through" : ""}
                        textColor={task.progress === "Completed" ? "gray.300" : ""}
                        onClick={onOpen}
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
                    (isLoading ?
                        <Spinner size="sm" />
                        :
                        <StepsDetails steps={steps} task_id={task.id} showMinimumVersion={true} />
                    )
                }
                {steps && steps.length > 0 && <Flex mt={2} alignItems="center" fontSize="small">
                    <Icon as={IoIosCheckmarkCircleOutline} w={4} h={4} mr={1} />
                    {steps &&
                        `${steps.filter(step => step.checked === true).length} / ${steps.length}`
                    }
                </Flex>}
            </CardBody>
            <CardFooter px={3} py={0} borderTop={"1px"} borderColor={"gray.200"}>
                <UserAssignmentContainer project_id={project.id} task_id={task.id} />
            </CardFooter>
            <TaskDetails task={task} isOpen={isOpen} onClose={onClose} />
        </Card>
    )
}

export default Task