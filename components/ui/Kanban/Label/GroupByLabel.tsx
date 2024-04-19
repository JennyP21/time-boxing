import { ProjectContainerI } from '@/interfaces';
import { useGetLabelsQuery } from '@/lib/features/labelApi';
import React from 'react';
import GroupByContainer from '../GroupByContainer';
import Label from './Label';

const GroupByLabel: React.FC<ProjectContainerI> = ({ project }: ProjectContainerI) => {
    const { data: labels } = useGetLabelsQuery();

    return (
        <GroupByContainer>
            {labels?.map(label => (
                <React.Fragment key={label.id}>
                    <Label label={label} project={project} />
                </React.Fragment>
            ))}
        </GroupByContainer>
    )
}

export default GroupByLabel