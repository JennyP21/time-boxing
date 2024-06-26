import Skeleton from "@/components/loading/Skeleton";
import { Box } from "@chakra-ui/react";

const TableLoading = () => {
    const count = Array.from({ length: 18 }, (_, i) => i + 1);

    return (
        <Box px={1}>
            <Skeleton height={25} className="my-0.5" />
            {count.map(count => (
                <Skeleton height={40} key={count} />
            ))}
        </Box>
    )
}

export default TableLoading