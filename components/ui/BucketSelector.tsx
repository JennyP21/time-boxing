import { getBucketsError } from '@/constants';
import { ProjectI, TaskI } from '@/interfaces';
import { useGetBucketsByProjectIdQuery } from '@/lib/features/bucketApi';
import { Button, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from '@chakra-ui/react';
import { handleErrors } from '../utils/handleErrors';
import BucketModal from './BucketModal';

interface Props {
    selectedTask: TaskI;
    setSelectedTask: (task: TaskI) => void;
    handleTaskUpdate?: () => void;
    project: ProjectI;
}

const BucketSelector = ({ selectedTask, setSelectedTask, handleTaskUpdate, project }: Props) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { data: buckets, error } = useGetBucketsByProjectIdQuery(project.id);

    if (error) handleErrors(error, getBucketsError.type);

    if (!buckets) return null;

    const selectedBucket = buckets.find(bucket => bucket.id === selectedTask.bucket_id);

    return (
        <>
            <Menu>
                <MenuButton as={Button} justifyContent="left" width="fit-content" fontWeight="normal" onBlur={handleTaskUpdate} size="sm">
                    {selectedBucket ? selectedBucket.name : "Select a bucket"}
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={() => setSelectedTask({ ...selectedTask, bucket_id: "" })}>Select a bucket</MenuItem>
                    {buckets.map(bucket => (
                        <MenuItem key={bucket.id} onClick={() => setSelectedTask({ ...selectedTask, bucket_id: bucket.id })}>{bucket.name}</MenuItem>
                    ))}
                    <MenuItem size="sm" as={Button} onClick={onOpen} justifyContent="start" >Add Bucket</MenuItem>
                </MenuList>
            </Menu>
            <BucketModal
                isOpen={isOpen}
                onClose={onClose}
                project={project}
                buckets={buckets}
                lastBucketOrder={(buckets && buckets.length > 0) ? buckets[buckets.length - 1].order : 0}
            />
        </>
    )
}

export default BucketSelector