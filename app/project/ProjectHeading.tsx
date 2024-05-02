import { Heading } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

const ProjectHeading = ({ children }: PropsWithChildren) => {
    return (
        <Heading className='p-3' size="lg" fontWeight="semibold" borderBottom="1px" borderColor="gray.200">
            {children}
        </Heading>
    )
}

export default ProjectHeading