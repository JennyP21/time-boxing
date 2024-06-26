"use client"
import { footerLinks } from '@/constants';
import { VStack } from '@chakra-ui/react';
import FooterLink from './FooterLink';

const FooterLinks = () => {
    return (
        <VStack justifyContent="center">
            {footerLinks.map(({ link, linkValue, icon }, index) => (
                <FooterLink key={index} link={link} linkValue={linkValue} icon={icon} />
            ))}
        </VStack>
    )
}

export default FooterLinks