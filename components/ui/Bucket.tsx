import { VStack } from '@chakra-ui/react';
import BucketHeader from './BucketHeader';
import TasksList from './TasksList';

interface Props {
    id: string;
    name: string;
}

const Bucket = ({ name, id }: Props) => {
    return (
        <VStack minWidth="280px" maxWidth="300px" ml={2} p={2}>
            <BucketHeader name={name} id={id} />
            <TasksList bucket_id={id} />
        </VStack>
    )
}

export default Bucket