"use client"
import StackContentLoading from '@/components/loading/StackContentLoading'
import { handleErrors } from '@/components/utils/handleErrors'
import { getBucketsError, getTasksError } from '@/constants'
import { ProjectContainerI } from '@/interfaces'
import { useGetBucketsByProjectIdQuery } from '@/lib/features/bucketApi'
import { useGetTasksByProjectIdQuery } from '@/lib/features/taskApi'
import React from 'react'
import GroupByContainer from '../GroupByContainer'
import AddBucket from './AddBucket'
import Bucket from './Bucket'

const GroupByBucket: React.FC<ProjectContainerI> = ({ project }: ProjectContainerI) => {
    const { data: buckets, error, isLoading } = useGetBucketsByProjectIdQuery(project.id);
    const { data: tasks, error: taskError, isLoading: taskLoading } = useGetTasksByProjectIdQuery(project.id);

    if (error) handleErrors(error, getBucketsError.type);
    if (taskError) handleErrors(taskError, getTasksError.type);

    const isPageLoading = isLoading || taskLoading;

    return (
        <>
            {isPageLoading ?
                <StackContentLoading />
                :
                <GroupByContainer>
                    {buckets?.map(bucket => {
                        const bucketTasks = tasks?.filter(task => task.bucket_id === bucket.id);
                        return (
                            <Bucket 
                                key={bucket.id} 
                                id={bucket.id} 
                                name={bucket.name} 
                                project={project} 
                                tasks={bucketTasks}
                                isLoading={isPageLoading}
                            />
                        );
                    })}
                    <AddBucket project={project} lastBucketOrder={(buckets && buckets.length > 0) ? buckets[buckets.length - 1].order : 0} />
                </GroupByContainer>
            }
        </>
    )
}

export default GroupByBucket