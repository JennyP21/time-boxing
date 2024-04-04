import Stack from '@/components/ui/Stack';
import { Heading } from "@chakra-ui/react";
import AddTask from '../AddTask';

interface Props {
    name: string;
}

const Severity = ({ name }: Props) => {
    return (
        <Stack>
            <Heading textAlign="start" fontWeight="normal" w="100%" size="medium">{name}</Heading>
            <AddTask />
        </Stack>
    )
}

export default Severity;