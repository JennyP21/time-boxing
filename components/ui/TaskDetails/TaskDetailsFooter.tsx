import { formatDate } from '@/components/utils';
import { Button, ModalFooter, Text } from '@chakra-ui/react';

interface Props {
    created_at: Date;
    onClose: () => void;
}

const TaskDetailsFooter = ({ created_at, onClose }: Props) => {
    return (
        <ModalFooter py={1} justifyContent="space-between">
            <Text fontSize="small" textColor="gray.500">
                {`Created at ${formatDate(created_at)}`}
            </Text>
            <Button variant='ghost' onClick={onClose}>Close</Button>
        </ModalFooter>
    )
}

export default TaskDetailsFooter