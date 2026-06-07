import StackContentLoading from '@/components/loading/StackContentLoading';
import { handleErrors } from '@/components/utils/handleErrors';
import { getLabelsError, getTasksError } from '@/constants';
import { ProjectContainerI } from '@/interfaces';
import { useGetLabelsByProjectIdQuery } from '@/lib/features/labelApi';
import { useGetTasksByProjectIdQuery } from '@/lib/features/taskApi';
import React from 'react';
import GroupByContainer from '../GroupByContainer';
import Label from './Label';

const GroupByLabel: React.FC<ProjectContainerI> = ({ project }: ProjectContainerI) => {
    const { data: labels, error, isLoading } = useGetLabelsByProjectIdQuery(project.id);
    const { data: tasks, error: taskError, isLoading: taskLoading } = useGetTasksByProjectIdQuery(project.id);

    if (error) handleErrors(error, getLabelsError.type);
    if (taskError) handleErrors(taskError, getTasksError.type);

    const isPageLoading = isLoading || taskLoading;

    return (
        <>
            {isPageLoading ? <StackContentLoading />
                :
                <GroupByContainer>
                    {labels?.map(label => {
                        const labelTasks = tasks?.filter(task => 
                            task.tasks_labels?.some(tl => tl.label?.id === label.id)
                        );
                        return (
                            <React.Fragment key={label.id}>
                                <Label 
                                    label={label} 
                                    project={project} 
                                    tasks={labelTasks}
                                    isLoading={isPageLoading}
                                />
                            </React.Fragment>
                        );
                    })}
                </GroupByContainer>
            }
        </>
    )
}

export default GroupByLabel