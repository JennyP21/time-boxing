"use client"

import { Link } from '@chakra-ui/next-js'
import { Button } from '@chakra-ui/react'

const SignUpButton = () => {
    return (
        <Link href="/api/auth/signin">
            <Button
                width={40}
                size={{ sm: "md", base: "sm" }}
                fontWeight={600}
                colorScheme='red'
            >
                Sign Up
            </Button>
        </Link>
    )
}

export default SignUpButton