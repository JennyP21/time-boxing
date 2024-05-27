"use client"
import { featureDesc, featureIntro, features } from '@/constants'
import { Box, Card, CardBody, CardHeader, Flex, Grid, Heading, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { useState } from 'react'

const Features = () => {
    const [allFeatures, setAllFeatures] = useState(features);
    const active = allFeatures.find(feature => feature.active);

    const handleChange = (selectedFeatureHeader: string) => {
        setAllFeatures([
            ...allFeatures.map(feature => feature.header === selectedFeatureHeader
                ? { ...feature, active: true }
                : { ...feature, active: false }
            )
        ])
    }

    return (
        <Flex className='py-10 px-0 md:px-10 lg:px-20 xl:px-40 flex-col justify-center gap-3'>
            <Heading pl={3} size="lg" fontWeight="semibold">{featureIntro}</Heading>
            <Text pl={3} maxW={600}>
                {featureDesc}
            </Text>
            <Grid
                className='items-center justify-center gap-3 my-2 mx-4'
                gridTemplateColumns={{ base: "1fr", lg: "1fr 2fr" }}
            >
                <Flex className='gap-2 w-full justify-evenly items-center' direction={{ base: "row", lg: "column" }}>
                    {allFeatures.map((feature, index) => (
                        <Card
                            className={feature.active ? "!border-b-8" : ""}
                            cursor="pointer"
                            shadow={feature.active ? "0 0 20px 1px #d0cfcf" : "none"}
                            size="sm"
                            key={index}
                            borderColor="blue.300"
                            onClick={() => handleChange(feature.header)}
                        >
                            <CardHeader px={{ base: 1, sm: 3 }} py={1} fontWeight="bold" fontSize={{ base: "smaller", sm: "medium" }}>{feature.header}</CardHeader>
                            <CardBody px={3} py={1} fontSize="smaller" display={{ base: "none", md: "block" }}>{feature.body}</CardBody>
                        </Card>
                    ))}
                </Flex>
                <Box className='mx-auto'>
                    {active && <Image src={active.image} width={600} height={417} alt={active.linkText} />}
                </Box>
            </Grid>
        </Flex>
    )
}

export default Features