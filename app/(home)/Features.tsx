"use client"
import { features } from '@/constants'
import { Box, Card, CardBody, CardFooter, CardHeader, Flex, SimpleGrid } from '@chakra-ui/react'
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
        <SimpleGrid className='p-16 items-center mx-auto gap-5' columns={{ sm: 1, md: 2 }}>
            <Flex className='flex-col gap-5'>
                {allFeatures.map((feature, index) => (
                    <Card size="sm" key={index} border="1px" borderColor={feature.active ? "blue.300" : "gray.300"} onClick={() => handleChange(feature.header)}>
                        <CardHeader>{feature.header}</CardHeader>
                        <CardBody>{feature.body}</CardBody>
                        <CardFooter>{feature.linkText}</CardFooter>
                    </Card>
                ))}
            </Flex>
            <Box>
                {active && <Image src={active.image} width={650} height={650} alt={active.linkText} />}
            </Box>
        </SimpleGrid>
    )
}

export default Features