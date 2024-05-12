"use client"
import { plans } from '@/constants'
import { Pricing } from '@/interfaces'
import { Flex, Grid, GridItem, Heading, Switch } from '@chakra-ui/react'
import { useState } from 'react'
import PriceCard from './PriceCard'

const Price = () => {
    const [pricing, setPricing] = useState<Pricing>("Monthly");

    const { free, standard, premium, enterprise } = plans[pricing];
    return (
        <Flex className='py-10 gap-5 flex-col justify-center items-center'>
            <Heading>Explore our plans</Heading>
            <Flex className='gap-3 justify-center items-center p-1'>
                Monthly
                <Switch size="lg" onChange={() => setPricing(pricing === "Monthly" ? "Yearly" : "Monthly")} />
                Yearly
            </Flex>
            <Grid gap={1} templateColumns={{ sm: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr 1fr" }}>
                <GridItem>
                    <PriceCard plan={free} pricing={pricing} />
                </GridItem>
                <GridItem>
                    <PriceCard plan={standard} pricing={pricing} />
                </GridItem>
                <GridItem>
                    <PriceCard plan={premium} pricing={pricing} />
                </GridItem>
                <GridItem>
                    <PriceCard plan={enterprise} pricing={pricing} />
                </GridItem>
            </Grid>
        </Flex>
    )
}

export default Price