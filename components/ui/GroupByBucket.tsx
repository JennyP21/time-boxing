"use client"
import { toast } from '@/components/ui/Toast'
import { useGetBucketsQuery } from '@/lib/features/bucketApi'
import { Grid, Spinner } from '@chakra-ui/react'
import AddBucket from './AddBucket'
import Bucket from './Bucket'

const GroupByBucket = () => {
    const { data: buckets, error, isLoading } = useGetBucketsQuery();

    if (error) toast.error("Something went wrong. Please try again later", {
        toastId: "Bucket error"
    });

    if (isLoading) return <Spinner size={"md"} m={5} />;

    return (
        <>
            {!error &&
                <Grid className='grid-flow-col justify-start h-full'>
                    {buckets?.map(bucket => (
                        <Bucket key={bucket.id} id={bucket.id} name={bucket.name} />
                    ))}
                    <AddBucket lastBucketOrder={(buckets && buckets.length > 0) ? buckets[buckets.length - 1].order : 0} />
                </Grid>
            }
        </>
    )
}

export default GroupByBucket