"use client"
import { toast } from '@/components/error/Toast'
import { ProjectContainerI } from '@/interfaces'
import { useGetBucketsByProjectIdQuery } from '@/lib/features/bucketApi'
import { Spinner } from '@chakra-ui/react'
import React from 'react'
import GroupByContainer from '../GroupByContainer'
import AddBucket from './AddBucket'
import Bucket from './Bucket'

const GroupByBucket: React.FC<ProjectContainerI> = ({ project }: ProjectContainerI) => {
    const { data: buckets, error, isLoading } = useGetBucketsByProjectIdQuery(project.id);

    if (error) toast.error("Something went wrong. Please try again later", {
        toastId: "Bucket error"
    });

    if (isLoading) return <Spinner size={"md"} m={5} />;

    return (
        <>
            {!error &&
                <GroupByContainer>
                    {buckets?.map(bucket => (
                        <Bucket key={bucket.id} id={bucket.id} name={bucket.name} project={project} />
                    ))}
                    <AddBucket project={project} lastBucketOrder={(buckets && buckets.length > 0) ? buckets[buckets.length - 1].order : 0} />
                </GroupByContainer>
            }
        </>
    )
}

export default GroupByBucket