import { ProjectI, TaskI } from '@/interfaces';
import { useGetBucketsByProjectIdQuery } from '@/lib/features/bucketApi';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

interface Props {
    selectedTask: TaskI;
    setSelectedTask: (task: TaskI) => void;
    handleTaskUpdate?: () => void;
    project: ProjectI;
}

const BucketSelector = ({ selectedTask, setSelectedTask, handleTaskUpdate, project }: Props) => {

    const { data: buckets } = useGetBucketsByProjectIdQuery(project.id);

    if (!buckets) return null;

    const selectedBucket = buckets.find(bucket => bucket.id === selectedTask.bucket_id);

    return (
        <Menu size="sm">
            <MenuButton as={Button} justifyContent="left" width="fit-content" fontWeight="normal" onBlur={handleTaskUpdate}>
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