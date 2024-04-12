import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { GoTriangleUp } from 'react-icons/go';

interface Props {
    title: string;
    children: ReactNode
}

const LeftPanelAccordion = ({ title, children }: Props) => {
    return (
        <Accordion className='w-full' allowToggle>
            <AccordionItem border="none">
                <AccordionButton className='rounded-lg' p={1} gap={1} _hover={{ bg: "gray.100" }}>
                    <AccordionIcon as={GoTriangleUp} w={4} h={4} />
                    <Text fontSize="small" fontWeight="bold">
                        {title}
                    </Text>
                </AccordionButton>
                <AccordionPanel pl={6} fontSize="small">
                    {children}
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}

export default LeftPanelAccordion