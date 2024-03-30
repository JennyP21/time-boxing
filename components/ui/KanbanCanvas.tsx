"use client"
import { toast } from '@/app/api/Toast'
import { useGetBucketsQuery } from '@/lib/features/bucketApi'
import { Grid, Spinner } from '@chakra-ui/react'
import AddBucket from './AddBucket'
import Bucket from './Bucket'

const KanbanCanvas = () => {
    const { data: buckets, error, isLoading } = useGetBucketsQuery();

    if (error) toast.error("Something went wrong. Please try again later", {
        toastId: "Bucket error"
    });

    if (isLoading) return <Spinner size={"md"} m={5} />;

    return (
        <>
            {!error &&
                <Grid className='grid-flow-col justify-start'>
                    {buckets?.map(bucket => (
                        <Bucket key={bucket.id} id={bucket.id} name={bucket.name} />
                    ))}
                    <AddBucket />
                </Grid>
            }
        </>
    )
}

export default KanbanCanvas