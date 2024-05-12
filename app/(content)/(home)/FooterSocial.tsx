"use client"
import { Flex } from '@chakra-ui/react'
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa6'
import FooterLink from './FooterLink'

const FooterSocial = () => {
    return (
        <Flex className='flex-col gap-1 justify-center items-center'>
            <FooterLink icon={FaLinkedin} link='#' linkValue='Linked In' />
            <FooterLink icon={FaGithub} link='#' linkValue='Github' />
            <FooterLink icon={FaFacebook} link='#' linkValue='Facebook' />
            <FooterLink icon={FaInstagram} link='#' linkValue='Instagram' />
        </Flex>
    )
}

export default FooterSocial