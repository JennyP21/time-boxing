import { VStack } from '@chakra-ui/react';
import BucketHeader from './BucketHeader';
import TasksList from './TasksList';
import AddTask from './AddTask';

interface Props {
    id: string;
    name: string;
}

const Bucket = ({ name, id }: Props) => {
    return (
        <VStack className='overflow-y-scroll' minWidth="280px" maxWidth="300px" ml={2} px={1}>
            <BucketHeader name={name} id={id} />
            <AddTask bucket_id={id} />
            <TasksList bucket_id={id} />
        </VStack>
    )
}

export default Bucket