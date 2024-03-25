import { Flex, Icon, Menu, MenuButton, MenuItem, MenuList, Text, VStack } from '@chakra-ui/react'
import KanbanTask from './KanbanTask'
import { HiOutlineDotsHorizontal } from "react-icons/hi";


interface Props {
    id: string;
    name: string;
}

const Bucket = ({ name }: Props) => {
    return (
        <VStack minWidth="280px" maxWidth="300px" ml={2} p={2}>
            <Flex className='w-full justify-between'>
                <Text size="md" align='left' width="100%">{name}</Text>
                <Menu placement='bottom-end'>
                    <MenuButton>
                        <Icon as={HiOutlineDotsHorizontal} w={4} h={4} />
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Delete</MenuItem>
                        <MenuItem>Rename</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
            <KanbanTask />
            <KanbanTask />
        </VStack>
    )
}

export default Bucket