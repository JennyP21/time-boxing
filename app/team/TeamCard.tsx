import { TeamContainerI } from '@/interfaces'
import { Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react'
import TeamOptionsContainer from './TeamOptionsContainer'
import { Link } from '@chakra-ui/next-js'
import { formatDate } from '@/components/utils'

const TeamCard = ({ teams }: TeamContainerI) => {
    return (
        <Card className='shadow-md hover:shadow-lg' border="1px" borderColor="gray.100" maxW="14rem" minW="16rem" _hover={{
            scale: 1.1,
        }}>
            <CardHeader pb={1} position="relative">
                <TeamOptionsContainer team={teams} />
                <Heading size='md'>
                    <Link href={`/team/${teams.id}`}>
                        {teams.name}
                    </Link>
                </Heading>
            </CardHeader>
            <CardBody>
                <Text fontSize="small">{teams.desc}</Text>
                <Text className='text-xs text-gray-400'>Created at {formatDate(teams.created_at)}</Text>
            </CardBody>
        </Card>
    )
}

export default TeamCard