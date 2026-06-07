import { ProjectI, TaskWithDetailsI } from '@/interfaces';
import { Card, CardBody, CardFooter, CardHeader, Flex, Icon, Text, useDisclosure, Badge } from '@chakra-ui/react';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import CheckTask from '../CheckTask';
import MoreOptionsContainer from '../MoreOptionsContainer';
import TaskDetails from '../TaskDetails/TaskDetails';
import UserAssignmentContainer from '../UserAssignmentContainer';
import LabelDisplay from './LabelDisplay';
import UpdateSteps from '../UpdateSteps';
import { Draggable } from '@hello-pangea/dnd';

interface Props {
    task: TaskWithDetailsI;
    project: ProjectI;
    index?: number;
}

const Task = ({ task, project, index }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const steps = task.steps;

    const getComplexityBadge = (score: number | null | undefined) => {
        if (!score) return null;
        let label = "Easy";
        let colorScheme = "green";
        
        switch (score) {
            case 2:
                label = "Low-Med";
                colorScheme = "cyan";
                break;
            case 3:
                label = "Medium";
                colorScheme = "blue";
                break;
            case 4:
                label = "High-Med";
                colorScheme = "orange";
                break;
            case 5:
                label = "Complex";
                colorScheme = "purple";
                break;
        }
        
        return (
            <Badge colorScheme={colorScheme} variant="subtle" px={2} py={0.5} borderRadius="full" fontSize="2xs" fontWeight="bold">
                C:{score}
            </Badge>
        );
    };

    const cardContent = (isDragging?: boolean) => (
        <Card
            className={`relative w-full text-left glass-card transition-all rounded-xl p-2 ${
                isDragging ? 'shadow-lg border-indigo-500' : ''
            }`}
        >
            <CardHeader alignItems="center" px={3} py={1}>
                <MoreOptionsContainer task={task} align='end' project={project} />
                <LabelDisplay labels={task.tasks_labels.map(tl => tl.label)} />
                <Flex alignItems="center" gap={1}>
                    <CheckTask task={task} />
                    <Text
                        className='cursor-pointer hover:underline font-medium'
                        textDecor={task.progress === "Completed" ? "line-through" : ""}
                        textColor={task.progress === "Completed" ? "gray.400" : "gray.800"}
                        onClick={onOpen}
                    >
                        {task.title}
                    </Text>
                </Flex>
            </CardHeader>
            <CardBody px={3} py={1} textColor={task.progress === "Completed" ? "gray.400" : "gray.600"}>
                {task.showOnTask === "note" &&
                    <Text className='text-xs overflow-clip whitespace-nowrap'>{task.note}</Text>
                }
                {task.showOnTask === "steps" && steps &&
                    <UpdateSteps steps={steps} task_id={task.id} hideCheckedStep />
                }
                {steps && steps.length > 0 && <Flex mt={2} alignItems="center" fontSize="small" textColor="gray.500">
                    <Icon as={IoIosCheckmarkCircleOutline} w={4} h={4} mr={1} />
                    {steps &&
                        `${(steps.filter(step => step.checked === true).length)} / ${steps.length}`
                    }
                </Flex>}
            </CardBody>
            <CardFooter px={3} py={1} borderTop={"1px"} borderColor={"gray.100"} mt={2} display="flex" justifyContent="space-between" alignItems="center">
                <UserAssignmentContainer project_id={project.id} task_id={task.id} assignedUsers={task.task_assignees.map(ta => ta.user)} />
                {getComplexityBadge(task.entitlementScore)}
            </CardFooter>
        </Card>
    );

    if (index === undefined) {
        return (
            <div>
                {cardContent()}
                <TaskDetails task={task} isOpen={isOpen} onClose={onClose} />
            </div>
        );
    }

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        ...provided.draggableProps.style,
                        userSelect: 'none',
                    }}
                >
                    {cardContent(snapshot.isDragging)}
                    <TaskDetails task={task} isOpen={isOpen} onClose={onClose} />
                </div>
            )}
        </Draggable>
    )
}

export default Task