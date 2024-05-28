import { Icon } from '@chakra-ui/react'
import { LuPencil } from 'react-icons/lu'

const EditIcon = ({ onOpen }: { onOpen: () => void }) => {
    return (
        <Icon onClick={onOpen} as={LuPencil} className='rounded-tl-lg rounded-br-lg cursor-pointer' w={5} h={5} _hover={{ bg: "gray.300" }} />
    )
}

export default EditIcon