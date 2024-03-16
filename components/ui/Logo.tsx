"use client"

import { Link } from "@chakra-ui/next-js"
import Image from "next/image"

const Logo = () => {
    return (
        <Link href="/" position="relative" width={{ sm: 28, base: 24 }} height={{ sm: 12, base: 12 }}>
            <Image src="/brand.svg" fill className='object-contain' alt="Brand Logo" priority />
        </Link>
    )
}

export default Logo