"use client";
import { Box } from '@chakra-ui/react'
import Image from 'next/image'
import { useState } from 'react';

const LeftPanel = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Box className='transition-all duration-300' borderRight="1px" borderColor={'gray.300'} minWidth={isOpen ? { base: "50%", sm: '25%', lg: "15%" } : "4%"} p={3} height="100vh">
            {isOpen ?
                <Image src='/icons/arrow.svg' width={36} height={36} alt="Close Sidebar" className={isOpen ? "sidebar__icon opacity-1" : "sidebar__icon opacity-0"} onClick={() => setIsOpen(false)} />
                :
                <Image src='/icons/menu-bar.svg' width={36} height={36} alt="Sidebar" className={isOpen ? "sidebar__icon opacity-0" : "sidebar__icon opacity-1"} onClick={() => setIsOpen(true)} />
            }
        </Box>
    )
}

export default LeftPanel