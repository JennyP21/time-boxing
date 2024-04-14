import { TaskI } from '@/interfaces';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react';
import Task from './Kanban/Task';

interface Props {
    data: TaskI[];
}

const CompletedTask = ({ data }: Props) => {
    return (
        <Accordion className='w-full p-0' allowMultiple>
            <AccordionItem border="none">
                <AccordionButton className='w-full' p={1}>
                    <Box as="span" flex='1' textAlign='left' color="gray.300">
                        Completed Tasks
                    </Box>
                    <AccordionIcon color="gray.300" />
                </AccordionButton>
                <AccordionPanel p={0} my={1}>
                    {data?.map(task => (
                        <Task key={task.id} task={task} />
                    ))}
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}

export default CompletedTask