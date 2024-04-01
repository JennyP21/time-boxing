import { useGetLabelsByTaskQuery } from '@/lib/features/labelApi';
import { Box } from '@chakra-ui/react';

interface Props {
    task_id: string;
}

const LabelDisplay = ({ task_id }: Props) => {

    const { data: labels } = useGetLabelsByTaskQuery(task_id);

    return (
        <>
            {labels?.map((label) => (
                <Box as={"span"} className='rounded-md text-xs p-1' bg={"gray.300"} key={label.id}>{label.name}</Box>
            ))}
        </>
    )
}

export default LabelDisplay