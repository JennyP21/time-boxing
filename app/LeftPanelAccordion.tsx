import { setIsExpanded } from '@/components/utils/handleUserState';
import { Link } from '@chakra-ui/next-js';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { GoTriangleUp } from 'react-icons/go';
import { HiPaperAirplane } from 'react-icons/hi';

interface Props {
    title: string;
    link?: string;
    children: ReactNode;
    isExpanded: boolean;
    expandData: { name: string, currState: boolean };
    isRoot: boolean;
}

const LeftPanelAccordion = ({ title, children, link, isExpanded, expandData: { name, currState }, isRoot }: Props) => {
    return (
        <Accordion className='w-full' defaultIndex={isExpanded ? 0 : -1} allowToggle>
            <AccordionItem border="none">
                <AccordionButton
                    className='rounded-lg'
                    justifyContent={isRoot ? "space-between" : "normal"}
                    px={2}
                    py={1}
                    border={isRoot ? "1px" : "none"}
                    borderColor="gray.300"
                    gap={1}
                    _hover={{ bg: "gray.100" }}
                    onClick={() => setIsExpanded(name, currState)}
                >
                    {link ?
                        <Link href={link} className='font-medium text-sm'>
                            {title}
                        </Link>
                        :
                        <Text className='font-medium text-sm'>
                            {title}
                        </Text>
                    }
                    {isRoot ?
                        <AccordionIcon as={HiPaperAirplane} w={3} h={3} />
                        :
                        <AccordionIcon as={GoTriangleUp} w={4} h={4} />
                    }
                </AccordionButton>
                <AccordionPanel mx="auto" py={1} fontSize="small">
                    {children}
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}

export default LeftPanelAccordion