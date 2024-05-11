"use client"
import { featureDesc, featureIntro, features } from '@/constants'
import { Box, Card, CardBody, CardHeader, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { useState } from 'react'

const Features = () => {
    const [allFeatures, setAllFeatures] = useState(features);
    const active = allFeatures.find(feature => feature.active);

    const handleChange = (selectedFeatureHeader: string) => {
        const selectedFeature = allFeatures.find(feature => feature.header === selectedFeatureHeader);
        const activeFeature = allFeatures.find(feature => feature.active);
        if (selectedFeature && activeFeature && selectedFeature.header !== activeFeature.header) {
            setAllFeatures([
                ...allFeatures.map(feature => feature.header === selectedFeature.header
                    ? { ...selectedFeature, active: true }
                    : feature.header === activeFeature.header ? { ...activeFeature, active: false } : feature
                )
            ])
        }
    }

    return (
        <Flex className='my-10 mx-40 flex-col justify-center gap-3'>
            <Heading pl={3} size="lg" fontWeight="semibold">{featureIntro}</Heading>
            <Text pl={3} maxW={600}>
                {featureDesc}
            </Text>
            <SimpleGrid className='items-center justify-center gap-5 my-2 mx-4' templateColumns="1fr 2fr">
                <Flex className='flex-col gap-5'>
                    {allFeatures.map((feature, index) => (
                        <Card
                            className={feature.active ? "!border-b-4" : ""}
                            cursor="pointer"
                            shadow={feature.active ? "0 0 20px 1px #d0cfcf" : "none"}
                            size="sm"
                            key={index}
                            maxW={400}
                            borderColor="blue.300"
                            onClick={() => handleChange(feature.header)}
                        >
                            <CardHeader p={3} fontWeight="bold">{feature.header}</CardHeader>
                            <CardBody p={3} fontSize="small">{feature.body}</CardBody>
                        </Card>
                    ))}
                </Flex>
                <Box className='mx-auto'>
                    {active && <Image src={active.image} width={700} height={417} alt={active.linkText} />}
                </Box>
            </SimpleGrid>
        </Flex>
    )
}

export default Features