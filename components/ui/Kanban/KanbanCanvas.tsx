"use client"
import GroupByLabel from '@/components/ui/Kanban/Label/GroupByLabel';
import GroupByProgress from '@/components/ui/Kanban/Progress/GroupByProgress';
import GroupBySeverity from '@/components/ui/Kanban/Severity/GroupBySeverity';
import { groupTypes } from '@/constants';
import { PropsWithProject } from '@/interfaces';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import GroupByBucket from './Bucket/GroupByBucket';

const KanbanCanvas = ({ project }: PropsWithProject) => {
    const groupBy = useSearchParams().get("groupBy");

    if (groupBy && !groupTypes.includes(groupBy)) {
        return null;
    }

    const groupByMapping: { [key: string]: React.FC<PropsWithProject> } = {
        Bucket: GroupByBucket,
        Severity: GroupBySeverity,
        Progress: GroupByProgress,
        Label: GroupByLabel
    }

    const Content = groupBy ? groupByMapping[groupBy] : groupByMapping["Bucket"];

    return (
        <Content project={project} />
    )
}

export default KanbanCanvas