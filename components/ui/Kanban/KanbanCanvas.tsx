"use client"
import GroupByLabel from '@/components/ui/Kanban/Label/GroupByLabel';
import GroupByProgress from '@/components/ui/Kanban/Progress/GroupByProgress';
import GroupBySeverity from '@/components/ui/Kanban/Severity/GroupBySeverity';
import { groupTypes } from '@/constants';
import { ProjectContainerI } from '@/interfaces';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import GroupByBucket from './Bucket/GroupByBucket';
import { Box } from '@chakra-ui/react';

const KanbanCanvas = ({ project }: ProjectContainerI) => {
    const groupBy = useSearchParams().get("groupBy");

    if (groupBy && !groupTypes.includes(groupBy)) {
        return null;
    }

    const groupByMapping: { [key: string]: React.FC<ProjectContainerI> } = {
        Bucket: GroupByBucket,
        Severity: GroupBySeverity,
        Progress: GroupByProgress,
        Label: GroupByLabel
    }

    const Content = groupBy ? groupByMapping[groupBy] : groupByMapping["Bucket"];

    return (
        <Box className='overflow-x-scroll overflow-y-hidden flex-[1_0_0]'>
            <Content project={project} />
        </Box>
    )
}

export default KanbanCanvas