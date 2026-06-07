import TaskDetails from '@/components/ui/TaskDetails/TaskDetails';
import { TaskWithDetailsI } from '@/interfaces';
import { Text, useDisclosure, Flex, Badge } from '@chakra-ui/react';

const TaskTitle = ({ task }: { task: TaskWithDetailsI }) => {
    const { onOpen, onClose, isOpen } = useDisclosure();

    const getComplexityBadge = (score: number | null | undefined) => {
        if (!score) return null;
        let colorScheme = "green";
        
        switch (score) {
            case 2:
                colorScheme = "cyan";
                break;
            case 3:
                colorScheme = "blue";
                break;
            case 4:
                colorScheme = "orange";
                break;
            case 5:
                colorScheme = "purple";
                break;
        }
        
        return (
            <Badge colorScheme={colorScheme} variant="subtle" px={1.5} py={0.2} borderRadius="full" fontSize="3xs" ml={2} alignSelf="center">
                C:{score}
            </Badge>
        );
    };

    return (
        <Flex alignItems="center" display="inline-flex" maxW="100%">
            <Text
                className='hover:underline cursor-pointer truncate'
                textDecor={task.progress === "Completed" ? "line-through" : ""}
                textColor={task.progress === "Completed" ? "gray.300" : ""}
                onClick={onOpen}
            >
                {task.title}
            </Text>
            {getComplexityBadge(task.entitlementScore)}
            <TaskDetails isOpen={isOpen} onClose={onClose} task={task} />
        </Flex>
    )
}

export default TaskTitle;