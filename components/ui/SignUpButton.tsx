"use client"
import { Link } from '@chakra-ui/next-js'
import { Button } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'

interface Props {
    size: "normal" | "large",
    color: "red" | "blue"
}

const SignUpButton = ({ color, size }: Props) => {
    const session = useSession();

    if (session) return null;
    return (
        <Link href="/user/register">
            <Button
                width={size === "large" ? 40 : "auto"}
                size={{ base: "sm", sm: "md" }}
                fontWeight={600}
                colorScheme={color}
            >
                Sign Up
            </Button>
        </Link>
    )
}

export default SignUpButton