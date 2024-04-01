"use client"
import { TaskI } from '@/interfaces';
import { useAddTaskMutation } from '@/lib/features/taskApi';
import { Button, Card, CardBody, CardFooter, CardHeader, Input } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

interface Props {
    bucket_id: string
}

const AddTask = ({ bucket_id }: Props) => {
    const session = useSession();
    const [active, setActive] = useState(false);
    const [addTask] = useAddTaskMutation();

    const initialData = {
        title: "",
        bucket_id,
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
                    Due Date coming soon...
                </CardBody>
                <CardFooter>
                    <Button
                        className='p-2 rounded-sm w-full text-center shadow-sm hover:shadow-md transition-all'
                        background="blackAlpha.300"
                        fontWeight="normal"
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