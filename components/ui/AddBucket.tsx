"use client"
import { Bucket } from '@/interfaces';
import { useAddBucketMutation } from '@/lib/features/bucketApi';
import { Box, Input, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'

const AddBucket = () => {
    const [active, setActive] = useState(false);
    const [name, setName] = useState("");
    const session = useSession();

    const [addBucket] = useAddBucketMutation();

    const handleOnBlur = async () => {
        const data = {
            name,
            user_id: session.data?.user?.id
        } as Bucket;
        if (name) {
            await addBucket(data);
            setName("");
        };
        setActive(false);
    }

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