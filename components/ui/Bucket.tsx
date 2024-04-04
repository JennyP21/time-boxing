import Stack from '@/components/ui/Stack';
import AddTask from './AddTask';
import BucketHeader from './BucketHeader';
import TasksList from './TasksList';

interface Props {
    id: string;
    name: string;
}

const Bucket = ({ name, id }: Props) => {
    return (
        <Stack>
            <BucketHeader name={name} id={id} />
            <AddTask bucket_id={id} />
            <TasksList bucket_id={id} />
        </Stack>
    )
}

export default Bucket