"use client"
import { Link } from "@chakra-ui/next-js"


const CustomLink = ({ href, className, children }: { href: string, className?: string, children: React.ReactNode }) => {
    return (
        <Link className={className} href={href}>{children}</Link>
    )
}

export default CustomLink