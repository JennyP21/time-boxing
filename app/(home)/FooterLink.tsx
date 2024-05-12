import { FooterLinkI } from '@/interfaces';
import { Link } from '@chakra-ui/next-js';
import { Flex, Icon, Text } from '@chakra-ui/react';

const FooterLink = ({ link, linkValue, icon }: FooterLinkI) => {
    return (
        <Link href={link} className='border-b p-1'>
            <Flex className='gap-1 items-center justify-center'>
                <Icon as={icon} w={4} /><Text>{linkValue}</Text>
            </Flex>
        </Link>
    )
}

export default FooterLink;