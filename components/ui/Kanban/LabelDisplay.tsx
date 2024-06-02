import Skeleton from "@/components/loading/Skeleton";
import { handleErrors } from "@/components/utils/handleErrors";
import { getLabelsError } from "@/constants";
import { useGetLabelsByTaskQuery } from '@/lib/features/labelApi';
import { Box, Flex } from '@chakra-ui/react';

const LabelDisplay = ({ task_id }: { task_id: string }) => {
    const { data: labels, error, isLoading } = useGetLabelsByTaskQuery(task_id);

    if (error) handleErrors(error, getLabelsError.type);

    if (!labels) return null;

    return (
        <Flex className='gap-1 my-3 flex-wrap'>
            {labels.length > 0 && (isLoading ?
                <Skeleton width={200} height={18} />
                :
                labels.map((label) => (
                    <Box as={"span"} className='rounded-md text-xs p-1' bg={"gray.300"} key={label.id}>{label.name}</Box>
                ))
            )}
        </Flex>
    )
}

export default LabelDisplay