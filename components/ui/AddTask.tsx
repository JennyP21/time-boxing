"use client"
import { TaskI } from '@/interfaces';
import { useAddTaskMutation } from '@/lib/features/taskApi';
import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Input, InputGroup, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import BucketSelector from './BucketSelector';

interface Props {
    bucket_id?: string
}

const AddTask = ({ bucket_id }: Props) => {
    const session = useSession();
    const [active, setActive] = useState(false);
    const [addTask] = useAddTaskMutation();

    const initialData = {
        title: "",
        end_date: "",
        bucket_id: bucket_id || "",
        user_id: session.data?.user.id,
    };
    const [data, setData] = useState(initialData);

    const handleSubmit = async () => {
        await addTask(data as TaskI);
        setData(initialData);
        setActive(false);
    }

    return (
        <>
            <Button
                className='p-2 rounded-sm w-full text-center shadow-sm hover:shadow-md transition-all'
                background="gray.50"
                fontWeight="normal"
                onClick={() => setActive(true)}
            >
                Add Task
            </Button>
            {active && <Card background="gray.50">
                <CardHeader>
                    <Input autoFocus placeholder='Enter a task name.' py={0} h={7} defaultValue={data.title} onChange={(e) => {
                        setData({ ...data, title: e.target.value });
                    }} onBlur={(e) => (
                        e.target.value.trim() === "" && setActive(false)
                    )} />
                </CardHeader>
                <CardBody py={0}>
                    <Flex flexDir="column" justifyContent="left" gap={3}>
                        {!bucket_id && <BucketSelector selectedTask={data as TaskI} setSelectedTask={setData} />}
                        <InputGroup alignItems="center" gap={2}>
                            <Text>Due:</Text>
                            <Input type='Date' w="fit-content" size="md" onChange={(e) => setData({ ...data, end_date: e.target.value })} />
                        </InputGroup>
                    </Flex>
                </CardBody>
                <CardFooter>
                    <Button
                        className='p-2 rounded-sm w-full text-center shadow-sm hover:shadow-md transition-all'
                        background="blackAlpha.300"
                        fontWeight="normal"
                        isDisabled={data.bucket_id === "" || data.title === ""}
                        onClick={handleSubmit}
                    >
                        Add Task
                    </Button>
                </CardFooter>
            </Card>}
        </>
    )
}

export default AddTask