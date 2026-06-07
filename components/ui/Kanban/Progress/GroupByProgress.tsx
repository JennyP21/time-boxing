import { getTasksError, taskProgress } from '@/constants'
import { ProjectContainerI } from '@/interfaces'
import { useGetTasksByProjectIdQuery } from '@/lib/features/taskApi'
import { handleErrors } from '@/components/utils/handleErrors'
import React from 'react'
import GroupByContainer from '../GroupByContainer'
import Progress from './Progress'

const GroupByProgress: React.FC<ProjectContainerI> = ({ project }: ProjectContainerI) => {
    const { data: tasks, error, isLoading } = useGetTasksByProjectIdQuery(project.id);

    if (error) handleErrors(error, getTasksError.type);

    return (
        <GroupByContainer>
            {taskProgress.map(progress => {
                const progressTasks = tasks?.filter(task => task.progress === progress);
                return (
                    <React.Fragment key={progress}>
                        <Progress 
                            progress={progress} 
                            project={project} 
                            tasks={progressTasks}
                            isLoading={isLoading}
                        />
                    </React.Fragment>
                );
            })}
        </GroupByContainer>
    )
}

export default GroupByProgress