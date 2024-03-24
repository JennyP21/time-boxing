import { Grid } from '@chakra-ui/react'
import Bucket from './Bucket'

const KanbanCanvas = () => {
    return (
        <Grid className='grid-flow-col justify-start'>
            <Bucket />
        </Grid>
    )
}

export default KanbanCanvas