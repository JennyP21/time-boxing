import { reviews, reviewSectionTitle } from '@/constants'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'

const Reviews = () => {
    return (
        <Box className='py-16 px-40'>
            <Heading className='my-5' fontWeight="semibold">{reviewSectionTitle}</Heading>
            <Flex className='p-3 gap-5 w-full flex-nowrap overflow-x-scroll'>
                {reviews.map((review, index) => (
                    <Flex
                        key={index}
                        className='flex-col p-3 gap-3 rounded-lg'
                        minH={300} maxH={300}
                        minW={400} maxW={400}
                        border="1px"
                        borderColor="gray.300"
                        boxShadow="0 0 10px #bbbbbb"
                    >
                        <Box>
                            <Heading size="lg" textColor="blue.500" fontWeight="semibold">{review.name}</Heading>
                            <Text fontSize="medium" textColor="gray.500">{review.title}</Text>
                        </Box>
                        <Text textShadow="2px 2px 10px #999">
                            {review.desc}
                        </Text>
                    </Flex>
                ))}
            </Flex>
        </Box>
    )
}

export default Reviews