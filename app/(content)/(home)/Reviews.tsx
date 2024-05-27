import { reviews, reviewSectionTitle } from '@/constants';
import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react';
import { MdReviews } from "react-icons/md";

const Reviews = () => {
    return (
        <Box className='py-16 px-0 md:px-10 lg:px-20 xl:px-40'>
            <Flex className='gap-4 justify-center items-center'>
                <Heading className='my-5' fontWeight="semibold" size={{ base: "lg", md: "xl" }}>{reviewSectionTitle}</Heading>
                <MdReviews />
            </Flex>
            <Grid className='p-3 w-full gap-3' templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}>
                {reviews.map((review, index) => (
                    <Flex
                        key={index}
                        className='flex-col p-3 gap-3 rounded-lg'
                        border="1px"
                        borderColor="gray.300"
                    >
                        <Box>
                            <Heading size="lg" textColor="blue.500" fontWeight="semibold">{review.name}</Heading>
                            <Text fontSize="medium" textColor="gray.500">{review.title}</Text>
                        </Box>
                        <Text>
                            {review.desc}
                        </Text>
                    </Flex>
                ))}
            </Grid>
        </Box>
    )
}

export default Reviews