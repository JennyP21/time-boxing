import { TaskI } from '@/interfaces';
import { useGetBucketsQuery } from '@/lib/features/bucketApi';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

interface Props {
    selectedTask: TaskI;
    setSelectedTask: (task: TaskI) => void;
}

const BucketSelector = ({ selectedTask, setSelectedTask }: Props) => {

    const { data: buckets } = useGetBucketsQuery();

    if (!buckets) return null;

    const selectedBucket = buckets.find(bucket => bucket.id === selectedTask.bucket_id);

    return (
        <Menu>
            <MenuButton as={Button} justifyContent="left" width="fit-content">
                {selectedBucket ? selectedBucket.name : "Select a bucket"}
            </MenuButton>
            <MenuList>
                <MenuItem onClick={() => setSelectedTask({ ...selectedTask, bucket_id: "" })}>Select a bucket</MenuItem>
                {buckets.map(bucket => (
                    <MenuItem key={bucket.id} onClick={() => setSelectedTask({ ...selectedTask, bucket_id: bucket.id })}>{bucket.name}</MenuItem>
                ))}
            </MenuList>
        </Menu>
    )
}

export default BucketSelector