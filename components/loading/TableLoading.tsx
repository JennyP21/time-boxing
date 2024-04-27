import Skeleton from "@/components/loading/Skeleton";
import { Box } from "@chakra-ui/react";

const TableLoading = () => {
    const count = Array.from({ length: 12 }, (_, i) => i + 1);

    return (
        <Box px={1}>
            <Skeleton height={30} className="my-2" />
            {count.map(count => (
                <Skeleton height={20} key={count} />
            ))}
        </Box>
    )
}

export default TableLoading