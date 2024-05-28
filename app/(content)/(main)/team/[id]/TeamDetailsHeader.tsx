import CustomLink from '@/components/ui/CustomLink'
import { TeamI } from '@/interfaces'
import { Flex, Icon, Text } from '@chakra-ui/react'
import { FaCaretRight } from 'react-icons/fa'
import UpdateTeamContainer from '../../UpdateTeamContainer'
import TeamHeading from '../TeamHeading'

interface Props {
    name: string,
    currentTeam: TeamI
}

const TeamDetailsHeader = ({ name, currentTeam }: Props) => {
    return (
        <TeamHeading>
            <Flex className='gap-2'>
                <Flex className='gap-3 items-center'>
                    <Flex className='gap-3 items-center'>
                        <CustomLink href='/team'>All Teams</CustomLink>
                    </Flex>
                    <Icon as={FaCaretRight} w={5} h={5} />
                    <Text>{name}</Text>
                </Flex>
                <UpdateTeamContainer currentTeam={currentTeam} />
            </Flex>
        </TeamHeading>
    )
}

export default TeamDetailsHeader