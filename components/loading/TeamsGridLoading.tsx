import { Flex } from '@chakra-ui/react';
import Skeleton from '@/components/loading/Skeleton'

const TeamsGridLoading = () => {
    const count = Array.from({ length: 12 }, (_, i) => i + 1);

    return (
        <Flex className='flex-wrap gap-2'>
            {count.map(count => (
                <Skeleton width={200} height={160} key={count} />
            ))}
        </Flex>
    )
}

export default TeamsGridLoading