import Skeleton from "@/components/loading/Skeleton";
import { Flex } from "@chakra-ui/react";

const StackContentLoading = () => {
    const count = Array.from({ length: 4 }, (_, i) => i + 1);
    return (
        <Flex className="min-h-full px-1 gap-2">
            {count.map(count => (
                <Skeleton width="280px" height="100%" key={count} />
            ))}
        </Flex>
    )
}

export default StackContentLoading