import { useGetLabelsQuery } from '@/lib/features/labelApi';
import React from 'react';
import GroupByContainer from '../GroupByContainer';
import Label from './Label';
import { PropsWithProject } from '@/interfaces';

const GroupByLabel: React.FC<PropsWithProject> = ({ project }: PropsWithProject) => {
    const { data: labels } = useGetLabelsQuery();

    return (
        <GroupByContainer>
            {labels?.map(label => (
                <React.Fragment key={label.id}>
                    <Label label={label} />
                </React.Fragment>
            ))}
        </GroupByContainer>
    )
}

export default GroupByLabel