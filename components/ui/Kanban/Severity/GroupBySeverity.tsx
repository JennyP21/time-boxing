import { getTasksError, taskSeverity } from '@/constants'
import { ProjectContainerI } from '@/interfaces'
import { useGetTasksByProjectIdQuery } from '@/lib/features/taskApi'
import { handleErrors } from '@/components/utils/handleErrors'
import React from 'react'
import GroupByContainer from '../GroupByContainer'
import Severity from './Severity'

const GroupBySeverity: React.FC<ProjectContainerI> = ({ project }: ProjectContainerI) => {
    const { data: tasks, error, isLoading } = useGetTasksByProjectIdQuery(project.id);

    if (error) handleErrors(error, getTasksError.type);

    return (
        <GroupByContainer>
            {taskSeverity.map(severity => {
                const severityTasks = tasks?.filter(task => task.severity === severity);
                return (
                    <React.Fragment key={severity}>
                        <Severity 
                            severity={severity} 
                            project={project} 
                            tasks={severityTasks}
                            isLoading={isLoading}
                        />
                    </React.Fragment>
                );
            })}
        </GroupByContainer>
    )
}

export default GroupBySeverity