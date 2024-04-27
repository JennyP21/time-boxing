import Skeleton from "@/components/loading/Skeleton";
import { Box, Flex } from '@chakra-ui/react';

const StepsLoading = () => {
    const count = Array.from({ length: 5 }, (_, i) => i + 1);
    return (
        <Box px={1}>
            <Flex className="justify-between">
                <Skeleton height={16} width={100} />
                <Skeleton height={16} width={100} />
            </Flex>
            {count.map(count => (
                <Skeleton height={16} key={count} />
            ))}
        </Box>
    )
}

export default StepsLoading