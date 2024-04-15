"use client"
import BucketSelector from '@/components/ui/BucketSelector';
import { ProjectI, TaskI } from '@/interfaces';
import { Flex, Icon, Input, Td, Text, Tr } from '@chakra-ui/react';
import { IoIosCheckmark, IoIosClose } from 'react-icons/io';

interface Props {
    active: boolean,
    setActive: (value: boolean) => void;
    data: TaskI;
    setData: (value: TaskI) => void;
    handleSubmit: () => void;
    project: ProjectI;
}

const AddListTask = ({ active, setActive, data, setData, handleSubmit, project }: Props) => {
    return (
        <Tr role='group'>
            <Td px={3}></Td>
            <Td px={1} cursor="pointer">
                {active ?
                    <Input
                        autoFocus
                        size="small"
                        placeholder='Add new task'
                        _focus={{ boxShadow: "none" }}
                        border="none"
                        outline="none"
                        onBlur={(e) => e.target.value === "" && setActive(false)}
                        onChange={(e) => setData({ ...data, title: e.target.value })}
                    />
                    :
                    <Text className="hover:underline" color='blue.300' onClick={() => setActive(true)}>
                        Add new task
                    </Text>
                }
            </Td>
            <Td py={0} px={1}></Td>
            <Td p={1}>
                <BucketSelector project={project} selectedTask={data} setSelectedTask={setData} />
            </Td>
            <Td p={1}></Td>
            <Td p={1}></Td>
            <Td p={1}></Td>
            <Td p={1}>
                <Flex className='justify-center items-center' visibility={(data.title === "" || data.bucket_id === "") ? "hidden" : "visible"}>
                    <Icon as={IoIosCheckmark} className='rounded-full' w={8} h={8} _hover={{ bg: "gray.200" }} onClick={handleSubmit} />
                    <Icon as={IoIosClose} className='rounded-full' w={8} h={8} _hover={{ bg: "gray.200" }} onClick={() => {
                        setActive(false);
                    }} />
                </Flex>
            </Td>
        </Tr>
    )
}

export default AddListTask