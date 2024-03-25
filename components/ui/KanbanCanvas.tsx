"use client"
import { Grid } from '@chakra-ui/react'
import Bucket from './Bucket'
import { useGetBucketsQuery } from '@/lib/features/bucketApi'

const KanbanCanvas = () => {
    const { data: buckets, error, isLoading } = useGetBucketsQuery();

    if (error) console.log(error);

    return (
        <>
            {isLoading ? <p>Loading...</p> :
                <Grid className='grid-flow-col justify-start'>
                    {buckets?.map(bucket => (
                        <Bucket key={bucket.id} id={bucket.id} name={bucket.name} />
                    ))}
                </Grid>
            }
        </>
    )
}

export default KanbanCanvas