import StackContentLoading from '@/components/loading/StackContentLoading';
import { handleErrors } from '@/components/utils/handleErrors';
import { getLabelsError } from '@/constants';
import { ProjectContainerI } from '@/interfaces';
import { useGetLabelsByProjectIdQuery } from '@/lib/features/labelApi';
import React from 'react';
import GroupByContainer from '../GroupByContainer';
import Label from './Label';

const GroupByLabel: React.FC<ProjectContainerI> = ({ project }: ProjectContainerI) => {
    const { data: labels, error, isLoading } = useGetLabelsByProjectIdQuery(project.id);

    if (error) handleErrors(error, getLabelsError.type);

    return (
        <>
            {isLoading ? <StackContentLoading />
                :
                <GroupByContainer>
                    {labels?.map(label => (
                        <React.Fragment key={label.id}>
                            <Label label={label} project={project} />
                        </React.Fragment>
                    ))}
                </GroupByContainer>
            }
        </>
    )
}

export default GroupByLabel