import { Box, Flex, Text } from '@chakra-ui/react';

interface Props {
    name: string;
    desc: string;
}

const TeamInfo = ({ name, desc }: Props) => (
    <Box className='rounded-lg p-4' bg="gray.100">
        <Flex my={2}>
            <Text fontWeight="semibold" minW="10rem" maxW="10rem">Name:</Text>
            <Text size="md">{name}</Text>
        </Flex>
        <Flex my={2}>
            <Text fontWeight="semibold" minW="10rem" maxW="10rem">Description:</Text>
            <Text>{desc}</Text>
        </Flex>
    </Box>
)

export default TeamInfo