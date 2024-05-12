"use client"
import { Link } from "@chakra-ui/next-js";
import { Button } from "@chakra-ui/react";

interface Props {
    planBtn: string;
    planBtnLink: string;
}

const PriceCardFooter = ({ planBtn, planBtnLink }: Props) => {
    return (
        <Link href={planBtnLink}>
            <Button colorScheme="blue">{planBtn}</Button>
        </Link>
    )
}

export default PriceCardFooter