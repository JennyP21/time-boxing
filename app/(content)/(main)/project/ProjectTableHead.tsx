import { Th, Thead, Tr } from '@chakra-ui/react'

const ProjectTableHead = () => {
    return (
        <Thead>
            <Tr className='hover:bg-gray-100'>
                <Th className='w-[60%] max-sm:w-[90%]'>Name</Th>
                <Th className='max-sm:hidden w-[15%]'>Created On</Th>
                <Th className='max-sm:hidden w-[15%]'>Last Updated</Th>
                <Th className='w-[5%]'></Th>
                <Th className='w-[5%]'></Th>
            </Tr>
        </Thead>
    )
}

export default ProjectTableHead