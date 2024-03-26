"use client"
import { Grid, Spinner } from '@chakra-ui/react'
import Bucket from './Bucket'
import { useGetBucketsQuery } from '@/lib/features/bucketApi'
import AddBucket from './AddBucket'
import { toast } from '@/app/api/Toast'

const KanbanCanvas = () => {
    const { data: buckets, error, isLoading } = useGetBucketsQuery();

    if (error) toast.error("Something went wrong. Please try again later", {
        toastId: "Bucket error"
    });

    return (
        <>
            {!error &&
                <>
                    {isLoading ? <Spinner size={"md"} m={5} /> :
                        <Grid className='grid-flow-col justify-start'>
                            {buckets?.map(bucket => (
                                <Bucket key={bucket.id} id={bucket.id} name={bucket.name} />
                            ))}
                            <AddBucket />
                        </Grid>
                    }
                </>
            }
        </>
    )
}

export default KanbanCanvas