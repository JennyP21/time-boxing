"use client"
import { TaskWithUserI } from '@/interfaces';
import { Box, Card, CardBody, CardFooter, CardHeader, Checkbox, Flex, Icon, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from '@chakra-ui/react';
import Task from './Task';
import Image from 'next/image';
import { TiUserAddOutline } from 'react-icons/ti';
import Label from './Label';

interface Props {
    taskWithUser: TaskWithUserI
}

const KanbanTask = ({ taskWithUser }: Props) => {
    const task = taskWithUser.tasks;
    const user = taskWithUser.user;

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Card
            backgroundColor="gray.50"
            className='cursor-pointer w-full text-left shadow-sm hover:shadow-md transition-all'
        >
            <CardHeader alignItems="center" px={3} py={1}>
                <Flex className='gap-1 my-3 flex-wrap'>
                    <Label labels={["Objective"]} />
                </Flex>
                <Flex alignItems="center" gap={1}>
                    <Checkbox size={"md"} />
                    <Text onClick={onOpen}>
                        {task.title}
                    </Text>
                </Flex>
            </CardHeader>
            <CardBody px={3} pt={0}>
                <Flex flexDir="column">
                    {task.steps.map(step => (
                        <Flex key={step} alignItems="center" gap={1} fontSize="small">
                            <Checkbox size={"md"} />
                            {step}
                        </Flex>
                    ))}
                </Flex>
                <Text className='text-xs overflow-clip whitespace-nowrap'>{task.note}</Text>
            </CardBody>
            <CardFooter px={3} py={2} borderTop={"1px"} borderColor={"gray.200"}>
                <Flex className='gap-1 justify-center'>
                    <Menu>
                        <MenuButton>
                            <Icon as={TiUserAddOutline} w={6} h={6} />
                        </MenuButton>
                        <MenuList>
                            <MenuItem>User 1</MenuItem>
                            <MenuItem>User 2</MenuItem>
                            <MenuItem>User 3</MenuItem>
                        </MenuList>
                    </Menu>
                    <Image className='rounded-full' src={user.image} width={30} height={30} alt={user.name} />
                </Flex>
            </CardFooter>
            <Task isOpen={isOpen} onClose={onClose} />
        </Card >
    )
}

export default KanbanTask