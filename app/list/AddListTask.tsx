"use client"
import { TaskI } from '@/interfaces';
import { useAddTaskMutation } from '@/lib/features/taskApi';
import { Flex, Icon, Input, Td, Text, Tr } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { IoIosCheckmark, IoIosClose } from 'react-icons/io';

const AddListTask = () => {
    const session = useSession();
    const [newTask, setNewTask] = useState(false);

    const initialData = {
        title: "",
        end_date: "",
        bucket_id: "",
        user_id: session.data?.user.id,
    } as TaskI;
    const [data, setData] = useState(initialData);

    const [addTask] = useAddTaskMutation();

    const handleAddTask = async () => {
        await addTask(data);
        setData(initialData);
        setNewTask(false);
    }

    return (
        <Tr role='group'>
            <Td px={3}></Td>
            <Td px={1} cursor="pointer">
                {newTask ?
                    <Input
                        autoFocus
                        size="small"
                        placeholder='Add new task'
                        _focus={{ boxShadow: "none" }}
                        border="none"
                        outline="none"
                        onBlur={(e) => e.target.value === "" && setNewTask(false)}
                        onChange={(e) => setData({ ...data, title: e.target.value })}
                    />
                    :
                    <Text className="hover:underline" color='blue.300' onClick={() => setNewTask(true)}>
                        Add new task
                    </Text>
                }
            </Td>
            <Td py={0} px={1}></Td>
            <Td px={1}></Td>
            <Td px={1}></Td>
            <Td px={1}></Td>
            <Td p={1}></Td>
            <Td p={1}>
                <Flex className='justify-center items-center' visibility={(data.title === "" && data.bucket_id === "") ? "hidden" : "visible"}>
                    <Icon as={IoIosCheckmark} className='rounded-full' w={8} h={8} _hover={{ bg: "gray.200" }} onClick={handleAddTask} />
                    <Icon as={IoIosClose} className='rounded-full' w={8} h={8} _hover={{ bg: "gray.200" }} onClick={() => setNewTask(false)} />
                </Flex>
            </Td>
        </Tr>
    )
}

export default AddListTask