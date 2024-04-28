"use client"
import { handleErrors } from '@/components/utils/handleErrors';
import { addBucketError } from '@/constants';
import { BucketI, ProjectI } from '@/interfaces';
import { useAddBucketMutation } from '@/lib/features/bucketApi';
import { Box, Input, Spinner, Text } from '@chakra-ui/react';
import { SyntheticEvent, useState } from 'react';

interface Props {
    lastBucketOrder: number;
    project: ProjectI;
}

const AddBucket = ({ lastBucketOrder, project }: Props) => {
    const [active, setActive] = useState(false);

    const [addBucket, { error, isLoading }] = useAddBucketMutation();

    if (error) handleErrors(error, addBucketError.type);

    const handleAddBucket = async (e: SyntheticEvent) => {
        setActive(false);
        const target = (e.target as HTMLInputElement);
        if (target.value) {
            const data = {
                name: target.value,
                order: lastBucketOrder + 1,
                project_id: project.id
            } as BucketI;
            await addBucket(data);
        };
    }

    return (
        <Box minWidth="280px" maxWidth="300px" ml={2} p={1}>
            {isLoading ? <Spinner size="sm" /> :
                <>
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
                </>
            }
        </Box>
    )
}

export default AddBucket