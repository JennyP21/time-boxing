import { Flex } from '@chakra-ui/react'
import Skeleton from "@/components/loading/Skeleton";

const NavLinksLoading = () => {
    return (
        <Flex className='gap-3 justify-center items-center'>
            <Skeleton width={80} height={30} />
            <Skeleton width={80} height={30} />
            <Skeleton circle width={40} height={40} />
        </Flex>
    )
}

export default NavLinksLoading