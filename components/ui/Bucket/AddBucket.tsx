"use client"
import { toast } from '@/components/error/Toast';
import { addBucketError } from '@/constants';
import { BucketI, ProjectI } from '@/interfaces';
import { useAddBucketMutation } from '@/lib/features/bucketApi';
import { Box, Input, Text } from '@chakra-ui/react';
import { SyntheticEvent, useState } from 'react';

interface Props {
    lastBucketOrder: number;
    project: ProjectI;
}

const AddBucket = ({ lastBucketOrder, project }: Props) => {
    const [active, setActive] = useState(false);

    const [addBucket, { error }] = useAddBucketMutation();

    const handleAddBucket = async (e: SyntheticEvent) => {
        const target = (e.target as HTMLInputElement);
        if (target.value) {
            const data = {
                name: target.value,
                order: lastBucketOrder + 1,
                project_id: project.id
            } as BucketI;
            await addBucket(data);
        };
        setActive(false);
    }

    if (error) toast.error(addBucketError.message, {
        toastId: addBucketError.type
    });

    return (
        <Box minWidth="280px" maxWidth="300px" ml={2} p={2}>
            {active ?
                <Input
                    autoFocus
                    size={"xs"}
                    placeholder='Add a name to your bucket'
                    onBlur={(e) => handleAddBucket(e)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddBucket(e)}
                />
                :
                <Text cursor="pointer" onClick={() => setActive(true)}>Add new Bucket</Text>
            }
        </Box>
    )
}

export default AddBucket