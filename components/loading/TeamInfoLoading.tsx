import Skeleton from "@/components/loading/Skeleton";
import { Box } from "@chakra-ui/react";

const TeamInfoLoading = () => {
    return (
        <Box className="p-5">
            <Skeleton height={140} />
        </Box>
    )
}

export default TeamInfoLoading