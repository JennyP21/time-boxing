import Skeleton from "@/components/loading/Skeleton";
import { Flex } from "@chakra-ui/react";

const TaskCardLoading = () => {
    const count = Array.from({ length: 3 }, (_, i) => i + 1);
    return (
        <Flex className="flex-col gap-1">
            {count.map(count => (
                <Skeleton width="280px" height="150px" key={count} />
            ))}
        </Flex>
    )
}

export default TaskCardLoading