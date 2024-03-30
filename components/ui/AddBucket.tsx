"use client"
import { toast } from '@/app/api/Toast';
import { addBucketError } from '@/constants';
import { BucketI } from '@/interfaces';
import { useAddBucketMutation } from '@/lib/features/bucketApi';
import { Box, Input, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const AddBucket = () => {
    const [active, setActive] = useState(false);
    const [name, setName] = useState("");
    const session = useSession();

    const [addBucket, { error }] = useAddBucketMutation();

    const handleOnBlur = async () => {
        const data = {
            name,
            user_id: session.data?.user?.id
        } as BucketI;
        if (name) {
            await addBucket(data);
            setName("");
        };
        setActive(false);
    }

    if (error) toast.error(addBucketError.message, {
        toastId: addBucketError.type
    });

    return (
        <Box minWidth="280px" maxWidth="300px" ml={2} p={2}>
            {active ?
                <Input size={"xs"} autoFocus placeholder='Add a name to your bucket' onChange={(e) => setName(e.target.value)} onBlur={handleOnBlur} />
                :
                <Text cursor="pointer" onClick={() => setActive(true)}>Add new Bucket</Text>
            }
        </Box>
    )
}

export default AddBucket