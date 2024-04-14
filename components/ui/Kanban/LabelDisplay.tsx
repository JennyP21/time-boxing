import { useGetLabelsByTaskQuery } from '@/lib/features/labelApi';
import { Box, Flex } from '@chakra-ui/react';

interface Props {
    task_id: string;
}

const LabelDisplay = ({ task_id }: Props) => {

    const { data: labels } = useGetLabelsByTaskQuery(task_id);

    if (!labels || labels[0].id === null) return null;

    return (
        <Flex className='gap-1 my-3 flex-wrap'>
            {labels.length > 0 && labels.map((label) => (
                <Box as={"span"} className='rounded-md text-xs p-1' bg={"gray.300"} key={label.id}>{label.name}</Box>
            ))}
        </Flex>
    )
}

export default LabelDisplay