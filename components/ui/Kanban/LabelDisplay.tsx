import { LabelI } from '@/interfaces';
import { Box, Flex } from '@chakra-ui/react';

const LabelDisplay = ({ labels }: { labels: LabelI[] }) => {
    if (!labels || labels.length === 0) return null;

    return (
        <Flex className='gap-1 my-3 flex-wrap'>
            {labels.map((label) => (
                <Box as={"span"} className='rounded-md text-xs p-1 font-medium bg-slate-100 text-slate-600 border border-slate-200/50' key={label.id}>{label.name}</Box>
            ))}
        </Flex>
    )
}

export default LabelDisplay