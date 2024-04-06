import { useGetLabelsQuery } from '@/lib/features/labelApi';
import React from 'react';
import GroupByContainer from '../GroupByContainer';
import Label from './Label';

const GroupByLabel = () => {
    const { data: labels } = useGetLabelsQuery();

    if (!labels) return <></>;

    return (
        <GroupByContainer>
            {labels.map(label => (
                <React.Fragment key={label.id}>
                    <Label label={label} />
                </React.Fragment>
            ))}
        </GroupByContainer>
    )
}

export default GroupByLabel