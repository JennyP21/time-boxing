import { Box, Text } from '@chakra-ui/react';

interface Props {
    children: React.ReactNode;
    name: string;
}

const Attribute = ({ children, name }: Props) => {
    return (
        <Box>
            <Text fontSize="small" textColor="gray.500" >{name}:</Text>
            {children}
        </Box>
    )
}

export default Attribute