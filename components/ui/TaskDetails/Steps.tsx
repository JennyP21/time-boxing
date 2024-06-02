import { StepsI } from '@/interfaces';
import { Flex } from '@chakra-ui/react';
import AddStep from '../AddStep';
import UpdateSteps from '../UpdateSteps';

interface Props {
    steps: StepsI[];
    task_id: string;
}

const Steps = ({ steps, task_id }: Props) => {
    return (
        <Flex flexDir="column" maxHeight={"40vh"} overflowY="scroll">
            <UpdateSteps task_id={task_id} steps={steps} hideCheckedStep={false} />
            <AddStep task_id={task_id} steps={steps} />
        </Flex>
    )
}

export default Steps