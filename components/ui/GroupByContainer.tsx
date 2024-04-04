import { Grid } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

const GroupByContainer = ({ children }: PropsWithChildren) => {
    return (
        <Grid className='grid-flow-col justify-start h-full'>
            {children}
        </Grid>
    )
}

export default GroupByContainer