import { setIsExpanded } from '@/components/utils/handleUserState';
import { Link } from '@chakra-ui/next-js';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { GoTriangleUp } from 'react-icons/go';

interface Props {
    title: string;
    link?: string;
    children: ReactNode;
    isExpanded: boolean;
    expandData: { name: string, currState: boolean };
}

const LeftPanelAccordion = ({ title, children, link, isExpanded, expandData: { name, currState } }: Props) => {
    return (
        <Accordion className='w-full' defaultIndex={isExpanded ? 0 : -1} allowToggle>
            <AccordionItem border="none">
                <AccordionButton className='rounded-lg' p={1} gap={1} _hover={{ bg: "gray.100" }} onClick={() => setIsExpanded(name, currState)}>
                    {link ?
                        <Link href={link} fontSize="small" fontWeight="bold">
                            {title}
                        </Link>
                        :
                        <Text fontSize="small" fontWeight="bold">
                            {title}
                        </Text>
                    }
                    <AccordionIcon as={GoTriangleUp} w={4} h={4} />
                </AccordionButton>
                <AccordionPanel mx="auto" py={1} fontSize="small">
                    {children}
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}

export default LeftPanelAccordion