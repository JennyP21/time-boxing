import { Plan, Pricing } from '@/interfaces';
import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Text } from '@chakra-ui/react';
import PriceCardFooter from './PriceCardFooter';

interface Props {
    plan: Plan;
    pricing: Pricing;
}

const PriceCard = ({ plan, pricing }: Props) => {
    const { planName, planPrice, planDesc, planBtn, planBtnLink } = plan;
    return (
        <Card maxW={250} minW={250} minH={400} maxH={400}>
            <CardHeader>
                <Heading size="md" fontWeight="normal">{planName}</Heading>
            </CardHeader>
            <CardBody>
                <Flex className='flex-col gap-3 justify-center items-start'>
                    {planName === "ENTERPRISE" ?
                        <Button>{planPrice}</Button>
                        :
                        <>
                            <Text fontSize="xx-large" fontWeight="thin">
                                {planPrice}
                                {<Text as="span" fontSize="md">/mo CAD</Text>}
                            </Text>
                            {pricing === "Yearly" && planName !== "FREE" && <Text as="span" color="green" fontSize="small">Save 10% with yearly subscription</Text>}
                        </>
                    }
                    <Text>
                        {planDesc}
                    </Text>
                </Flex>
            </CardBody>
            <CardFooter>
                <PriceCardFooter planBtn={planBtn} planBtnLink={planBtnLink} />
            </CardFooter>
        </Card>
    )
}

export default PriceCard