import CustomLink from '@/components/ui/CustomLink'
import { Flex, Icon, Text } from '@chakra-ui/react'
import { FaCaretRight } from 'react-icons/fa'
import TeamHeading from '../TeamHeading'

const TeamDetailsHeading = ({ name }: { name: string }) => {
    return (
        <TeamHeading>
            <Flex className='gap-3 items-center'>
                <CustomLink href='/team'>All Teams</CustomLink>
                <Icon as={FaCaretRight} w={5} h={5} />
                <Text>{name}</Text>
            </Flex>
        </TeamHeading>
    )
}

export default TeamDetailsHeading