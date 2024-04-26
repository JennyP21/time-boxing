"use client"
import StackContentLoading from '@/components/loading/StackContentLoading'
import { handleErrors } from '@/components/utils/handleErrors'
import { getBucketsByProjectError } from '@/constants'
import { ProjectContainerI } from '@/interfaces'
import { useGetBucketsByProjectIdQuery } from '@/lib/features/bucketApi'
import React from 'react'
import GroupByContainer from '../GroupByContainer'
import AddBucket from './AddBucket'
import Bucket from './Bucket'

const GroupByBucket: React.FC<ProjectContainerI> = ({ project }: ProjectContainerI) => {
    const { data: buckets, error, isLoading } = useGetBucketsByProjectIdQuery(project.id);

    if (error) handleErrors(error, getBucketsByProjectError.type);

    return (
        <>
            {isLoading ?
                <StackContentLoading />
                :
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