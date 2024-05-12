"use client"

import { Link } from '@chakra-ui/next-js'
import { Button } from '@chakra-ui/react'

interface Props {
    size: "normal" | "large",
    color: "red" | "blue"
}

const SignUpButton = ({ color, size }: Props) => {
    return (
        <Link href="/user/register">
            <Button
                width={size === "large" ? 40 : "auto"}
                size={{ sm: "md", base: "sm" }}
                fontWeight={600}
                colorScheme={color}
            >
                Sign Up
            </Button>
        </Link>
    )
}

export default SignUpButton